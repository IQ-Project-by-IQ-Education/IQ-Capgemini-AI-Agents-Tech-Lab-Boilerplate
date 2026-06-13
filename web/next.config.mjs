import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The repo root has its own package-lock.json (for scripts/); pin tracing to web/ so
  // Next doesn't warn about multiple lockfiles. The pages read sibling files in
  // ../projects/*/output at request time, so they are intentionally dynamic.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
