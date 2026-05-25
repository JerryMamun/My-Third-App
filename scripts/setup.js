#!/usr/bin/env node

/**
 * Bluebird Online — Development Setup Script
 * Run: node scripts/setup.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { stdio: "inherit", ...options });
  } catch (error) {
    log(`Command failed: ${command}`, "red");
    process.exit(1);
  }
}

async function setup() {
  log("\n🚀 Bluebird Online — Development Setup\n", "bright");

  // Check Node version
  const nodeVersion = process.version;
  if (!nodeVersion.startsWith("v20") && !nodeVersion.startsWith("v22")) {
    log(`⚠️  Node.js 20+ required. Current: ${nodeVersion}`, "yellow");
    process.exit(1);
  }

  // Check pnpm
  try {
    execSync("pnpm --version", { stdio: "pipe" });
  } catch {
    log("⚠️  pnpm is required. Install with: npm install -g pnpm", "red");
    process.exit(1);
  }

  // Install dependencies
  log("📦 Installing dependencies...", "cyan");
  exec("pnpm install");

  // Setup environment
  log("🔐 Setting up environment...", "cyan");
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(
      path.join(process.cwd(), ".env.example"),
      envPath
    );
    log("✅ Created .env.local from template", "green");
    log("⚠️  Please update .env.local with your actual secrets", "yellow");
  } else {
    log("✅ .env.local already exists", "green");
  }

  // Generate Prisma client
  log("🗄️  Generating Prisma client...", "cyan");
  exec("pnpm db:generate");

  // Start Docker services
  log("🐳 Starting Docker services...", "cyan");
  try {
    exec("docker-compose up -d postgres redis");
    log("⏳ Waiting for database to be ready...", "yellow");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch {
    log("⚠️  Docker not available. Please start PostgreSQL and Redis manually.", "yellow");
  }

  // Run migrations
  log("🔄 Running database migrations...", "cyan");
  try {
    exec("pnpm db:migrate");
  } catch {
    log("⚠️  Migration failed. Database may not be ready.", "yellow");
  }

  log("\n✅ Setup complete!", "green");
  log("\n🎯 Next steps:", "bright");
  log("   1. Update .env.local with your secrets", "cyan");
  log("   2. pnpm dev:web     → Start Next.js app", "cyan");
  log("   3. pnpm dev:api     → Start API server", "cyan");
  log("   4. pnpm db:studio   → Open Prisma Studio", "cyan");
  log("\n📖 Documentation: docs/architecture/PROJECT_ARCHITECTURE.md", "cyan");
}

setup();
