import '~/styles/global.css'

import { type AppProps } from 'next/app'
import localFont from 'next/font/local'
import { IntlProvider } from 'next-intl'
import { type FunctionComponent } from 'react'

import en from '~/intl/en.json'

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

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <IntlProvider
    locale="en"
    messages={en}
    now={new Date()}
    timeZone="Asia/Dubai"
  >
    <div className={`${hk.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  </IntlProvider>
)

export default App
