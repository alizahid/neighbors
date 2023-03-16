import { compact } from 'lodash-es'
import { type FunctionComponent, useState } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { getColor, tw } from '~/lib/tailwind'
import { type RouterOutput } from '~/trpc/types'

import { Icon } from '../common/icon'
import { IconButton } from '../common/icon-button'
import { Typography } from '../common/typography'

export type ResidencyCardItem = NonNullable<
  RouterOutput['users']['profile']
>['residencies'][number]

type Props = {
  residency: ResidencyCardItem

  onPress: (residency: ResidencyCardItem) => void
}

export const ResidencyCard: FunctionComponent<Props> = ({
  onPress,
  residency,
}) => {
  const { width } = useSafeAreaFrame()

  const t = useTranslations('component.buildings.residency')

  const [visible, setVisible] = useState(false)

  const lines = compact([
    compact([residency.apartment, residency.floor]).join(', '),
    compact([residency.building.area, residency.building.city]).join(', '),
  ])

  return (
    <>
      <View style={tw`flex-row items-center gap-4`}>
        <Icon name={residency.building.type} style={tw`ml-4`} />

        <View style={tw`my-4 flex-1`}>
          <Typography weight="medium">{residency.building.name}</Typography>

          {lines.map((line, index) => (
            <Typography color="gray-11" key={index} size="sm">
              {line}
            </Typography>
          ))}
        </View>

        <View style={tw`flex-row`}>
          <IconButton name="qr" onPress={() => setVisible(true)} />

          <IconButton name="edit" onPress={() => onPress(residency)} />
        </View>
      </View>

      <Modal
        backdropColor={getColor('gray-1')}
        backdropOpacity={0.75}
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        style={tw.style('m-0 items-center justify-center gap-8 p-8')}
        useNativeDriver
        useNativeDriverForBackdrop
      >
        <Typography align="center">
          {t('code.message', {
            building: residency.building.name,
          })}
        </Typography>

        <QRCode size={width * 0.6} value={residency.buildingId} />

        <IconButton name="close" onPress={() => setVisible(false)} />
      </Modal>
    </>
  )
}
