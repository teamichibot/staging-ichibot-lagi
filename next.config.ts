import type { NextConfig } from "next";

/**
 * Admin-only deployment (admin.ichibot.id). The public site is now the Astro
 * rebuild at www.ichibot.id, which reads the same Supabase this admin writes
 * to. This deployment keeps only the admin UI (/admin) and its API (/api);
 * every other page path is sent to the public site, and nothing here is
 * indexed. Paths with a dot (files in public/) are left alone so the admin
 * UI keeps its own assets.
 */
const PUBLIC_SITE = 'https://www.ichibot.id'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/admin', permanent: false },
      {
        source: '/:path((?!admin(?:/|$)|api/|_next/)[^.]*)',
        destination: `${PUBLIC_SITE}/:path`,
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;
