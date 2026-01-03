import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

// Basic health check endpoint test

test('GET /api/health should return status ok and features list', async () => {
  process.env.NODE_ENV = 'test';

  const response = await request(app).get('/api/health');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, 'ok');
  assert.ok(Array.isArray(response.body.features));
  assert.ok(response.body.features.length > 0);
});
