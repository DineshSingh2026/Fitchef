import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';
const pool = connectionString
  ? new Pool({
      connectionString,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ...(isProduction && {
        ssl: { rejectUnauthorized: false },
      }),
    })
  : null;

if (pool) {
  pool.on('connect', () => {
    console.log('[DB] PostgreSQL pool connected');
  });
  pool.on('error', (err) => {
    console.error('[DB] Unexpected pool error:', err.message);
  });
} else {
  console.warn('[DB] DATABASE_URL not set; subscribe and contact APIs will fail until configured.');
}

/** @returns {pg.Pool | null} */
export function getPool() {
  return pool;
}

export default pool;
