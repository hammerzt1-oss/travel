const { execSync } = require('node:child_process')

function resolveAppVersion() {
  const configuredVersion = process.env.NEXT_PUBLIC_APP_VERSION || process.env.VERCEL_GIT_COMMIT_SHA

  if (configuredVersion) {
    return configuredVersion.replace(/^v=/, '').slice(0, 7)
  }

  try {
    return execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim() || '0000000'
  } catch {
    return '0000000'
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cpus: 1,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: resolveAppVersion(),
  },
}

module.exports = nextConfig
