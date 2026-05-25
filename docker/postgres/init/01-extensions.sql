CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'bluebird_app') THEN
        CREATE USER bluebird_app WITH PASSWORD 'bluebird_app_secure_2026';
    END IF;
END
$$;

GRANT CONNECT ON DATABASE bluebird TO bluebird_app;
GRANT USAGE ON SCHEMA public TO bluebird_app;
GRANT CREATE ON SCHEMA public TO bluebird_app;
