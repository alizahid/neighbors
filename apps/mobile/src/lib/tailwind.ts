import { create, type TwConfig } from 'twrnc'

import config from '../../../../packages/shared/tailwind.config'

if (config.theme?.extend?.fontFamily) {
  config.theme.extend.fontFamily = {
    'body-bold': ['body-bold'],
    'body-medium': ['body-medium'],
    'body-regular': ['body-regular'],
    'body-semibold': ['body-semibold'],
  }
}

export const tw = create(config as TwConfig)

// helpers

export const getColor = (name: TailwindColor) => tw.color(name) ?? 'magenta'

// types

export type TailwindFontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

type TailwindOpacity =
  | 0
  | 5
  | 10
  | 20
  | 25
  | 30
  | 40
  | 50
  | 60
  | 70
  | 75
  | 80
  | 90
  | 95
  | 100

type RadixColorScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Color =
  | `primary-${RadixColorScale}`
  | `accent-${RadixColorScale}`
  | `gray-${RadixColorScale}`
  | `green-${RadixColorScale}`
  | `red-${RadixColorScale}`
  | `yellow-${RadixColorScale}`
  | 'current'
  | 'inherit'
  | 'transparent'

export type TailwindColor = Color | `${Color}/${TailwindOpacity}`
