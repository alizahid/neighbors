import { useLocalSearchParams } from 'expo-router'
import { type FunctionComponent } from 'react'

import { Empty } from '~/components/common/empty'

const Screen: FunctionComponent = () => {
  const params = useLocalSearchParams()

  const id = String(params.id)

  return <Empty message={id} />
}

export default Screen
