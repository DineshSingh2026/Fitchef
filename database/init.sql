-- Run this ONCE as PostgreSQL superuser (e.g. postgres) to create the app user and database.
-- Example: psql -U postgres -f database/init.sql

-- Create role and database (skip if they already exist)
CREATE ROLE fitchef_user WITH LOGIN PASSWORD 'Sai@2002';
CREATE DATABASE fitchef OWNER fitchef_user;

-- Grant connect (needed for remote or some setups)
GRANT CONNECT ON DATABASE fitchef TO fitchef_user;

-- Then run schema.sql while connected to database 'fitchef' as fitchef_user:
-- psql -U fitchef_user -d fitchef -f database/schema.sql
