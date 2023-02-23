const tailwind = require('prettier-plugin-tailwindcss')

/** @type {import('prettier').Options} */
module.exports = {
  plugins: [tailwind],
  semi: false,
  singleQuote: true,
  tailwindConfig: 'apps/mobile/tailwind.config.js',
}
