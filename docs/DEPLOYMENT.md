# DEPLOYMENT GUIDE

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed and merged
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Secrets stored in secure vault
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Monitoring alerts set up
- [ ] Backup strategy in place

---

## Production Build

### Build All Packages

```bash
pnpm build
```

### Build Specific Package

```bash
pnpm build:web    # Frontend
pnpm build:api    # API Server
```

---

## Docker Deployment

### Build Docker Images

```bash
docker build -f docker/Dockerfile.api -t bluebird-api:latest .
docker build -f docker/Dockerfile.web -t bluebird-web:latest .
```

### Production Docker Compose

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## Environment Setup for Production

Create `.env.production`:

```env
# Application
NODE_ENV=production
APP_NAME=Bluebird Online

# API
API_PORT=3001
API_HOST=0.0.0.0
API_URL=https://api.bluebird.com

# Web
WEB_PORT=3000
WEB_URL=https://bluebird.com
NEXTAUTH_URL=https://bluebird.com
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Database (Use managed service like RDS)
DATABASE_URL=postgresql://user:password@rds.amazonaws.com:5432/bluebird

# Redis (Use managed service like ElastiCache)
REDIS_URL=redis://redis.amazonaws.com:6379

# JWT (Generate strong keys)
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Security
CORS_ORIGIN=https://bluebird.com
ENCRYPTION_KEY=$(openssl rand -base64 32)

# Payment Gateways
SSLCOMMERZ_STORE_ID=your_production_store_id
SSLCOMMERZ_STORE_PASSWORD=your_production_password
# ... other payment credentials

# Monitoring & Logging
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info
```

---

## Database Setup (Production)

### Create Database

```bash
createdb bluebird_prod

# Or on managed PostgreSQL service (AWS RDS, etc)
# Configure connection string in DATABASE_URL
```

### Run Migrations

```bash
pnpm db:migrate --schema=production

# Or using Prisma directly
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
```

### Seed Initial Data (Optional)

```bash
pnpm db:seed
```

---

## Application Deployment

### Using Railway/Render

1. Connect GitHub repository
2. Set environment variables
3. Configure build command:
   ```bash
   pnpm install && pnpm build
   ```
4. Configure start command:
   ```bash
   pnpm start
   ```

### Using AWS EC2

1. Launch EC2 instance
2. Install Node.js, Docker, Docker Compose
3. Clone repository
4. Configure environment
5. Start services with systemd or PM2

### Using Kubernetes

```bash
# Create namespace
kubectl create namespace bluebird

# Apply deployments
kubectl apply -f k8s/

# Check status
kubectl get pods -n bluebird
```

---

## Performance Optimization

### Frontend Optimization

```javascript
// next.config.js
module.exports = {
  compress: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 86400,
  },
};
```

### Backend Optimization

- Enable HTTP/2
- Use connection pooling
- Implement caching strategy
- Optimize database queries

---

## Monitoring & Logging

### Application Monitoring

- **Sentry**: Error tracking
- **DataDog**: Infrastructure monitoring
- **New Relic**: Performance monitoring

### Log Aggregation

- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **CloudWatch**: AWS logging service
- **Stackdriver**: Google Cloud logging

### Health Checks

```bash
# Health endpoint
curl https://api.bluebird.com/health

# Expected response
{
  "status": "ok",
  "timestamp": "2025-05-25T10:30:00Z",
  "uptime": 3600
}
```

---

## SSL/TLS Certificate

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d bluebird.com -d api.bluebird.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name api.bluebird.com;

    ssl_certificate /etc/letsencrypt/live/api.bluebird.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.bluebird.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3001;
    }
}
```

---

## Backup Strategy

### Database Backup

```bash
# Manual backup
pg_dump bluebird_prod > backup-$(date +%Y%m%d).sql

# Automated backup (daily)
# Configure in managed database service
```

### Regular Backup Schedule

- **Hourly**: Critical data
- **Daily**: Full database
- **Weekly**: Full system
- **Monthly**: Archive to cold storage

---

## Scaling Considerations

### Horizontal Scaling

1. **Load Balancer**: Distribute traffic
2. **Multiple API Instances**: Run multiple containers
3. **Database Replication**: Read replicas
4. **Redis Cluster**: Distributed caching

### Vertical Scaling

- Increase instance size
- Allocate more memory
- Add CPU resources
- Upgrade storage

---

## Security Hardening

### Application Security

```bash
# Enable security headers (Nginx)
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### Access Control

- Restrict SSH access
- Use strong authentication
- Enable 2FA for all accounts
- Implement IP whitelisting

### Data Protection

- Encrypt sensitive data at rest
- Use TLS for all communications
- Implement field-level encryption
- Regular security audits

---

## Rollback Procedure

### Quick Rollback

```bash
# Using Docker
docker-compose down
docker-compose -f docker-compose.yml up -d

# Using Git
git checkout previous-stable-tag
pnpm build && pnpm start
```

### Database Rollback

```bash
# Restore from backup
psql bluebird_prod < backup-previous.sql
```

---

## Post-Deployment Verification

```bash
# Health checks
curl https://api.bluebird.com/health
curl https://bluebird.com/

# Database connection
psql $DATABASE_URL -c "SELECT version();"

# API test
curl -H "Content-Type: application/json" \
  https://api.bluebird.com/api/v1/status

# Check logs
docker-compose logs -f api
docker-compose logs -f web
```

---

## Maintenance Window

### Planned Maintenance

```bash
# Set maintenance mode
echo "maintenance_mode=true" >> .env

# Restart services
docker-compose restart

# Update and build
git pull origin main
pnpm install && pnpm build

# Run migrations
pnpm db:migrate

# Resume services
echo "maintenance_mode=false" >> .env
docker-compose restart
```

---

## Incident Response

### If Something Goes Wrong

1. **Assess**: Identify the issue
2. **Isolate**: Prevent further damage
3. **Communicate**: Notify stakeholders
4. **Fix**: Apply fix or rollback
5. **Test**: Verify resolution
6. **Document**: Update incident log

---

## Support & Escalation

- 📞 On-call rotation
- 🔔 Alert thresholds
- 📋 Runbook documentation
- 🗂️ Post-mortem process

---

**Stay safe in production! 🐦**

Last Updated: 2025-05-25
