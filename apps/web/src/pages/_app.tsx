import '~/styles/global.css'

import { type AppPropsWithLayout } from 'next'
import localFont from 'next/font/local'
import { type FunctionComponent } from 'react'

const hk = localFont({
  src: [
    {
      path: '../../../mobile/assets/fonts/HKGrotesk-Regular.otf',
      weight: '400',
    },
    {
      path: '../../../mobile/assets/fonts/HKGrotesk-Medium.otf',
      weight: '500',
    },
    {
      path: '../../../mobile/assets/fonts/HKGrotesk-SemiBold.otf',
      weight: '600',
    },
    {
      path: '../../../mobile/assets/fonts/HKGrotesk-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-sans',
})

const App: FunctionComponent<AppPropsWithLayout> = ({
  Component,
  pageProps,
}) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <div className={`${hk.variable} font-sans`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  )
}

export default App
