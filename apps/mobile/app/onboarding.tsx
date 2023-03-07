import { BarCodeScanner } from 'expo-barcode-scanner'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { type FunctionComponent, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { BuildingCard } from '~/components/buildings/card'
import { Spinner } from '~/components/common/spinner'
import { Typography } from '~/components/common/typography'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const router = useRouter()
  const navigation = useNavigation()

  const t = useTranslations('screen.onboarding')

  const { setBuildingId } = useBuildingStore()

  const [id, setId] = useState<string>()

  const building = trpc.buildings.get.useQuery(
    {
      id: id!,
    },
    {
      enabled: !!id,
      onSuccess(building) {
        if (!building) {
          return
        }

        joinBuilding.mutateAsync({
          id: building.id,
        })
      },
    }
  )

  const joinBuilding = trpc.buildings.join.useMutation({
    onSuccess(residency) {
      setBuildingId(residency.buildingId)

      router.push('/')
    },
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  return (
    <View style={tw.style('flex-1', `mb-[${bottom}px]`)}>
      <Typography style={tw`m-4`}>{t('message')}</Typography>

      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={(event) => setId(event.data)}
        style={tw`flex-1`}
      />

      <View style={tw`m-4`}>
        {building.isFetching || joinBuilding.isLoading ? (
          <Spinner />
        ) : building.data ? (
          <BuildingCard building={building.data} />
        ) : (
          <Typography align="center">
            {t(joinBuilding.isSuccess ? 'success' : id ? 'notFound' : 'scan')}
          </Typography>
        )}
      </View>
    </View>
  )
}

export default Screen
