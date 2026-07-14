import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The repo root has its own package-lock.json (for scripts/); pin tracing to web/ so
  // Next doesn't warn about multiple lockfiles. The pages read sibling files in
  // ../projects/*/output at request time, so they are intentionally dynamic.
  outputFileTracingRoot: __dirname,
  // The self-test (npm test) builds and boots its own server while a participant's dev
  // server may already be running on .next — give it a separate build dir so the two
  // never corrupt each other.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
