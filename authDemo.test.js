import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_ADMIN_USERNAME, DEMO_ADMIN_PASSWORD, DEMO_SESSION_KEY, pageFromPath, validDemoCredentials, readDemoSession, saveDemoSession } from './authDemo.js';

function memoryStorage() {
  const memory = new Map();
  return {
    getItem: key => memory.get(key) ?? null,
    setItem: (key, value) => memory.set(key, value),
    removeItem: key => memory.delete(key),
    memory
  };
}

test('direct /admin navigation resolves to merchant view, other paths to storefront', () => {
  assert.equal(pageFromPath('/'), 'store');
  assert.equal(pageFromPath('/admin'), 'admin');
  assert.equal(pageFromPath('/admin/'), 'admin');
  assert.equal(pageFromPath('/anywhere'), 'store');
});

test('demo username and password are both required', () => {
  assert.equal(validDemoCredentials(DEMO_ADMIN_USERNAME, DEMO_ADMIN_PASSWORD), true);
  assert.equal(validDemoCredentials('wrong', DEMO_ADMIN_PASSWORD), false);
  assert.equal(validDemoCredentials(DEMO_ADMIN_USERNAME, 'wrong'), false);
  assert.equal(validDemoCredentials(DEMO_ADMIN_USERNAME, ''), false);
  assert.equal(validDemoCredentials('  merchant  ', '  NexusDemo2026!  '), true);
  assert.equal(validDemoCredentials(DEMO_ADMIN_USERNAME, 'nexusdemo2026!'), false);
  assert.equal(validDemoCredentials(DEMO_ADMIN_USERNAME, null), false);
  assert.equal(validDemoCredentials(null, DEMO_ADMIN_PASSWORD), false);
});

test('demo session can be created and removed within the session store', () => {
  const storage = memoryStorage();
  assert.equal(readDemoSession(storage), false);
  assert.equal(saveDemoSession(storage, true), true);
  assert.equal(storage.memory.get(DEMO_SESSION_KEY), 'signed-in');
  assert.equal(readDemoSession(storage), true);
  assert.equal(saveDemoSession(storage, false), true);
  assert.equal(readDemoSession(storage), false);
});

test('missing/blocked session storage fails closed in the demo view', () => {
  const blockedStorage = { getItem(){throw new Error('blocked');}, setItem(){throw new Error('blocked');}, removeItem(){throw new Error('blocked');} };
  assert.equal(readDemoSession(null), false);
  assert.equal(readDemoSession(blockedStorage), false);
  assert.equal(saveDemoSession(null, true), false);
  assert.equal(saveDemoSession(blockedStorage, true), false);
});
