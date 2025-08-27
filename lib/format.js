'use strict';

/**
 * zarcotime format function
 *
 * Accepts:
 *  - Date
 *  - number (ms or seconds)
 *  - ISO date string
 *
 * Options:
 *  - now: Date|number|string - override current time
 *  - numeric: 'auto' | 'always' (default: 'always')
 *  - style: 'long' | 'short' (default: 'long')
 *  - locale: string (e.g., 'en', 'fr', 'auto' to use system)
 *  - units: custom unit definitions
 *
 * Returns human-friendly relative time string.
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
    // treat small numbers (<1e12) as seconds
    if (Math.abs(input) < 1e12) return input * 1000;
    return input;
  }
  if (typeof input === 'string') {
    const s = input.trim().toLowerCase();
    if (s === 'now') return Date.now();
    const parsed = Date.parse(input);
    if (!isNaN(parsed)) return parsed;
  }
  throw new TypeError('Invalid date input. Accepts Date, number (ms or s), or date string.');
}

function fallbackPluralize(value, unit) {
  return value === 1 ? unit : unit + 's';
}

function tryIntlFormat(value, unit, locale, style, isFuture, numericOpt = "always") {
  if (typeof Intl !== 'undefined' && Intl.RelativeTimeFormat) {
    try {
      const rtf = new Intl.RelativeTimeFormat(locale || undefined, {
        numeric: numericOpt,
        style: style || 'long'
      });
      const n = isFuture ? value : -value;
      return rtf.format(n, unit);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function formatTime(then, opts = {}) {
  if (then == null) throw new TypeError('`then` is required');
  const now = opts.now != null ? toMillis(opts.now) : Date.now();
  const ts = toMillis(then);
  const diff = now - ts;
  const abs = Math.abs(diff);

  const units = Array.isArray(opts.units) ? opts.units : DEFAULT_UNITS;
  const style = opts.style || 'long';
  const locale = opts.locale || undefined;
  const numeric = opts.numeric || 'always';

  if (abs < 1000) {
    return diff >= 0 ? 'just now' : 'right now';
  }

  for (const u of units) {
    if (abs >= u.ms) {
      const val = Math.floor(abs / u.ms);

      if (numeric === 'auto' && u.name === 'day' && val === 1) {
        if (diff >= 0) return 'yesterday';
        return 'tomorrow';
      }

      const isFuture = diff < 0;
      const intlResult = tryIntlFormat(val, u.name, locale, style, isFuture, numeric);
      if (intlResult) return intlResult;

      const unitName = fallbackPluralize(val, u.name);
      if (diff >= 0) return `${val} ${unitName} ago`;
      return `in ${val} ${unitName}`;
    }
  }

  const seconds = Math.floor(abs / 1000);
  return diff >= 0 ? `${seconds} seconds ago` : `in ${seconds} seconds`;
}

module.exports = formatTime;
