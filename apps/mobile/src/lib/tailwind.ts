// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import config from 'shared/tailwind.config'
import { create } from 'twrnc'

if (config.theme?.extend?.fontFamily) {
  config.theme.extend.fontFamily = {
    'body-bold': ['body-bold'],
    'body-medium': ['body-medium'],
    'body-regular': ['body-regular'],
    'body-semibold': ['body-semibold'],
  }
}

export const tw = create(config)

// helpers

export const getColor = (name: TailwindColor) => tw.color(name) ?? 'magenta'

const spaces = new Map<TailwindSpace, number>()

export const getSpace = (name: TailwindSpace) => {
  const exists = spaces.get(name)

  if (exists !== undefined) {
    return exists
  }

  const { marginTop } = tw.style(`mt-${name}`)

  const space = Number(marginTop) ?? 0

  spaces.set(name, space)

  return space
}

// types

export type TailwindSpace =
  | 0
  | 'px'
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96
  | 'auto'

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
