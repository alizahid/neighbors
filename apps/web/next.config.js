const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const config = {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    SUPABASE_PUBLIC_KEY: process.env.SUPABASE_PUBLIC_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
  reactStrictMode: true,
  transpilePackages: ['shared'],
}

module.exports = withSentryConfig(
  config,
  {
    silent: true,
  },
  {
    hideSourcemaps: true,
  }
)
