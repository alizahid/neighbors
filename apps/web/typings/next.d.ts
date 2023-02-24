import { type NextPage } from 'next'
import { type AppProps } from 'next/app'
import { type ReactElement } from 'react'

declare module 'next' {
  export type NextPageWithLayout<Props = void> = NextPage<Props> & {
    getLayout?: (page: ReactElement<Props>) => ReactElement
  }

  export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout<unknown>
  }
}
