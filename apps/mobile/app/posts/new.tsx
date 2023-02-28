import { zodResolver } from '@hookform/resolvers/zod'
import {
  PostCreateSchema,
  type PostCreateView,
} from '@neighbors/shared/src/schemas/posts/create'
import { PostTypeSchema } from '@neighbors/shared/src/schemas/posts/type'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from 'expo-router'
import { type FunctionComponent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { HeaderButton } from '~/components/common/header-button'
import { ImageUploader } from '~/components/common/image-uploader'
import { Input } from '~/components/common/input'
import { getSpace, tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const router = useRouter()
  const navigation = useNavigation()

  const t = useTranslations('screen.posts.new')

  const params = useLocalSearchParams()

  const type = PostTypeSchema.parse(params.type)

  const { buildingId } = useBuildingStore()

  const [uploading, setUploading] = useState(false)

  const createPost = trpc.posts.create.useMutation({
    onSuccess(id) {
      router.push(`/posts/${id}`)
    },
  })

  const { control, handleSubmit, setFocus } = useForm<PostCreateView>({
    defaultValues: {
      body: '',
      buildingId,
      meta: {
        attachments: [],
        currency: type === 'item' ? 'AED' : undefined,
      },
      type,
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
      title: t(`title.${type}`),
    })
  })

  const onSubmit = handleSubmit((data) => createPost.mutateAsync(data))

  return (
    <ScrollView
      contentContainerStyle={tw`p-4 gap-4 flex-grow pb-[${
        bottom + getSpace(4)
      }px]`}
    >
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
            onSubmitEditing={() => setFocus('meta.attachments')}
            placeholder={t(`form.body.placeholder.${type}`)}
            ref={ref}
            style={tw`flex-1`}
            styleInput={tw`flex-1`}
            value={value}
          />
        )}
        rules={{
          required: true,
        }}
      />

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
                onSubmitEditing={onSubmit}
                placeholder={t('form.quantity.placeholder')}
                ref={ref}
                returnKeyType="go"
                value={value ? String(value) : ''}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </>
      )}
    </ScrollView>
  )
}

export default Screen
