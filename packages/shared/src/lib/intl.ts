import { createFormatter, createTranslator } from 'use-intl'

import en from '~/intl/en.json'

const config = {
  locale: 'en',
  now: new Date(),
  timeZone: 'Asia/Dubai',
}

export const translator = createTranslator({
  ...config,
  messages: en,
})

export const formatter = createFormatter(config)
