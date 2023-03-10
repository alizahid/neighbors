import { zodResolver } from '@hookform/resolvers/zod'
import { formatISO, parseJSON, subDays } from 'date-fns'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { DateTimePicker } from '~/components/common/date-time-picker'
import { HeaderButton } from '~/components/common/header-button'
import { ImageUploader } from '~/components/common/image-uploader'
import { Input } from '~/components/common/input'
import { Picker } from '~/components/common/picker'
import { useKeyboard } from '~/hooks/keyboard'
import { getSpace, tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { PostCreateSchema, type PostCreateView } from '~/schemas/posts/create'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const router = useRouter()
  const navigation = useNavigation()

  const t = useTranslations('screen.posts.new')

  const keyboard = useKeyboard()

  const { buildingId } = useBuildingStore()

  const [uploading, setUploading] = useState(false)

  const createPost = trpc.posts.create.useMutation({
    onSuccess(id) {
      router.push(`/posts/${id}`)
    },
  })

  const { control, handleSubmit, setFocus, watch } = useForm<PostCreateView>({
    defaultValues: {
      body: '',
      buildingId,
      meta: {
        attachments: [],
      },
      type: 'post',
    },
    resolver: zodResolver(PostCreateSchema),
  })

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          loading={uploading || createPost.isLoading}
          onPress={onSubmit}
        >
          {t('form.submit')}
        </HeaderButton>
      ),
    })
  })

  const type = watch('type')

  useEffect(() => {
    navigation.setOptions({
      title: t(`title.${type}`),
    })
  }, [navigation, t, type])

  const onSubmit = handleSubmit((data) => {
    keyboard.dismiss()

    createPost.mutate(data)
  })

  return (
    <ScrollView
      contentContainerStyle={tw`p-4 gap-4 flex-grow pb-[${
        (keyboard.visible ? 0 : bottom) + getSpace(4)
      }px]`}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <Picker
            items={(['post', 'item', 'event'] as const).map((value) => ({
              label: t(`form.type.${value}`),
              value,
            }))}
            label={t('form.type.label')}
            onChange={onChange}
            placeholder={t('form.type.placeholder')}
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Controller
        control={control}
        name="body"
        render={({
          field: { onBlur, onChange, ref, value },
          fieldState: { error },
        }) => (
          <Input
            error={error ? t('form.body.error') : undefined}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t(`form.body.placeholder.${type}`)}
            ref={ref}
            styleInput={tw`h-32`}
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />

      {type === 'item' && (
        <>
          <Controller
            control={control}
            name="meta.product"
            render={({
              field: { onBlur, onChange, ref, value },
              fieldState: { error },
            }) => (
              <Input
                error={error ? t('form.product.error') : undefined}
                label={t('form.product.label')}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus('meta.price')}
                placeholder={t('form.product.placeholder')}
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
            name="meta.price"
            render={({
              field: { onBlur, onChange, ref, value },
              fieldState: { error },
            }) => (
              <Input
                error={error ? t('form.price.error') : undefined}
                keyboardType="number-pad"
                label={t('form.price.label')}
                onBlur={onBlur}
                onChangeText={(value) => onChange(Number(value))}
                onSubmitEditing={() => setFocus('meta.quantity')}
                placeholder={t('form.price.placeholder')}
                ref={ref}
                returnKeyType="next"
                value={value ? String(value) : ''}
              />
            )}
            rules={{
              required: true,
            }}
          />

          <Controller
            control={control}
            name="meta.quantity"
            render={({
              field: { onBlur, onChange, ref, value },
              fieldState: { error },
            }) => (
              <Input
                error={error ? t('form.quantity.error') : undefined}
                keyboardType="number-pad"
                label={t('form.quantity.label')}
                onBlur={onBlur}
                onChangeText={(value) => onChange(Number(value))}
                onSubmitEditing={() => setFocus('meta.attachments')}
                placeholder={t('form.quantity.placeholder')}
                ref={ref}
                returnKeyType="next"
                value={value ? String(value) : ''}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </>
      )}

      {type === 'event' && (
        <>
          <Controller
            control={control}
            name="meta.event"
            render={({
              field: { onBlur, onChange, ref, value },
              fieldState: { error },
            }) => (
              <Input
                error={error ? t('form.event.error') : undefined}
                label={t('form.event.label')}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus('meta.date')}
                placeholder={t('form.event.placeholder')}
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
            name="meta.date"
            render={({
              field: { onChange, ref, value },
              fieldState: { error },
            }) => (
              <DateTimePicker
                error={error ? t('form.date.error') : undefined}
                label={t('form.date.label')}
                min={subDays(new Date(), 1)}
                onChange={(value) => onChange(formatISO(value))}
                placeholder={t('form.date.placeholder')}
                ref={ref}
                value={value ? parseJSON(value) : undefined}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </>
      )}

      <Controller
        control={control}
        name="meta.attachments"
        render={({ field: { onChange, ref, value } }) => (
          <ImageUploader
            onChange={(value) =>
              onChange(
                value.map((url) => ({
                  type: 'image',
                  url,
                }))
              )
            }
            onUploading={setUploading}
            ref={ref}
            value={value.map(({ url }) => url)}
          />
        )}
      />
    </ScrollView>
  )
}

export default Screen
