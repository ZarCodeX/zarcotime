'use strict';

/**
 * formatTime - Convert a Date / timestamp into a human readable relative time.
 *
 * Supported inputs:
 *  - Date instance
 *  - number (milliseconds or seconds; if < 1e12 treated as seconds)
 *  - ISO date string
 *
 * Options:
 *  - now: number|Date - override "now" (useful for tests)
 *  - numeric: 'auto' | 'always' - when 'auto' can return "yesterday"/"tomorrow" for +/-1 day
 *  - units: array - custom unit order
 *
 * Returns: string like "1 minute ago" or "in 2 days" or "just now"
 */

const DEFAULT_UNITS = [
  { name: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
  { name: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
  { name: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
  { name: 'day', ms: 24 * 60 * 60 * 1000 },
  { name: 'hour', ms: 60 * 60 * 1000 },
  { name: 'minute', ms: 60 * 1000 },
  { name: 'second', ms: 1000 }
];

function toMillis(input) {
  if (input instanceof Date) return input.getTime();
  if (typeof input === 'number') {
    // if seems like seconds (10 digits), convert to ms
    if (Math.abs(input) < 1e12) return input * 1000;
    return input;
  }
  // try parse as string
  const parsed = Date.parse(String(input));
  if (!isNaN(parsed)) return parsed;
  throw new TypeError('Invalid date input. Accepts Date, number (ms or s), or date string.');
}

function pluralize(value, unit) {
  return value === 1 ? unit : unit + 's';
}

function formatTime(then, opts = {}) {
  if (then == null) throw new TypeError('`then` is required');
  const now = opts.now != null ? toMillis(opts.now) : Date.now();
  const ts = toMillis(then);
  const diff = now - ts; // positive => past, negative => future
  const abs = Math.abs(diff);

  const units = Array.isArray(opts.units) ? opts.units : DEFAULT_UNITS;

  // special case: very small diff
  if (abs < 1000) {
    return diff >= 0 ? 'just now' : 'right now';
  }

  for (const u of units) {
    if (abs >= u.ms) {
      const val = Math.floor(abs / u.ms);
      // handle 'auto' numeric words for days
      if (opts.numeric === 'auto' && u.name === 'day' && (val === 1)) {
        if (diff >= 0) return 'yesterday';
        return 'tomorrow';
      }

      const unitName = pluralize(val, u.name);
      if (diff >= 0) return `${val} ${unitName} ago`;
      return `in ${val} ${unitName}`;
    }
  }

  // fallback if nothing matched (shouldn't happen)
  const seconds = Math.floor(abs / 1000);
  return diff >= 0 ? `${seconds} seconds ago` : `in ${seconds} seconds`;
}

module.exports = formatTime;
