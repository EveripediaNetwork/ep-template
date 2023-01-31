const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack(config) {
    config.mode =
      process.env.VERCEL_ENV !== 'production' ? 'production' : 'production'
    config.optimization.moduleIds = 'named'
    config.optimization.runtimeChunk = 'single'
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    minimumCacheTTL: 31536000,
    domains: [
      // add images whitelist here
    ],
  },
}
module.exports = withBundleAnalyzer(moduleExports)
