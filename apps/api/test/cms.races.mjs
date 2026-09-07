// Build first. Run with a disposable local DATABASE_URL and CMS_TEST_ALLOW_MUTATIONS=true.
import assert from 'node:assert/strict';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import bcrypt from 'bcryptjs';
import { AuthService } from '../dist/auth/auth.service.js';
import { UsersController } from '../dist/users/users.controller.js';
import * as schema from '../dist/db/schema.js';

const connectionString = process.env.DATABASE_URL;
const target = new URL(connectionString);
if (
  process.env.CMS_TEST_ALLOW_MUTATIONS !== 'true' ||
  !['localhost', '127.0.0.1'].includes(target.hostname) ||
  !target.pathname.includes('review')
)
  throw Error('Disposable local review DB required');
const pool = new Pool({ connectionString });
const dbs = { db: drizzle(pool, { schema }) };
const auth = new AuthService(dbs, {});
const controller = new UsersController(dbs);
const originalHash = bcrypt.hash;
const ids = [];
async function create(role = 'admin') {
  const hash = await originalHash('initial-test-password', 4);
  const {
    rows: [row],
  } = await pool.query(
    'INSERT INTO users (username,display_name,role,password_hash) VALUES ($1,$1,$2,$3) RETURNING id',
    [`race-${Date.now()}-${Math.random().toString(36).slice(2)}`, role, hash],
  );
  ids.push(row.id);
  return row.id;
}
try {
  const ownerId = await create('owner');
  const victimId = await create();
  let entered, release;
  const hashing = new Promise((r) => {
    entered = r;
  });
  const gate = new Promise((r) => {
    release = r;
  });
  bcrypt.hash = async (value, ...args) => {
    if (value === 'self-service-password') {
      entered();
      await gate;
    }
    return originalHash(value, ...args);
  };
  const selfChange = auth.changePassword(
    victimId,
    'initial-test-password',
    'self-service-password',
  );
  // Attach the rejection assertion before releasing the deterministic hashing barrier.
  const rejected = assert.rejects(selfChange, (e) => e.getStatus() === 401);
  await hashing;
  await controller.update({ user: { id: ownerId } }, victimId, {
    password: 'owner-reset-password',
  });
  release();
  await rejected;
  let row = (
    await pool.query(
      'SELECT password_hash,token_version FROM users WHERE id=$1',
      [victimId],
    )
  ).rows[0];
  assert(await bcrypt.compare('owner-reset-password', row.password_hash));
  assert.equal(row.token_version, 1);

  const competingId = await create();
  let enteredCount = 0,
    both,
    proceed;
  const bothHashing = new Promise((r) => {
    both = r;
  });
  const nextGate = new Promise((r) => {
    proceed = r;
  });
  bcrypt.hash = async (value, ...args) => {
    if (value.startsWith('competing-password-')) {
      if (++enteredCount === 2) both();
      await nextGate;
    }
    return originalHash(value, ...args);
  };
  const attempts = ['competing-password-one', 'competing-password-two'].map(
    (next) => auth.changePassword(competingId, 'initial-test-password', next),
  );
  const settled = Promise.allSettled(attempts);
  await bothHashing;
  proceed();
  const results = await settled;
  assert.equal(results.filter((r) => r.status === 'fulfilled').length, 1);
  assert.equal(
    results.filter(
      (r) => r.status === 'rejected' && r.reason.getStatus() === 401,
    ).length,
    1,
  );
  row = (
    await pool.query('SELECT token_version FROM users WHERE id=$1', [
      competingId,
    ])
  ).rows[0];
  assert.equal(row.token_version, 1);

  bcrypt.hash = originalHash;
  const secondOwnerId = await create('owner');
  const demotions = await Promise.allSettled([
    controller.update({ user: { id: ownerId } }, secondOwnerId, {
      role: 'admin',
    }),
    controller.update({ user: { id: secondOwnerId } }, ownerId, {
      role: 'admin',
    }),
  ]);
  assert.equal(demotions.filter((r) => r.status === 'fulfilled').length, 1);
  const activeOwners = (
    await pool.query(
      "SELECT id FROM users WHERE id=ANY($1::int[]) AND role='owner' AND active",
      [[ownerId, secondOwnerId]],
    )
  ).rows;
  assert.equal(activeOwners.length, 1);
  console.log(
    'PASS: owner reset survives an overlapping self-change; competing password changes have exactly one winner; concurrent owner demotions preserve an owner.',
  );
} finally {
  bcrypt.hash = originalHash;
  if (ids.length)
    await pool.query('DELETE FROM users WHERE id=ANY($1::int[])', [ids]);
  await pool.end();
}
