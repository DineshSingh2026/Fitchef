import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import { app } from '../app.js';

const API = request(app);

describe('API', () => {
  describe('GET /api/health', () => {
    test('returns 200 and success message', async () => {
      const res = await API.get('/api/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.message);
    });
  });

  describe('POST /api/subscribe', () => {
    const unique = `test-${Date.now()}@example.com`;

    test('missing email returns 400', async () => {
      const res = await API.post('/api/subscribe').send({});
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.message?.toLowerCase().includes('email'));
    });

    test('invalid email returns 400', async () => {
      const res = await API.post('/api/subscribe').send({ email: 'not-an-email' });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    test('valid email returns 201 and success', async () => {
      const res = await API.post('/api/subscribe').send({ email: unique });
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.message, 'Successfully subscribed for early access.');
    });

    test('duplicate email returns 409', async () => {
      const res = await API.post('/api/subscribe').send({ email: unique });
      assert.strictEqual(res.status, 409);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, 'Email already registered.');
    });

    test('trims and lowercases email', async () => {
      const u = `  trim-${Date.now()}@EXAMPLE.COM  `;
      const res = await API.post('/api/subscribe').send({ email: u });
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
    });
  });

  describe('GET /api/admin/subscribers', () => {
    const validKey = process.env.ADMIN_API_KEY;

    test('without API key returns 401', async () => {
      const res = await API.get('/api/admin/subscribers');
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    test('with wrong API key returns 401', async () => {
      const res = await API.get('/api/admin/subscribers').set('X-API-Key', 'wrong-key');
      assert.strictEqual(res.status, 401);
    });

    test('with valid X-API-Key returns 200 and subscribers array', async () => {
      if (!validKey) {
        console.warn('Skip: ADMIN_API_KEY not set');
        return;
      }
      const res = await API.get('/api/admin/subscribers').set('X-API-Key', validKey);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.subscribers));
      assert.strictEqual(typeof res.body.count, 'number');
    });

    test('with valid query apiKey returns 200', async () => {
      if (!validKey) return;
      const res = await API.get('/api/admin/subscribers').query({ apiKey: validKey });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
    });
  });
});
