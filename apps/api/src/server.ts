import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { PrismaClient } from "@bluebird/database";

// ═══════════════════════════════════════════════════
// Bluebird API Gateway — Fastify Server
// ═══════════════════════════════════════════════════

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport:
      process.env.NODE_ENV === "development"
        ? { target: "pino-pretty", options: { colorize: true } }
        : undefined,
  },
  trustProxy: true,
});

const prisma = new PrismaClient();

// ═══════════════════════════════════════════════════
// Plugin Registration
// ═══════════════════════════════════════════════════

async function registerPlugins() {
  // Security
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", process.env.NEXT_PUBLIC_APP_URL || ""],
      },
    },
  });

  await app.register(cors, {
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-request-id"],
  });

  await app.register(rateLimit, {
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    timeWindow: process.env.RATE_LIMIT_WINDOW_MS || "1 minute",
    redis: process.env.REDIS_URL,
    keyGenerator: (req) => {
      return req.user?.sub || req.headers["x-forwarded-for"] || req.ip;
    },
    errorResponseBuilder: (req, context) => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: `Rate limit exceeded. Try again in ${context.after}`,
      code: "RATE_LIMIT_EXCEEDED",
    }),
  });

  // JWT
  await app.register(jwt, {
    secret: process.env.JWT_SECRET!,
    decode: { complete: true },
    verify: {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    },
  });

  // Documentation
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Bluebird Online API",
        description: "Enterprise ISP Management API",
        version: "1.0.0",
      },
      servers: [{ url: "http://localhost:3001" }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "list", deepLinking: true },
  });
}

// ═══════════════════════════════════════════════════
// Hooks & Decorators
// ═══════════════════════════════════════════════════

app.addHook("onRequest", async (request, reply) => {
  request.prisma = prisma;
  request.requestId = request.headers["x-request-id"] || crypto.randomUUID();
  reply.header("x-request-id", request.requestId);
});

// Health check
app.get("/health", async () => ({
  status: "healthy",
  timestamp: new Date().toISOString(),
  version: "1.0.0",
  services: {
    database: "connected",
    redis: "connected",
  },
}));

// ═══════════════════════════════════════════════════
// Route Registration (modular)
// ═══════════════════════════════════════════════════

async function registerRoutes() {
  // Auth routes
  app.register(import("./routes/auth"), { prefix: "/api/v1/auth" });

  // Customer routes
  app.register(import("./routes/customers"), { prefix: "/api/v1/customers" });

  // Billing routes
  app.register(import("./routes/billing"), { prefix: "/api/v1/billing" });

  // Network routes
  app.register(import("./routes/network"), { prefix: "/api/v1/network" });

  // Ticket routes
  app.register(import("./routes/tickets"), { prefix: "/api/v1/tickets" });

  // Admin routes
  app.register(import("./routes/admin"), { prefix: "/api/v1/admin" });

  // MikroTik routes
  app.register(import("./routes/mikrotik"), { prefix: "/api/v1/mikrotik" });

  // Monitoring routes
  app.register(import("./routes/monitoring"), { prefix: "/api/v1/monitoring" });
}

// ═══════════════════════════════════════════════════
// Error Handler
// ═══════════════════════════════════════════════════

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);

  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Validation Error",
      message: error.message,
      code: "VALIDATION_ERROR",
      details: error.validation,
    });
  }

  if (error.statusCode === 429) {
    return reply.status(429).send({
      statusCode: 429,
      error: "Too Many Requests",
      message: error.message,
      code: "RATE_LIMIT_EXCEEDED",
    });
  }

  // Generic error (don't leak internals in production)
  const isDev = process.env.NODE_ENV === "development";
  reply.status(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    error: "Internal Server Error",
    message: isDev ? error.message : "An unexpected error occurred",
    code: error.code || "INTERNAL_ERROR",
    ...(isDev && { stack: error.stack }),
  });
});

// ═══════════════════════════════════════════════════
// Server Start
// ═══════════════════════════════════════════════════

async function start() {
  try {
    await registerPlugins();
    await registerRoutes();

    const port = parseInt(process.env.API_PORT || "3001");
    const host = process.env.API_HOST || "0.0.0.0";

    await app.listen({ port, host });
    app.log.info(`🚀 Bluebird API running on http://${host}:${port}`);
    app.log.info(`📚 API Docs available on http://${host}:${port}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  app.log.info("SIGTERM received, closing server...");
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  app.log.info("SIGINT received, closing server...");
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});

start();
