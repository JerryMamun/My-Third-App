# Bluebird Online — Security Architecture

## Threat Model

### Assets
- Customer PII (names, addresses, phone, NID)
- Payment data (bKash/Nagad tokens, card references)
- MikroTik router credentials
- Network configuration data
- Billing/financial records

### Threats
1. Credential theft → MikroTik API compromise
2. Payment fraud → Unauthorized transactions
3. Data breach → Customer PII exposure
4. DDoS → Service unavailability
5. Insider threat → Staff abuse of privileges

## Security Layers

### Layer 1: Network Edge
- Cloudflare/Vercel Edge for DDoS protection
- WAF rules for common attack patterns
- Geo-blocking (configurable)
- TLS 1.3 termination

### Layer 2: Application
- Rate limiting per IP + per user (Redis-backed)
- CORS strict origin whitelist
- Helmet security headers
- Input validation with Zod
- SQL injection prevention (Prisma ORM)
- XSS protection (React auto-escaping + CSP)
- CSRF tokens for state-changing operations

### Layer 3: Authentication
- JWT RS256 asymmetric signing
- Rotating refresh tokens (httpOnly cookies)
- Device fingerprinting
- Session binding to IP
- Argon2id password hashing
- Brute-force protection (exponential backoff)

### Layer 4: Authorization
- RBAC with 8 staff roles
- ABAC for fine-grained access
- Row-level security (tenant_id)
- API endpoint-level permission checks

### Layer 5: Data
- AES-256-GCM for MikroTik credentials
- PostgreSQL TDE for sensitive tables
- PII minimization (only collect necessary data)
- Bangladesh DPA compliance
- Audit logging for all data access

### Layer 6: Infrastructure
- Docker non-root containers
- Network segmentation (Docker networks)
- Secrets management (HashiCorp Vault / AWS Secrets Manager)
- Automated security scanning (Trivy, Snyk)

## Encryption Strategy

| Data Type | At Rest | In Transit | Algorithm |
|-----------|---------|-----------|-----------|
| Passwords | Hashed | N/A | Argon2id |
| MikroTik creds | Encrypted | Encrypted | AES-256-GCM |
| JWT tokens | N/A | Signed | RS256 |
| PII | Encrypted (DB) | TLS 1.3 | AES-256 |
| Payment tokens | Encrypted | TLS 1.3 | AES-256 |
| Session data | Encrypted (Redis) | N/A | AES-256 |

## Audit Logging

All security-relevant events are logged:
- Login attempts (success/failure)
- Password changes
- Permission changes
- Data exports
- MikroTik config changes
- Payment transactions
- Failed authorization attempts

## Incident Response

1. Detection: Automated alerts (Sentry, Prometheus)
2. Containment: Isolate affected systems
3. Investigation: Review audit logs
4. Recovery: Restore from backups
5. Post-incident: Update security measures
