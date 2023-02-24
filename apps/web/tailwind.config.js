const radix = require('@radix-ui/colors')
const convert = require('color-convert')

const colors = [
  ['primary', radix.teal],
  ['accent', radix.yellow],
  ['gray', radix.gray],
  ['green', radix.green],
  ['red', radix.red],
  ['yellow', radix.yellow],
].reduce(
  (data, [name, colors]) => ({
    ...data,
    [name]: Object.entries(colors).reduce(
      (data, [key, value]) => ({
        ...data,
        [key.replace(/[^\d]/g, '')]: value.replace(
          /hsl\((\d+), ([\w.]+)%, ([\w.]+)%\)/,
          (value, hue, saturation, lightness) =>
            `rgb(${convert.hsl
              .rgb(Number(hue), Number(saturation), Number(lightness))
              .join(', ')})`
        ),
      }),
      {}
    ),
  }),
  {}
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['{app,src}/**/*.tsx'],
  plugins: [],
  theme: {
    colors: {
      ...colors,
      current: 'currentColor',
      inherit: 'inherit',
      transparent: 'transparent',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
}
