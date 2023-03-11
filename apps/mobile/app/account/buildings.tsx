import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { type FunctionComponent, useState } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { ResidencyForm } from '~/components/buildings/form'
import {
  ResidencyCard,
  type ResidencyCardItem,
} from '~/components/buildings/residency'
import { IconButton } from '~/components/common/icon-button'
import { Refresher } from '~/components/common/refresher'
import { Separator } from '~/components/common/separator'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const router = useRouter()
  const navigation = useNavigation()

  const t = useTranslations('screen.account.buildings')

  const { profile, refetch } = useProfile()

  const [editing, setEditing] = useState<ResidencyCardItem>()

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton name="add" onPress={() => router.push('/onboarding')} />
      ),
      title: t('title'),
    })
  })

  return (
    <>
      <FlatList
        ItemSeparatorComponent={Separator}
        contentContainerStyle={tw`pb-[${bottom}px]`}
        data={profile?.residencies ?? []}
        refreshControl={<Refresher onRefresh={refetch} />}
        renderItem={({ item }) => (
          <ResidencyCard onPress={() => setEditing(item)} residency={item} />
        )}
      />

      <ResidencyForm
        onClose={() => setEditing(undefined)}
        residency={editing}
        visible={!!editing}
      />
    </>
  )
}

export default Screen
