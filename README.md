# zarcotime

**zarcotime** is a tiny, lightweight utility for Node.js and CLI that formats timestamps into human-readable relative times. Instead of seeing raw milliseconds or full ISO strings, you can quickly understand times like:

- `just now`
- `1 minute ago`
- `in 2 days`
- `yesterday` / `tomorrow`

It’s ideal for logging, notifications, CLI tools, dashboards, or anywhere you want a quick human-friendly timestamp.

---

## Features

- Convert timestamps (milliseconds or seconds), `Date` objects, or ISO strings.
- Automatically formats past and future times.
- Supports “auto” numeric mode: returns `yesterday` or `tomorrow` for ±1 day.
- Lightweight and dependency-free.
- Works in Node.js and as a command-line utility.

---

## Installation

```bash
npm install zarcotime
# or
yarn add zarcotime
