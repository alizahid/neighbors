import { type Theme } from '@react-navigation/native'

import { getColor } from './tailwind'

export const theme: Theme = {
  colors: {
    background: getColor('gray-1'),
    border: getColor('gray-6'),
    card: getColor('gray-1'),
    notification: getColor('primary-12'),
    primary: getColor('primary-12'),
    text: getColor('gray-12'),
  },
  dark: false,
}
