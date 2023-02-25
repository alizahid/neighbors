import { createIntl, createTranslator } from 'use-intl'

import en from '~/intl/en.json'

const config = {
  locale: 'en',
  now: new Date(),
  timeZone: 'Asia/Dubai',
}

export const t = createTranslator({
  ...config,
  messages: en,
})

export const intl = createIntl(config)
