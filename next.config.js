const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new DuplicatePackageCheckerPlugin(),
    )
    config.resolve.alias = {
      ...config.resolve.alias,
      "@polkadot/util": path.resolve(__dirname, 'node_modules/@polkadot/util'),
      "@polkadot/util-crypto": path.resolve(__dirname, 'node_modules/@polkadot/util-crypto'),
      "@polkadot/util-networks": path.resolve(__dirname, 'node_modules/@polkadot/networks'),
      "@polkadot/wasm-crypto-wasm": path.resolve(__dirname, 'node_modules/@polkadot/wasm-crypto-wasm')
    }

    return config
  }
}

module.exports = nextConfig
