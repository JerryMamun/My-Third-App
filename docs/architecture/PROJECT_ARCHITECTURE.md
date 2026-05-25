# Bluebird Online — ISP Management Ecosystem
## Architecture Documentation v1.0

---

## Executive Summary

Bluebird Online is a multi-module ISP digital platform built as a **modular monolith** with clear service boundaries. The architecture follows the 2026 SaaS best practice of starting monolithic with internal modularization, enabling future extraction into microservices without rewriting core logicciteweb_search:1#1.

**Architecture Pattern:** Modular Monolith + Service Isolation  
**Deployment:** Docker Compose (dev) → Kubernetes (prod)  
**Database:** PostgreSQL 15+ with Row-Level Security (RLS)  
**Real-time:** Socket.IO with Redis Adapter  
**Caching:** Redis 7+  
**Queue:** BullMQ (Redis-backed)

---

## Folder Structure Philosophy

```
bluebird-online/
├── apps/
│   ├── web/                    # Next.js 15 App Router (Public + Portal + Admin)
│   └── api/                    # Node.js API gateway (Fastify/Express)
├── packages/
│   ├── database/               # Prisma schema, migrations, type-safe client
│   ├── ui/                     # shadcn/ui + custom ISP components
│   ├── shared/                 # Types, constants, utilities
│   └── config/                 # ESLint, TS, Tailwind presets
├── services/                   # Background services (extractable to microservices)
│   ├── mikrotik/               # RouterOS API integration service
│   ├── monitoring/             # ONU/GPON polling & SNMP service
│   └── notifications/          # Multi-channel notification dispatcher
├── docker/                     # Dockerfiles & compose configs
├── infrastructure/             # Terraform IaC
├── scripts/                    # Setup & deployment scripts
└── docs/                       # Architecture Decision Records (ADRs)
```

### Design Principles

1. **Feature-Based Colocation:** All code for a feature lives in one directory (routes, components, hooks, types)
2. **API-First:** Backend defines OpenAPI spec; frontend consumes typed endpoints
3. **Database-First:** Prisma schema is the single source of truth for all services
4. **Environment-Driven:** Zero hardcoded config; everything via env vars
5. **Security by Default:** RLS policies, prepared statements, CSP headers, rate limiting

---

## App Router Structure (Next.js)

```
app/
├── (public)/                   # Marketing website (no auth)
│   ├── page.tsx                # Homepage
│   ├── packages/
│   ├── coverage/
│   ├── support/
│   └── layout.tsx              # Public layout (marketing nav)
├── (portal)/                   # Customer self-service (customer auth)
│   ├── dashboard/
│   ├── billing/
│   ├── tickets/
│   └── layout.tsx              # Portal layout (sidebar + header)
├── (admin)/                    # ISP Staff dashboard (staff auth + RBAC)
│   ├── noc/
│   ├── customers/
│   ├── billing/
│   ├── network/
│   └── layout.tsx              # Admin layout (NOC sidebar)
├── api/                        # Next.js API routes (auth webhooks, uploads)
└── layout.tsx                  # Root layout (providers, theme)
```

**Route Group Strategy:**
- `(public)` — SEO-optimized, static where possible, ISR for packages
- `(portal)` — Client-side rendered dashboard, real-time Socket.IO
- `(admin)` — Heavy data tables, Grafana-style monitoring views

---

## Service Architecture

### API Gateway (`apps/api`)
- **Framework:** Fastify (better performance than Express for high-throughput ISP APIs)
- **Responsibility:** Auth validation, rate limiting, request routing, response formatting
- **Pattern:** Controller → Service → Repository (clean architecture)

### MikroTik Service (`services/mikrotik`)
- **Responsibility:** RouterOS API v6/v7 integration, PPPoE sync, queue management
- **Pattern:** Queue-based job processing (BullMQ) for router commands
- **Retry Logic:** Exponential backoff, circuit breaker for router failures
- **Security:** Encrypted credential storage (AES-256), IP whitelisting

### Monitoring Service (`services/monitoring`)
- **Responsibility:** ONU polling via SNMP, optical power readings, fiber fault detection
- **Pattern:** Scheduled cron jobs + event-driven alerts
- **Data:** Time-series data stored in PostgreSQL (partitioned by month)

