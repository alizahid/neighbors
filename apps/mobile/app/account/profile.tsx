import { zodResolver } from '@hookform/resolvers/zod'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { AvatarUploader } from '~/components/common/avatar-uploader'
import { HeaderButton } from '~/components/common/header-button'
import { Input } from '~/components/common/input'
import { Message } from '~/components/common/message'
import { useProfile } from '~/hooks/auth/profile'
import { useKeyboard } from '~/hooks/keyboard'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { UserUpdateSchema, type UserUpdateView } from '~/schemas/users/update'

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const navigation = useNavigation()

  const t = useTranslations('screen.account.profile')

  const { profile } = useProfile()

  const keyboard = useKeyboard()

  const [uploading, setUploading] = useState(false)

  const utils = trpc.useContext()

  const updateProfile = trpc.users.update.useMutation({
    onSuccess() {
      utils.users.profile.invalidate()
    },
  })

  const { control, handleSubmit, setFocus } = useForm<UserUpdateView>({
    defaultValues: {
      image: profile?.image ?? '',
      meta: profile?.meta,
      name: profile?.name,
    },
    resolver: zodResolver(UserUpdateSchema),
  })

  const onSubmit = handleSubmit((data) => {
    keyboard.dismiss()

    return updateProfile.mutateAsync(data)
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          disabled={uploading}
          loading={updateProfile.isLoading}
          onPress={onSubmit}
        >
          {t('form.submit')}
        </HeaderButton>
      ),
    })
  }, [navigation, onSubmit, t, updateProfile.isLoading, uploading])

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow justify-end gap-4 p-4`}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      style={tw.style(!keyboard.visible && `mb-[${bottom}px]`)}
    >
      {updateProfile.isSuccess && (
        <Message variant="success">{t('form.success')}</Message>
      )}

      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, ref, value } }) => (
          <AvatarUploader
            id={profile?.id}
            name={profile?.name}
            onChange={onChange}
            onUploading={setUploading}
            ref={ref}
            style={tw`self-center`}
            uploading={uploading}
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Controller
        control={control}
        name="name"
        render={({
          field: { onBlur, onChange, ref, value },
          fieldState: { error },
        }) => (
          <Input
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect={false}
            error={error ? t('form.name.error') : undefined}
            keyboardType="email-address"
            label={t('form.name.label')}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus('meta.bio')}
            placeholder={t('form.name.label')}
            ref={ref}
            returnKeyType="next"
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Controller
        control={control}
        name="meta.bio"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Input
            label={t('form.bio.label')}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t('form.bio.label')}
            ref={ref}
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />
    </ScrollView>
  )
}

export default Screen
