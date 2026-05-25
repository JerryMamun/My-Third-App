# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      BLUEBIRD ONLINE                        │
├─────────────────────────────────────────────────────────────┤
│
│  ┌──────────────────┐      ┌──────────────────┐
│  │   Frontend       │      │   Mobile App     │
│  │  (Next.js 15)    │      │   (React Native) │
│  └────────┬─────────┘      └────────┬─────────┘
│           │                         │
│           └──────────────┬──────────┘
│                          │
│        ┌─────────────────▼──────────────────┐
│        │    API Gateway (Fastify)          │
│        │  - Authentication                 │
│        │  - Rate Limiting                  │
│        │  - Request Validation             │
│        └─────────────────┬──────────────────┘
│                          │
│  ┌───────────────────────┼──────────────────────┐
│  │                       │                      │
│  ▼                       ▼                      ▼
│ ┌─────────────┐    ┌──────────┐        ┌────────────┐
│ │   Routes    │    │ Services │        │ Middleware │
│ │ - Auth      │    │ - User   │        │ - Logger   │
│ │ - Users     │    │ - Billing│        │ - Validator│
│ │ - Billing   │    │ - Ticket │        │ - Guard    │
│ │ - Network   │    │ - Device │        │            │
│ └─────┬───────┘    └────┬─────┘        └────────────┘
│       └─────────┬────────┘
│                 │
│      ┌──────────▼──────────┐
│      │   Database Layer    │
│      │   (Prisma ORM)      │
│      └──────────┬──────────┘
│                 │
│  ┌──────────────▼──────────────┐
│  │   PostgreSQL Database       │
│  │ - User Data                 │
│  │ - Subscriptions             │
│  │ - Billing Records           │
│  │ - Support Tickets           │
│  │ - Network Topology          │
│  │ - Audit Logs                │
│  └─────────────────────────────┘
│
│  ┌──────────────────────────┐
│  │   Caching Layer (Redis)  │
│  │ - Sessions               │
│  │ - Rate Limit Counters    │
│  │ - Cache Data             │
│  └──────────────────────────┘
│
│  ┌────────────────────────────────┐
│  │    Microservices               │
│  ├────────────────────────────────┤
│  │ ▶ MikroTik Service             │
│  │   - RouterOS integration       │
│  │   - Bandwidth management       │
│  │                                │
│  │ ▶ Monitoring Service           │
│  │   - SNMP polling               │
│  │   - Device health              │
│  │                                │
│  │ ▶ Notification Service         │
│  │   - Email                      │
│  │   - SMS                        │
│  │   - Push notifications         │
│  └────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture Layers

### 1. **Presentation Layer** (Frontend)

**Technology**: Next.js 15 + React 19 + TypeScript

**Responsibilities**:
- User interface rendering
- Form validation
- API communication
- State management (Zustand)
- Authentication handling

**Key Directories**:
```
apps/web/src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utilities, API clients
├── stores/           # Zustand stores
└── types/            # TypeScript interfaces
```

---

### 2. **API Gateway Layer** (Backend)

**Technology**: Fastify + TypeScript

**Responsibilities**:
- Request routing
- Authentication & authorization
- Rate limiting
- Input validation
- Error handling
- Response formatting

**Key Directories**:
```
apps/api/src/
├── routes/           # API endpoints
├── services/         # Business logic
├── middleware/       # Request/response middleware
├── plugins/          # Fastify plugins
├── guards/           # Route guards (Auth, Role-based)
├── validators/       # Input validation (Zod)
├── types/            # TypeScript types
└── utils/            # Utility functions
```

**API Versioning**: `/api/v1/`

---

### 3. **Business Logic Layer** (Services)

**Pattern**: Service Layer Architecture

**Services**:
- `UserService` - User management
- `BillingService` - Invoice & subscription handling
- `TicketService` - Support ticket management
- `DeviceService` - Network device management
- `AuthService` - Authentication logic
- `NotificationService` - Multi-channel notifications

**Example Service**:
```typescript
export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    // Validate input
    // Hash password
    // Create in database
    // Send notification
    // Return user
  }
}
```

---

### 4. **Data Access Layer** (Database)

**ORM**: Prisma

**Database**: PostgreSQL

**Key Entities**:

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  password      String   // Hashed
  role          Role
  subscriptions Subscription[]
  tickets       Ticket[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  plan      Plan
  status    Status
  startDate DateTime
  endDate   DateTime?
  createdAt DateTime @default(now())
}

