'use strict';

const assert = require('assert');
const format = require('../lib/format');

// helper: fixed now
const now = Date.now();

console.log('Running tests for zarcotime...');

assert.strictEqual(format(now, { now }), 'just now', 'now should be just now');

assert.strictEqual(format(new Date(now - 1000 * 60), { now }), '1 minute ago');
assert.strictEqual(format(new Date(now - 1000 * 60 * 5), { now }), '5 minutes ago');
assert.strictEqual(format(new Date(now - 1000 * 60 * 60), { now }), '1 hour ago');
assert.strictEqual(format(new Date(now - 1000 * 60 * 60 * 24), { now, numeric: 'auto' }), 'yesterday');

assert.strictEqual(format(new Date(now + 1000 * 60), { now }), 'in 1 minute');
assert.strictEqual(format(new Date(now + 1000 * 60 * 60 * 24), { now, numeric: 'auto' }), 'tomorrow');

assert.strictEqual(format(Math.floor((now - 30 * 24 * 60 * 60 * 1000) / 1000), { now }), '1 month ago', 'seconds input should work');

console.log('All tests passed.');
