import { type FunctionComponent, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { useBuildingStore } from '~/stores/building'

import { Icon } from '../common/icon'
import { IconButton } from '../common/icon-button'
import { Modal } from '../common/modal'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'

export const BuildingPicker: FunctionComponent = () => {
  const t = useTranslations('component.buildings.picker')

  const { profile } = useProfile()

  const { buildingId, setBuildingId } = useBuildingStore()

  useEffect(() => {
    if (!buildingId && profile?.residencies[0]) {
      setBuildingId(profile.residencies[0].buildingId)
    }
  }, [buildingId, profile?.residencies, setBuildingId])

  const [visible, setVisible] = useState(false)

  const building = profile?.residencies.find(
    ({ building }) => building.id === buildingId
  )?.building

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={tw`flex-row items-center gap-2`}
      >
        <Typography weight="bold">{building?.name ?? t('title')}</Typography>

        <Icon name="expand" style={tw`h-4 w-4`} />
      </Pressable>

      <Modal
        actions={<IconButton name="add" />}
        inset
        onClose={() => setVisible(false)}
        scrollable
        style={tw`gap-4`}
        title={t('title')}
        visible={visible}
      >
        {profile?.residencies.map(({ building }) => (
          <Pressable
            key={building.id}
            onPress={() => {
              setBuildingId(building.id)

              setVisible(false)
            }}
            style={tw`flex-row items-center gap-4`}
          >
            <View style={tw`flex-1`}>
              <Typography weight="medium">{building.name}</Typography>

              <Typography color="gray-11" size="sm">
                {[building.area, building.city].join(', ')}
              </Typography>
            </View>

            {building.id === buildingId && <Icon name="ok" style={tw`-mr-1`} />}
          </Pressable>
        ))}
      </Modal>
    </>
  )
}
