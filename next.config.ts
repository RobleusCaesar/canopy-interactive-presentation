import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages serves this project below the account root. Vinext's static
  // exporter does not emit the root document when basePath is set, so keep the
  // route at `/` and prefix only the generated assets.
  assetPrefix: process.env.PAGES_BASE_PATH || '',
};
export default nextConfig;
