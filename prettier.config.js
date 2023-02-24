const tailwind = require('prettier-plugin-tailwindcss')

/** @type {import('prettier').Options} */
module.exports = {
  plugins: [tailwind],
  semi: false,
  singleQuote: true,
  tailwindConfig: 'apps/web/tailwind.config.js',
}
