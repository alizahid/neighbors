import { zodResolver } from '@hookform/resolvers/zod'
import { type FunctionComponent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { useTranslations } from 'use-intl'

import { useKeyboard } from '~/hooks/keyboard'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import {
  ResidencyUpdateSchema,
  type ResidencyUpdateView,
} from '~/schemas/residencies/update'

import { HeaderButton } from '../common/header-button'
import { Input } from '../common/input'
import { Modal } from '../common/modal'
import { type ResidencyCardItem } from './residency'

type Props = {
  residency?: ResidencyCardItem
  visible: boolean

  onClose: () => void
}

export const ResidencyForm: FunctionComponent<Props> = ({
  onClose,
  residency,
  visible,
}) => {
  const t = useTranslations('component.buildings.form')

  const keyboard = useKeyboard()

  const utils = trpc.useContext()

  const updateResidency = trpc.residencies.update.useMutation({
    onSuccess() {
      utils.users.profile.invalidate()

      onClose()
    },
  })

  const leaveResidency = trpc.residencies.leave.useMutation({
    onSuccess() {
      utils.users.profile.invalidate()

      onClose()
    },
  })

  const { control, handleSubmit, setFocus, setValue } =
    useForm<ResidencyUpdateView>({
      resolver: zodResolver(ResidencyUpdateSchema),
    })

  useEffect(() => {
    if (!residency) {
      return
    }

    setValue('id', residency.id)
    setValue('apartment', residency.apartment)
    setValue('floor', residency.floor)
  }, [residency, setValue])

  const onSubmit = handleSubmit((data) => {
    keyboard.dismiss()

    updateResidency.mutate(data)
  })

  return (
    <Modal
      inset
      left={
        <HeaderButton
          color="red-11"
          loading={leaveResidency.isLoading}
          onPress={async () => {
            Alert.alert(t('leave.title'), t('leave.message'), [
              {
                style: 'cancel',
                text: t('leave.no'),
              },
              {
                onPress: () => {
                  if (!residency) {
                    return
                  }

                  leaveResidency.mutate({
                    id: residency?.id,
                  })
                },
                style: 'destructive',
                text: t('leave.yes'),
              },
            ])
          }}
        >
          {t('leave.label')}
        </HeaderButton>
      }
      onClose={onClose}
      right={
        <HeaderButton loading={updateResidency.isLoading} onPress={onSubmit}>
          {t('submit')}
        </HeaderButton>
      }
      scrollable
      style={tw`gap-4`}
      title={t('title')}
      visible={visible}
    >
      <Controller
        control={control}
        name="apartment"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Input
            label={t(`apartment.${residency?.building.type ?? 'apartment'}`)}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus('floor')}
            placeholder={t(
              `apartment.${residency?.building.type ?? 'apartment'}`
            )}
            ref={ref}
            returnKeyType="next"
            value={value ?? ''}
          />
        )}
      />

      <Controller
        control={control}
        name="floor"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Input
            label={t(`floor.${residency?.building.type ?? 'apartment'}`)}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            placeholder={t(`floor.${residency?.building.type ?? 'apartment'}`)}
            ref={ref}
            returnKeyType="done"
            value={value ?? ''}
          />
        )}
      />
    </Modal>
  )
}
