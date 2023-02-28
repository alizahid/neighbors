import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { Button } from '~/components/common/button'
import { supabase } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'
import { queryClient } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const router = useRouter()

  return (
    <View style={tw`p-4 flex-1 justify-end`}>
      <Button
        onPress={async () => {
          await supabase.auth.signOut()

          queryClient.clear()

          router.replace('/')
        }}
      >
        Sign out
      </Button>
    </View>
  )
}

export default Screen
