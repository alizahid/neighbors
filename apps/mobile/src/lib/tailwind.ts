import { create, type TwConfig } from 'twrnc'

import config from '../../tailwind.config'

export const tw = create(config as TwConfig)

// helpers

export const getColor = (name: TailwindColor) => tw.color(name) ?? 'magenta'

// types

const fontSize = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
] as const

export type TailwindFontSize = (typeof fontSize)[number]

const opacity = [
  0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100,
] as const

type TailwindOpacity = (typeof opacity)[number]

const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

type RadixColorScale = (typeof scale)[number]

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