### Notification Service (`services/notifications`)
- **Responsibility:** SMS (Bangladesh gateways), Email, Push, Telegram, WhatsApp
- **Pattern:** Template engine + channel adapters + delivery tracking

---

## Database Strategy

### PostgreSQL Configuration
- **Primary:** Write operations + transactional reads
- **Read Replica:** Dashboard analytics, reporting, NOC monitoring (future scaling)
- **Partitioning:** Large tables (usage_logs, monitoring_data) partitioned by month
- **RLS:** Every table has `tenant_id` (for future multi-ISP SaaS mode)
- **Indexing:** GIN indexes for JSONB (MikroTik config), BRIN for time-series

### Prisma ORM Strategy
- **Schema Location:** `packages/database/prisma/schema.prisma` (single source of truth)
- **Client Generation:** Shared `@prisma/client` package used by all apps/services
- **Migrations:** Deployed via `prisma migrate deploy` in CI/CD
- **Soft Deletes:** `deletedAt` timestamp on all entities (Prisma middleware)
- **Audit Logging:** Automatic `createdAt`, `updatedAt`, `createdBy`, `updatedBy`

---

## Security Architecture

### Layer 1: Edge (Cloudflare/Vercel Edge)
- DDoS protection
- WAF rules
- Geo-blocking (if needed)
- SSL/TLS termination

### Layer 2: Application
- **Rate Limiting:** Redis-backed sliding window (per IP + per user)
- **CORS:** Strict origin whitelist
- **Helmet:** Security headers (CSP, HSTS, X-Frame-Options)
- **Input Validation:** Zod schemas for all API inputs

### Layer 3: Authentication
- **JWT:** RS256 asymmetric signing (private key on server, public key verifiable)
- **Refresh Tokens:** Rotating refresh tokens stored in httpOnly cookies
- **Session Binding:** Device fingerprint + IP validation
- **Passwords:** Argon2id hashing (OWASP recommended)

### Layer 4: Authorization
- **RBAC:** Role-Permission-Resource matrix
- **ABAC:** Attribute-based for fine-grained (e.g., "technician can only see own zone")
- **Middleware:** Centralized permission evaluation before route handlers

### Layer 5: Data
- **Encryption at Rest:** PostgreSQL TDE for sensitive tables
- **Encryption in Transit:** TLS 1.3 everywhere
- **Credential Vault:** MikroTik passwords encrypted with AES-256-GCM
- **PII Handling:** Bangladesh DPA compliance, data minimization

---

## Scalability Roadmap

### Phase 1: Launch (0-5K customers)
- Single Docker Compose deployment
- Single PostgreSQL instance
- Redis for caching + sessions
- Next.js API routes (no separate API server)

### Phase 2: Growth (5K-50K customers)
- Extract API to standalone Fastify service
- PostgreSQL read replica for reporting
- CDN for static assets
- Horizontal scaling of API containers

### Phase 3: Enterprise (50K+ customers)
- Microservice extraction (MikroTik, Monitoring, Notifications)
- Kafka for event streaming
- Citus/Sharding for PostgreSQL
- Multi-region deployment

---

## Environment Variable Strategy

### Tiers
1. **Public (NEXT_PUBLIC_):** Only non-sensitive UI config (API base URL, feature flags)
2. **Server (Server-only):** Database URLs, JWT secrets, API keys
3. **Service:** Service-specific configs (MikroTik credentials, SMS gateways)
4. **Runtime:** Docker-injected at startup, never committed

### Management
- **Development:** `.env.local` (gitignored)
- **Staging:** GitHub Secrets + Vercel Env
- **Production:** HashiCorp Vault / AWS Secrets Manager
- **Rotation:** Automated quarterly rotation for API keys

---

## Naming Conventions

