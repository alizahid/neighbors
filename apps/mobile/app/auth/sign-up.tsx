import { zodResolver } from '@hookform/resolvers/zod'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'
import { z } from 'zod'

import { Button } from '~/components/common/button'
import { Input } from '~/components/common/input'
import { Message } from '~/components/common/message'
import { useSignUp } from '~/hooks/auth/sign-up'
import { useKeyboard } from '~/hooks/keyboard'
import { tw } from '~/lib/tailwind'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
})

type Schema = z.infer<typeof schema>

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const navigation = useNavigation()

  const t = useTranslations('screen.auth.signUp')

  const keyboard = useKeyboard()

  const { error, loading, signUp } = useSignUp()

  const { control, handleSubmit, setFocus } = useForm<Schema>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    keyboard.dismiss()

    signUp(data)
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow justify-end gap-4 p-4`}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      style={tw.style(!keyboard.visible && `mb-[${bottom}px]`)}
    >
      {!!error && <Message variant="error">{error}</Message>}

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
            label={t('form.name.label')}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus('email')}
            placeholder={t('form.name.placeholder')}
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
        name="email"
        render={({
          field: { onBlur, onChange, ref, value },
          fieldState: { error },
        }) => (
          <Input
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            error={error ? t('form.email.error') : undefined}
            keyboardType="email-address"
            label={t('form.email.label')}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus('password')}
            placeholder={t('form.email.placeholder')}
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
        name="password"
        render={({
          field: { onBlur, onChange, ref, value },
          fieldState: { error },
        }) => (
          <Input
            autoCapitalize="none"
            error={error ? t('form.password.error') : undefined}
            label={t('form.password.label')}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            placeholder={t('form.password.placeholder')}
            ref={ref}
            returnKeyType="go"
            secureTextEntry
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Button loading={loading} onPress={onSubmit}>
        {t('form.submit')}
      </Button>
    </ScrollView>
  )
}

export default Screen
