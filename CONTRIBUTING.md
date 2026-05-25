# Contributing to Bluebird Online

Thank you for your interest in contributing to Bluebird Online! This document provides guidelines and instructions for contributing to our project.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker & Docker Compose

### Setup Development Environment

```bash
# 1. Clone and navigate
cd My-Third-App

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env.local
# Edit with your configuration

# 4. Start development
pnpm dev

# 5. Open in browser
# Web: http://localhost:3000
# API: http://localhost:3001
# Docs: http://localhost:3001/docs
```

## Development Workflow

### Branch Naming

Follow this convention:
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `chore/description` - Maintenance tasks

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add user authentication module
fix: resolve database connection timeout
docs: update setup instructions
refactor: simplify data validation logic
```

### Code Style

- **TypeScript**: Use strict mode (`strict: true` in tsconfig.json)
- **Formatting**: Run `pnpm format` before committing
- **Linting**: Run `pnpm lint` and fix all issues
- **Type Checking**: Run `pnpm typecheck` and resolve all errors

```bash
# Before pushing
pnpm lint
pnpm typecheck
pnpm format
```

### Testing

```bash
# Run all tests
pnpm test

# Test specific package
pnpm test --filter=web
pnpm test --filter=api
```

## Project Structure

```
apps/
  ├── web/           # Next.js 15 frontend application
  └── api/           # Fastify API server

packages/
  ├── database/      # Prisma ORM & schemas
  ├── ui/            # Shared UI components (shadcn/ui)
  ├── shared/        # TypeScript types & utilities
  └── config/        # Shared configurations

services/
  ├── mikrotik/      # RouterOS integration
  ├── monitoring/    # ONU/SNMP monitoring
  └── notifications/ # Multi-channel notifications

docs/               # Architecture & technical documentation
scripts/            # Setup and utility scripts
```

## Working with the Monorepo

### Run commands in all packages

```bash
pnpm dev        # Start all dev servers
pnpm build      # Build all packages
pnpm lint       # Lint all packages
```

### Run commands in specific package

```bash
pnpm dev:web     # Next.js only
pnpm dev:api     # API only
pnpm build:web   # Build frontend
pnpm build:api   # Build API
```

## Database Migrations

```bash
# Create migration
pnpm db:migrate

# Reset database (development only!)
pnpm db:reset

# Open Prisma Studio
pnpm db:studio

# Seed database
pnpm db:seed
```

## Pull Request Process

1. **Create Feature Branch**: Based on current main
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**: Write clean, well-documented code

3. **Test Locally**
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

4. **Commit with Conventional Messages**
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature
   ```

6. **PR Description Should Include**:
   - What problem does this solve?
   - How was it tested?
   - Screenshots (if UI changes)
   - Related issues/tickets

## Code Review Guidelines

- Address all feedback constructively
- Request re-review after making changes
- Use "Resolve" on completed comments
- Aim for collaborative problem-solving

## Common Issues & Solutions

### Issue: Dependencies not installing
```bash
pnpm clean
pnpm install
```

### Issue: Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev:web
```

### Issue: Database connection failed
```bash
# Start Docker services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f postgres
```

### Issue: TypeScript errors
```bash
# Check types across all packages
pnpm typecheck

# Fix in specific package
cd packages/database
pnpm typecheck
```

## Documentation

- Keep README.md updated
- Comment complex logic
- Document API endpoints
- Update architecture docs in `/docs`

## Performance Considerations

- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize database queries
- Monitor bundle size with `next/bundle-analyzer`

## Security Best Practices

- Never commit secrets (use .env.local)
- Validate all user input (use Zod)
- Use HTTPS in production
- Keep dependencies updated
- Follow OWASP guidelines

## Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Docker deployment
docker-compose -f docker-compose.yml up -d
```

## Questions?

- Check existing issues/PRs for similar topics
- Review architecture docs in `/docs`
- Ask in project discussions
- Contact core team members

---

**Thank you for contributing to Bluebird Online!** 🐦
