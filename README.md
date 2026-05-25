# 🐦 Bluebird Online

**Enterprise ISP Management Ecosystem**

A full-stack digital platform for fiber internet service providers, built with modern SaaS architecture.

---

## 📋 What's Included (Phase 1 Foundation)

### Architecture
- ✅ Monorepo structure with Turborepo
- ✅ Docker Compose orchestration (PostgreSQL, Redis, Nginx)
- ✅ Environment variable strategy
- ✅ API Gateway (Fastify) with OpenAPI docs
- ✅ Modular service architecture (extractable to microservices)

### Database
- ✅ Complete Prisma schema (25+ models)
- ✅ Multi-role user system (Customer + 8 Staff roles)
- ✅ Billing & invoicing schema
- ✅ Support ticket system
- ✅ Network infrastructure (POP, Routers, ONU)
- ✅ Coverage zone management
- ✅ Audit logging & notifications

### Design System
- ✅ Tailwind CSS with custom theme
- ✅ Linear/Vercel-inspired design tokens
- ✅ Dark/Light mode CSS variables
- ✅ Glassmorphism utilities
- ✅ Network status color system
- ✅ Animation system (fade, scale, shimmer)
- ✅ Typography & spacing scale

### Authentication
- ✅ JWT access + refresh token architecture
- ✅ Next.js middleware with route protection
- ✅ Role-based access control (RBAC)
- ✅ 60+ permissions across 8 staff roles
- ✅ Device fingerprinting & session management
- ✅ Password hashing (Argon2id interface)
- ✅ OTP generation utilities

---

## 🏗️ Project Structure

```
bluebird-online/
├── apps/
│   ├── web/              # Next.js 15 (Public + Portal + Admin)
│   └── api/              # Fastify API Gateway
├── packages/
│   ├── database/         # Prisma schema & client
│   ├── ui/               # shadcn/ui components
│   ├── shared/           # Types & utilities
│   └── config/           # Shared configs
├── services/
│   ├── mikrotik/         # RouterOS API service
│   ├── monitoring/       # ONU/SNMP polling service
│   └── notifications/    # Multi-channel notification dispatcher
├── docker/               # Dockerfiles & Nginx config
├── docs/                 # Architecture documentation
└── scripts/              # Setup & deployment scripts
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker & Docker Compose

### Setup
```bash
# 1. Run setup script
node scripts/setup.js

# 2. Update environment variables
cp .env.example .env.local
# Edit .env.local with your secrets

# 3. Start development
pnpm dev:web    # Next.js app (localhost:3000)
pnpm dev:api    # API server (localhost:3001)

# 4. Open Prisma Studio
pnpm db:studio  # Database GUI (localhost:5555)
```

### Docker (All Services)
```bash
docker-compose up -d
```

---

## 🔐 Environment Variables

Key variables to configure:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection |
| `REDIS_URL` | Redis connection |
| `JWT_SECRET` | JWT signing key (32+ chars) |
| `JWT_REFRESH_SECRET` | Refresh token key |
| `MIKROTIK_ENCRYPTION_KEY` | Router credential encryption |
| `SSLCOMMERZ_*` | Payment gateway credentials |
| `BKASH_*` | bKash mobile banking |
| `NAGAD_*` | Nagad mobile banking |
| `SMS_GATEWAY_*` | SMS provider |
| `OPENAI_API_KEY` | AI assistant |

---

## 🎨 Design System

### Colors
- **Brand Blue:** `#0ea5e9` → `#0284c7`
- **Cyan Accent:** `#06b6d4` → `#22d3ee` (Fiber optic light)
- **Navy Dark:** `#0f172a` → `#020617`
- **Success:** `#22c55e` | **Warning:** `#eab308` | **Danger:** `#ef4444`

### Typography
- **Primary:** Inter (sans-serif)
- **Monospace:** JetBrains Mono (data/technical)
- **Bangla:** Noto Sans Bengali

### Shadows
- Card: `0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)`
- Dropdown: `0 10px 15px -3px rgba(0,0,0,0.1)`
- Modal: `0 25px 50px -12px rgba(0,0,0,0.25)`

---

## 👥 User Roles

| Role | Description |
|------|-------------|
| **Customer** | Self-service portal user |
| **Super Admin** | Full system access |
| **Admin** | Operations management |
| **NOC Engineer** | Network operations center |
| **Technician** | Field/installation tech |
| **Billing Manager** | Financial operations |
| **Sales Manager** | Package & coverage management |
| **Support Agent** | Ticket handling |
| **Field Engineer** | On-site maintenance |

---

## 📡 API Documentation

Once the API server is running, visit:
- **Swagger UI:** http://localhost:3001/docs
- **Health Check:** http://localhost:3001/health

---

## 🛡️ Security Features

- ✅ Rate limiting (Redis-backed sliding window)
- ✅ Helmet security headers
- ✅ CORS with strict origin whitelist
- ✅ JWT with device fingerprinting
- ✅ Rotating refresh tokens
- ✅ Row-level security ready (tenant_id)
- ✅ Input validation (Zod schemas)
- ✅ Credential encryption (AES-256)
- ✅ Audit logging

---

## 📈 Build Order

| Phase | Priority | Status |
|-------|----------|--------|
| 1. Foundation | 🔴 Critical | ✅ Complete |
| 2. Auth System | 🔴 Critical | ✅ Architecture Ready |
| 3. Public Website | 🟡 High | ⏳ Next |
| 4. Customer Portal | 🔴 Critical | ⏳ Pending |
| 5. Billing | 🔴 Critical | ⏳ Pending |
| 6. MikroTik Integration | 🔴 Critical | ⏳ Pending |
| 7. NOC Dashboard | 🟡 High | ⏳ Pending |
| 8. Ticket System | 🟡 High | ⏳ Pending |
| 9. AI Assistant | 🟢 Medium | ⏳ Pending |
| 10. Mobile App | 🟢 Medium | ⏳ Pending |

---

## 📄 License

UNLICENSED — Proprietary software for Bluebird Technologies.

---

**Built with:** Next.js 15 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Redis · Fastify · Socket.IO
