const assert = require('assert');
const formatTime = require('../lib/format');

const NOW = new Date('2024-01-01T00:00:00Z').getTime();

function runTest(name, fn) {
  try {
    fn();
    console.log(`✔ ${name}`);
  } catch (err) {
    console.error(`✖ ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('Running tests for zarcotime v1.0.1...');

runTest('just now', () => {
  assert.strictEqual(formatTime(NOW, { now: NOW }), 'just now');
});

runTest('1 second ago', () => {
  assert.strictEqual(formatTime(NOW - 1000, { now: NOW }), '1 second ago');
});

runTest('5 minutes ago', () => {
  assert.strictEqual(formatTime(NOW - 5 * 60 * 1000, { now: NOW }), '5 minutes ago');
});

runTest('in 2 hours', () => {
  assert.strictEqual(formatTime(NOW + 2 * 60 * 60 * 1000, { now: NOW }), 'in 2 hours');
});

runTest('auto mode yesterday/tomorrow', () => {
  assert.strictEqual(formatTime(NOW - 24 * 60 * 60 * 1000, { now: NOW, numeric: 'auto' }), 'yesterday');
  assert.strictEqual(formatTime(NOW + 24 * 60 * 60 * 1000, { now: NOW, numeric: 'auto' }), 'tomorrow');
});

runTest('always mode numeric output', () => {
  assert.strictEqual(formatTime(NOW - 30 * 24 * 60 * 60 * 1000, { now: NOW, numeric: 'always' }), '1 month ago');
  assert.strictEqual(formatTime(NOW - 365 * 24 * 60 * 60 * 1000, { now: NOW, numeric: 'always' }), '1 year ago');
});

runTest('locale support (fr)', () => {
  const out = formatTime(NOW - 60 * 1000, { now: NOW, locale: 'fr' });
  assert.ok(typeof out === 'string');
});

console.log('All tests completed.');
