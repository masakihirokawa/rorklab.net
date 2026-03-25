/**
 * stamp-deploy-version.mjs
 * ─────────────────────────
 * Replaces the static DEPLOY_VERSION in cache-worker.js with a
 * timestamp of the current deployment. This ensures the edge cache
 * is automatically invalidated every time `wrangler deploy` runs.
 *
 * Called by: wrangler.toml [build] command
 */

import { readFileSync, writeFileSync } from "fs";

const FILE = "cache-worker.js";
const version = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

const src = readFileSync(FILE, "utf8");
const updated = src.replace(
  /const DEPLOY_VERSION = "[^"]+"/,
  `const DEPLOY_VERSION = "${version}"`
);

if (src === updated) {
  console.warn("[stamp] WARNING: DEPLOY_VERSION pattern not found in", FILE);
} else {
  writeFileSync(FILE, updated);
  console.log(`[stamp] DEPLOY_VERSION → "${version}"`);
}
