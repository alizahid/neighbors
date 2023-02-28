import { useLocalSearchParams } from 'expo-router'
import { type FunctionComponent } from 'react'

import { Empty } from '~/components/common/empty'

const Screen: FunctionComponent = () => {
  const { id } = useLocalSearchParams()

  return <Empty message={id} />
}

export default Screen
