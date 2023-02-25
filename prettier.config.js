const tailwind = require('prettier-plugin-tailwindcss')

/** @type {import('prettier').Options} */
module.exports = {
  plugins: [tailwind],
  semi: false,
  singleQuote: true,
  tailwindConfig: 'packages/shared/tailwind.config.js',
}
