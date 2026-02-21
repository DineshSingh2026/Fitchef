import { test, describe } from 'node:test';
import assert from 'node:assert';
import pool from '../config/db.js';

describe('Database connection', () => {
  test('pool connects and SELECT 1 succeeds', async () => {
    const res = await pool.query('SELECT 1 AS one');
    assert.strictEqual(res.rows.length, 1);
    assert.strictEqual(res.rows[0].one, 1);
  });

  test('subscribers table exists and is queryable', async () => {
    const res = await pool.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'subscribers' ORDER BY ordinal_position"
    );
    const columns = res.rows.map((r) => r.column_name);
    assert.ok(columns.includes('id'), 'subscribers should have id');
    assert.ok(columns.includes('email'), 'subscribers should have email');
    assert.ok(columns.includes('created_at'), 'subscribers should have created_at');
  });
});