model Ticket {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String
  status    TicketStatus
  priority  Priority
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### 5. **Cache Layer** (Redis)

**Technology**: Redis

**Use Cases**:
- Session storage
- Rate limit counters
- Temporary data cache
- Real-time notifications

```typescript
// Cache example
const cacheKey = `user:${userId}`;
const cached = await redis.get(cacheKey);

if (!cached) {
  const user = await db.user.findUnique({ where: { id: userId } });
  await redis.set(cacheKey, JSON.stringify(user), { EX: 3600 }); // 1 hour
  return user;
}

return JSON.parse(cached);
```

---

### 6. **Shared Libraries**

### `packages/database`
- Prisma schema
- Database migrations
- Seed scripts
- Generated Prisma client

### `packages/ui`
- shadcn/ui components
- Custom component library
- Design tokens
- Tailwind configuration

### `packages/shared`
- TypeScript interfaces
- Utility functions
- Constants
- Helper functions

```typescript
// packages/shared/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

### 7. **Microservices**

### MikroTik Service
```
services/mikrotik/
├── src/
│   ├── client/        # RouterOS API client
│   ├── services/      # Business logic
│   └── types/
├── package.json
└── Dockerfile
```

**Responsibilities**:
- Connect to RouterOS devices
- Manage bandwidth
- Configure interfaces
- Monitor traffic

### Monitoring Service
```
services/monitoring/
├── src/
│   ├── collectors/    # SNMP collectors
│   ├── parsers/       # Data parsers
│   └── alerts/
├── package.json
└── Dockerfile
```

**Responsibilities**:
- Poll device metrics
- Collect SNMP data
- Generate alerts
- Store metrics

### Notification Service
```
services/notifications/
├── src/
│   ├── providers/     # Email, SMS, Push
│   ├── queue/         # Job queue
│   └── templates/
├── package.json
└── Dockerfile
```

**Responsibilities**:
- Send emails (Nodemailer)
- Send SMS (Twilio)
- Push notifications (FCM)
- Queue management

---

## Data Flow Example: User Registration

```
1. Frontend (Next.js)
   └─> User fills registration form
       └─> Validates with Zod schema
           └─> Sends POST to /api/v1/auth/register

2. API Gateway (Fastify)
   └─> Receives request
       └─> Validates input (middleware)
           └─> Calls AuthService.register()

3. Business Logic (Services)
   └─> AuthService.register()
       └─> Hash password with bcrypt
           └─> Check email exists (UserService)
               └─> Create user in database

4. Database (PostgreSQL)
   └─> INSERT INTO users (email, name, password, role)
       └─> Return created user

5. Notification (Microservice)
   └─> Publish "user.created" event
       └─> NotificationService receives event
           └─> Send welcome email

6. Response to Frontend
   └─> Return user data + JWT token
       └─> Frontend stores token in secure cookie
           └─> Redirects to dashboard
```

---

## Authentication Flow

```
┌──────────────────┐
│   User Login     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│ POST /api/v1/auth/login          │
│ { email, password }              │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 1. Find user by email            │
│ 2. Verify password with bcrypt   │
│ 3. Generate JWT tokens:          │
│    - Access (15 min)             │
│    - Refresh (7 days)            │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Return tokens + User data        │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Frontend stores in cookie        │
│ Next request includes JWT        │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ API validates JWT with secret    │
│ Extracts user info from token    │
│ Continues request processing     │
└──────────────────────────────────┘
```

---

## Error Handling Strategy

```typescript
// Centralized error handler
app.setErrorHandler((error, request, reply) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  logger.error({ error, statusCode, message });

  reply.status(statusCode).send({
    success: false,
    error: message,
    requestId: request.id,
  });
});
```

---

## API Response Format

```typescript
// Success Response
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}

// Error Response
{
  "success": false,
  "error": "Email already registered",
  "requestId": "req-456"
}

// Pagination Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

## Security Architecture

### Authentication
- ✅ JWT with strong secret
- ✅ Refresh token rotation
- ✅ Device fingerprinting
- ✅ Session management

### Authorization
- ✅ Role-Based Access Control (RBAC)
- ✅ 60+ permissions across 8 roles
- ✅ Route guards
- ✅ Field-level security

### Data Protection
- ✅ Password hashing (Argon2id)
- ✅ Encrypted credentials storage
- ✅ TLS/SSL for transit
- ✅ Environment variable secrets

### API Security
- ✅ Rate limiting (Redis)
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma)
- ✅ CORS configuration
- ✅ Helmet headers

---

## Deployment Architecture

```
┌──────────────────────────────────┐
│     Domain (bluebird.com)        │
└────────────────┬─────────────────┘
                 │
         ┌───────▼────────┐
         │   CDN (CloudFront)  │
         │  Static assets │
         └───────┬────────┘
                 │
        ┌────────▼─────────┐
        │ Load Balancer    │
        │ (Application LB) │
        └────────┬─────────┘
                 │
    ┌────────┬───┴────┬────────┐
    │        │        │        │
    ▼        ▼        ▼        ▼
  ┌────┐  ┌────┐  ┌────┐  ┌────┐
  │API │  │API │  │API │  │API │
  │ 1  │  │ 2  │  │ 3  │  │ 4  │
  └──┬─┘  └──┬─┘  └──┬─┘  └──┬─┘
     └──────┬─┴──────┬┘
            │        │
    ┌───────▼────────▼─────┐
    │  RDS PostgreSQL      │
    │  (Multi-AZ)          │
    └──────────────────────┘
     
    ┌──────────────────┐
    │ Redis Cluster    │
    │ (Cache Layer)    │
    └──────────────────┘
```

---

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **API** | Fastify, Node.js |
| **ORM** | Prisma |
| **Database** | PostgreSQL |
| **Cache** | Redis |
| **Authentication** | JWT, bcrypt |
| **Validation** | Zod |
| **UI Components** | shadcn/ui, Tailwind CSS |
| **State Management** | Zustand, React Query |
| **Testing** | Jest, Vitest |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker, Docker Compose |
| **Monitoring** | Sentry, DataDog |

---

**Architecture Version**: 1.0  
**Last Updated**: 2026-05-25
