import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  // Include files from monorepo root (two directories up from apps/web)
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
};

export default nextConfig;
