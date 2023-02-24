/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    SUPABASE_PUBLIC_KEY: process.env.SUPABASE_PUBLIC_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
  reactStrictMode: true,
}