| Layer | Convention | Example |
|-------|-----------|---------|
| Database Tables | `snake_case`, plural | `pppoe_sessions`, `onu_devices` |
| Prisma Models | `PascalCase`, singular | `PppoeSession`, `OnuDevice` |
| API Routes | `kebab-case` | `/api/v1/pppoe-sessions` |
| React Components | `PascalCase` | `BandwidthChart`, `OnuStatusCard` |
| Hooks | `camelCase`, `use` prefix | `useBandwidth`, `useOnuStatus` |
| Utils | `camelCase` | `formatBytes`, `calculateLatency` |
| CSS Classes | `kebab-case` | `bandwidth-chart`, `onu-status-card` |
| Environment Vars | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `MIKROTIK_API_PORT` |

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend Framework | Next.js 15 App Router | SSR/ISR for SEO, RSC for dashboard performanceciteweb_search:1#2 |
| Styling | Tailwind CSS + shadcn/ui | Utility-first, design system consistency, rapid development |
| Backend API | Fastify (Node.js) | 20% faster than Express, built-in JSON schema validation |
| Database | PostgreSQL 15 | RLS, JSONB, pgvector for AI, proven at scale |
| ORM | Prisma 6 | Type safety, migration system, excellent DX |
| Real-time | Socket.IO + Redis | Fallback support, room-based broadcasting, horizontal scaling |
| Queue | BullMQ | Redis-backed, delayed jobs, retry logic, UI dashboard |
| Auth | Custom JWT + Refresh | ISP-specific multi-role requirements, PPPoE credential sync |
| Monitoring | Prometheus + Grafana | Industry standard, MikroTik SNMP exporter available |
| Payments | SSLCommerz + bKash + Nagad | Bangladesh market requirements |

---

## API Versioning Strategy

- **URL Versioning:** `/api/v1/...`, `/api/v2/...`
- **Header Versioning:** `Accept: application/vnd.bluebird.v1+json` (future)
- **Deprecation:** 6-month notice period, sunset headers
- **Documentation:** OpenAPI 3.1 spec auto-generated from Zod schemas

---

## Error Handling Strategy

### API Error Format (RFC 7807 Problem Details)
```json
{
  "type": "https://bluebird.online/errors/invoice-not-found",
  "title": "Invoice Not Found",
  "status": 404,
  "detail": "Invoice #INV-2026-0542 does not exist for customer BB-1024",
  "instance": "/api/v1/billing/invoices/INV-2026-0542",
  "code": "BILLING_INVOICE_NOT_FOUND",
  "timestamp": "2026-05-25T22:20:00Z",
  "traceId": "abc-123-def-456"
}
```

### Frontend Error Handling
- **API Client:** Centralized fetch wrapper with automatic token refresh
- **React Query:** Global error boundary + retry logic
- **Toast Notifications:** User-friendly error messages (Bangla + English)
- **Error Logging:** Sentry integration with source maps

---

## Build Order (Revised Priority)

| Step | Priority | Effort | Dependencies |
|------|----------|--------|--------------|
| 1. Foundation & Design System | 🔴 Critical | 2 days | None |
| 2. Database Schema & Auth | 🔴 Critical | 3 days | Step 1 |
| 3. Public Website | 🟡 High | 3 days | Step 1 |
| 4. Customer Portal Dashboard | 🔴 Critical | 4 days | Step 2 |
| 5. Billing System | 🔴 Critical | 5 days | Step 2, 4 |
| 6. MikroTik Integration | 🔴 Critical | 5 days | Step 2 |
| 7. NOC Dashboard | 🟡 High | 4 days | Step 2, 6 |
| 8. Ticket System | 🟡 High | 3 days | Step 2, 4 |
| 9. ONU Monitoring | 🟡 High | 4 days | Step 6 |
| 10. AI Assistant | 🟢 Medium | 5 days | Step 2, 4, 8 |
| 11. Mobile App | 🟢 Medium | 7 days | Step 2, 4, 5 |
| 12. DevOps & Security Hardening | 🔴 Critical | 3 days | All |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|----------|
| MikroTik API instability | High | Circuit breaker, local queue, fallback to SSH |
| Bangladesh payment gateway downtime | High | Multi-gateway failover, manual payment entry |
| Database performance at scale | Medium | Read replicas, partitioning, query optimization |
| Real-time WebSocket overload | Medium | Redis adapter, room optimization, pagination |
| Credential leakage | Critical | AES-256 encryption, vault storage, audit logging |

---

*Document generated: 2026-05-25*  
*Next review: After Phase 3 completion*
