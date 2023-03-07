import { differenceInSeconds } from 'date-fns'
import { type FunctionComponent } from 'react'
import { useFormatter, useNow } from 'use-intl'

const minute = 60
const hour = minute * 60
const day = hour * 24
const week = day * 7

type Props = {
  children: Date
}

export const TimeAgo: FunctionComponent<Props> = ({ children }) => {
  const formatter = useFormatter()

  const difference = Math.abs(differenceInSeconds(children, new Date()))

  const interval =
    difference < minute
      ? 1
      : difference < hour
      ? minute
      : difference < day
      ? hour
      : difference < week
      ? day
      : undefined

  const now = useNow({
    updateInterval: interval ? interval * 1_000 : undefined,
  })

  return <>{formatter.relativeTime(children, now)}</>
}
