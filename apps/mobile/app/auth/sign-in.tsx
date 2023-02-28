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
import { useSignIn } from '~/hooks/auth/sign-in'
import { useKeyboard } from '~/hooks/keyboard'
import { tw } from '~/lib/tailwind'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type Schema = z.infer<typeof schema>

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const navigation = useNavigation()

  const t = useTranslations('screen.auth.signIn')

  const keyboard = useKeyboard()

  const { error, loading, signIn } = useSignIn()

  const { control, handleSubmit, setFocus } = useForm<Schema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    keyboard.dismiss()

    return signIn(data)
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow justify-end gap-4 p-4`}
      keyboardShouldPersistTaps="handled"
      style={tw.style('flex-1', !keyboard.visible && `mb-[${bottom}px]`)}
    >
      {!!error && <Message variant="error">{error}</Message>}

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
