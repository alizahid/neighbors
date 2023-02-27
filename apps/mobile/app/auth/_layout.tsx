import { Stack } from 'expo-router'
import { type FunctionComponent } from 'react'

import { StackHeader } from '~/components/navigation/header'

const Layout: FunctionComponent = () => (
  <Stack
    screenOptions={{
      header: (props) => <StackHeader {...props} />,
    }}
  />
)

export default Layout
