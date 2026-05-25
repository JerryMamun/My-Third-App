# Development Guide

## Prerequisites

- **Node.js**: 20+ (Download from [nodejs.org](https://nodejs.org))
- **pnpm**: 9+ (Install with `npm install -g pnpm`)
- **Docker & Docker Compose**: For services (Optional but recommended)
- **Git**: Version control

---

## Quick Start (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/JerryMamun/My-Third-App.git
cd My-Third-App

# 2. Run setup script (installs dependencies, creates .env.local)
node scripts/setup.js

# 3. Start Docker services
docker-compose up -d

# 4. Start development servers
pnpm dev

# 5. Open in browser
# Frontend: http://localhost:3000
# API: http://localhost:3001
```

---

## Project Structure

```
My-Third-App/
├── apps/
│   ├── web/              # Next.js Frontend (React 19)
│   │   ├── src/
│   │   │   ├── app/      # App Router pages
│   │   │   ├── components/  # Reusable components
│   │   │   ├── hooks/    # Custom hooks
│   │   │   └── lib/      # Utilities
│   │   └── public/       # Static assets
│   └── api/              # Fastify API Server
│       ├── src/
│       │   ├── routes/   # API endpoints
│       │   ├── services/ # Business logic
│       │   ├── middleware/
│       │   └── plugins/
│       └── prisma/       # Database client
├── packages/
│   ├── database/         # Prisma ORM
│   │   └── prisma/
│   │       └── schema.prisma
│   ├── ui/               # Shared UI Components
│   ├── shared/           # Types & Utilities
│   └── config/           # Shared configs
├── services/             # Microservices
│   ├── mikrotik/         # RouterOS integration
│   ├── monitoring/       # SNMP monitoring
│   └── notifications/    # Alert system
├── docs/                 # Documentation
├── scripts/              # Setup scripts
├── docker/               # Docker configs
└── .github/
    ├── workflows/        # CI/CD pipelines
    └── hooks/            # Git hooks
```

---

## Development Commands

### Running Applications

```bash
# All servers
pnpm dev

# Specific server
pnpm dev:web     # Frontend only
pnpm dev:api     # API only

# Specific package
cd apps/web && pnpm dev
cd apps/api && pnpm dev
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Type check
pnpm typecheck

# Format code
pnpm format

# All checks (lint + typecheck + format)
pnpm check
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:web
pnpm build:api

# Production build
NODE_ENV=production pnpm build
```

---

## Database Management

### Prisma ORM

```bash
# Open Prisma Studio (visual database GUI)
pnpm db:studio

# Create a migration
pnpm db:migrate

# Apply migrations
pnpm db:migrate deploy

# Reset database (⚠️ DEVELOPMENT ONLY)
pnpm db:reset

# Seed database with initial data
pnpm db:seed

# Generate Prisma client
pnpm db:generate
```

### Database Schema

The schema is located at:
```
packages/database/prisma/schema.prisma
```

**Key Models:**
- `User` - Customers and staff
- `Subscription` - Service plans
- `Invoice` - Billing records
- `Ticket` - Support tickets
- `Device` - Network equipment
- `AccessLog` - Audit trail

---

## API Development

### API Structure

```
apps/api/src/
├── routes/
│   ├── auth/
│   ├── users/
│   ├── billing/
│   ├── tickets/
│   └── network/
├── services/
├── middleware/
├── plugins/
└── types/
```

### Creating an API Endpoint

**Example: Create a user endpoint**

```typescript
// apps/api/src/routes/users.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { db } from '@bluebird/database';

export async function userRoutes(app: FastifyInstance) {
  // GET /api/v1/users/:id
  app.get<{ Params: { id: string } }>(
    '/users/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = await db.user.findUnique({
        where: { id: request.params.id },
      });

      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      reply.send(user);
    }
  );

  // POST /api/v1/users
  app.post<{ Body: { email: string; name: string } }>(
    '/users',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = await db.user.create({
        data: {
          email: request.body.email,
          name: request.body.name,
        },
      });

      reply.status(201).send(user);
    }
  );
}
```

### API Documentation

API docs auto-generated with OpenAPI:
```
http://localhost:3001/docs
```

---

## Frontend Development

### Component Structure

```
apps/web/src/components/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── AuthGuard.tsx
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── dashboard/
│   ├── StatsCard.tsx
│   ├── Chart.tsx
│   └── Table.tsx
└── common/
    ├── Button.tsx
    ├── Input.tsx
    └── Modal.tsx
```

### Creating a Component

**Example: User Card Component**

```typescript
// apps/web/src/components/UserCard.tsx
import { User } from '@bluebird/database';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div 
      onClick={onClick}
      className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500 mt-2">
        Role: {user.role}
      </p>
    </div>
  );
}
```

### Using Hooks

```typescript
// apps/web/src/components/UserList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/api';

export function UserList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/users');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# App Configuration
NODE_ENV=development
APP_NAME=Bluebird Online

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bluebird

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# API
API_PORT=3001
API_URL=http://localhost:3001

# Web
WEB_PORT=3000
WEB_URL=http://localhost:3000
```

---

## Debugging

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "cwd": "${workspaceFolder}/apps/web"
    },
    {
      "name": "Fastify",
      "type": "node",
      "request": "attach",
      "port": 9230,
      "cwd": "${workspaceFolder}/apps/api"
    }
  ]
}
```

### Logging

```typescript
// Debug info
console.log('Value:', value);

// Use proper log levels
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

logger.info('Application started');
logger.error('An error occurred');
```

---

## Common Issues & Solutions

### Issue: Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev:web
```

### Issue: Database Connection Failed

```bash
# Check if Docker services are running
docker-compose ps

# Start services
docker-compose up -d

# Check logs
docker-compose logs postgres
```

### Issue: pnpm install fails

```bash
# Clear cache
pnpm store prune

# Reinstall
pnpm install

# If still fails, use npm
npm install
pnpm install
```

### Issue: TypeScript Errors

```bash
# Type check all packages
pnpm typecheck

# Fix in specific directory
cd apps/web
pnpm typecheck

# May need to regenerate Prisma client
pnpm db:generate
```

---

## Git Workflow

### Branch Naming

```
feature/add-user-auth
bugfix/fix-login-issue
docs/update-readme
refactor/simplify-api
chore/upgrade-dependencies
```

### Commit Message Format

```
feat: add user authentication
fix: resolve database timeout
docs: update development guide
refactor: simplify component logic
chore: update dependencies
```

### Creating a Pull Request

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push: `git push origin feature/your-feature`
4. Create PR on GitHub
5. Request review
6. Address feedback
7. Merge to main

---

## Performance Tips

### Frontend

- Use `React.memo` for expensive components
- Lazy load routes: `const Dashboard = dynamic(() => import('./Dashboard'))`
- Use image optimization: `<Image src={} priority responsive />`
- Code splitting with Next.js

### Backend

- Use database indexes on frequently queried fields
- Implement caching with Redis
- Use connection pooling
- Paginate large result sets
- Monitor slow queries

---

## Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Fastify Docs](https://www.fastify.io)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## Getting Help

1. Check existing issues on GitHub
2. Read documentation in `/docs`
3. Search Stack Overflow
4. Ask in project discussions
5. Contact team members

---

**Happy coding! 🐦**

Last Updated: 2026-05-25
