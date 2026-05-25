import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "crypto";

// ═══════════════════════════════════════════════════
// JWT Configuration
// ═══════════════════════════════════════════════════

const JWT_CONFIG = {
  access: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
    issuer: process.env.JWT_ISSUER || "bluebird-online",
    audience: process.env.JWT_AUDIENCE || "bluebird-customers",
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
    issuer: process.env.JWT_ISSUER || "bluebird-online",
    audience: process.env.JWT_AUDIENCE || "bluebird-customers",
  },
};

// ═══════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════

export interface TokenPayload {
  sub: string;           // User ID
  email: string;
  userType: "CUSTOMER" | "STAFF" | "SYSTEM";
  role?: string;         // Staff role
  sessionId: string;
  deviceId?: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

// ═══════════════════════════════════════════════════
// Token Generation
// ═══════════════════════════════════════════════════

export function generateTokenPair(
  payload: Omit<TokenPayload, "iat" | "exp">,
  deviceId?: string
): TokenPair {
  const sessionId = generateSessionId();
  const tokenPayload: TokenPayload = {
    ...payload,
    sessionId,
    deviceId,
  };

  const accessToken = jwt.sign(tokenPayload, JWT_CONFIG.access.secret, {
    expiresIn: JWT_CONFIG.access.expiresIn,
    issuer: JWT_CONFIG.access.issuer,
    audience: JWT_CONFIG.access.audience,
  });

  const refreshToken = jwt.sign(
    { sub: payload.sub, sessionId, type: "refresh" },
    JWT_CONFIG.refresh.secret,
    {
      expiresIn: JWT_CONFIG.refresh.expiresIn,
      issuer: JWT_CONFIG.refresh.issuer,
      audience: JWT_CONFIG.refresh.audience,
    }
  );

  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,        // 15 minutes in seconds
    refreshExpiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  };
}

// ═══════════════════════════════════════════════════
// Token Verification
// ═══════════════════════════════════════════════════

export async function verifyAccessToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const payload = jwt.verify(token, JWT_CONFIG.access.secret, {
      issuer: JWT_CONFIG.access.issuer,
      audience: JWT_CONFIG.access.audience,
      clockTolerance: 30, // 30 seconds clock skew tolerance
    }) as TokenPayload;

    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return null; // Expired, needs refresh
    }
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("[JWT] Invalid token:", error.message);
      return null;
    }
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<{ sub: string; sessionId: string } | null> {
  try {
    const payload = jwt.verify(token, JWT_CONFIG.refresh.secret, {
      issuer: JWT_CONFIG.refresh.issuer,
      audience: JWT_CONFIG.refresh.audience,
    }) as any;

    if (payload.type !== "refresh") {
      return null;
    }

    return {
      sub: payload.sub,
      sessionId: payload.sessionId,
    };
  } catch (error) {
    console.error("[JWT] Refresh token verification failed:", error);
    return null;
  }
}

// ═══════════════════════════════════════════════════
// Token Utilities
// ═══════════════════════════════════════════════════

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenExpiry(token: string): Date | null {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return null;
  return new Date(decoded.exp * 1000);
}

export function isTokenExpiringSoon(token: string, thresholdMinutes: number = 5): boolean {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;

  const thresholdMs = thresholdMinutes * 60 * 1000;
  return expiry.getTime() - Date.now() < thresholdMs;
}

// ═══════════════════════════════════════════════════
// Security Utilities
// ═══════════════════════════════════════════════════

export function generateSessionId(): string {
  return randomBytes(16).toString("hex");
}

export function generateDeviceFingerprint(
  userAgent: string,
  ipAddress: string
): string {
  const data = `${userAgent}:${ipAddress}`;
  return createHash("sha256").update(data).digest("hex").substring(0, 16);
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// ═══════════════════════════════════════════════════
// Cookie Configuration
// ═══════════════════════════════════════════════════

export const COOKIE_CONFIG = {
  access: {
    name: "access_token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 15 * 60, // 15 minutes
    path: "/",
  },
  refresh: {
    name: "refresh_token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/api/auth/refresh",
  },
};

// ═══════════════════════════════════════════════════
// Password Security (Argon2id wrapper)
// ═══════════════════════════════════════════════════

export async function hashPassword(password: string): Promise<string> {
  // In production, use argon2:
  // import argon2 from "argon2";
  // return argon2.hash(password, { type: argon2id });

  // For this architecture, we document the expected interface:
  // This should be replaced with actual argon2 implementation
  const { hash } = await import("bcrypt");
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  // In production, use argon2:
  // return argon2.verify(hash, password);

  const { compare } = await import("bcrypt");
  return compare(password, hash);
}

// ═══════════════════════════════════════════════════
// OTP Generation
// ═══════════════════════════════════════════════════

export function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  const bytes = randomBytes(length);
  for (let i = 0; i < length; i++) {
    otp += digits[bytes[i] % 10];
  }
  return otp;
}

export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString("hex");
}
