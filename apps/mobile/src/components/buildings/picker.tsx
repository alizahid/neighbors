import { useRouter } from 'expo-router'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'

import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { useBuildingStore } from '~/stores/building'

import { Icon } from '../common/icon'
import { IconButton } from '../common/icon-button'
import { Modal } from '../common/modal'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { BuildingCard } from './card'

export const BuildingPicker: FunctionComponent = () => {
  const router = useRouter()

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
        style={tw`flex-row items-center justify-center gap-2 h-12 w-full`}
      >
        <Typography weight="bold">{building?.name ?? t('title')}</Typography>

        <Icon name="expand" style={tw`h-4 w-4`} />
      </Pressable>

      <Modal
        inset
        onClose={() => setVisible(false)}
        right={
          <IconButton
            name="add"
            onPress={() => {
              setVisible(false)

              router.push('/onboarding')
            }}
          />
        }
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
          >
            <BuildingCard
              building={building}
              selected={building.id === buildingId}
            />
          </Pressable>
        ))}
      </Modal>
    </>
  )
}
