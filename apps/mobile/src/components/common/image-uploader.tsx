import { createId } from '@paralleldrive/cuid2'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useTranslations } from 'use-intl'

import { getImageUrl, supabase, SUPABASE_BUCKET } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'

import { IconButton } from './icon-button'
import { Pressable } from './pressable'
import { Typography } from './typography'

type ImageUploaderComponent = {
  focus: () => void
  open: () => void
}

type Props = {
  style?: StyleProp<ViewStyle>
  value?: Array<string>

  onChange: (value: Array<string>) => void
  onUploading?: (done: boolean) => void
}

// eslint-disable-next-line react/display-name
export const ImageUploader = forwardRef<ImageUploaderComponent, Props>(
  ({ onChange, onUploading, style, value }, ref) => {
    const t = useTranslations('component.common.imageUploader')

    useImperativeHandle(ref, () => ({
      focus: onPick,
      open: onPick,
    }))

    const [uploading, setUploading] = useState(false)

    const onPick = useCallback(async () => {
      setUploading(true)
      onUploading?.(true)

      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsMultipleSelection: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.7,
        })

        if (result.canceled) {
          throw new Error('canceled')
        }

        const files = await Promise.all(
          result.assets.map(async ({ uri }) => {
            const name = `${createId()}.${uri.split('.').pop()}`

            const form = new FormData()

            form.append('file', {
              name,
              type: mime.getType(uri) ?? 'image/jpeg',
              uri,
            } as never)

            const path = `posts/${name}`

            await supabase.storage.from(SUPABASE_BUCKET).upload(path, form)

            return path
          })
        )

        onChange([...(value ?? []), ...files])
      } finally {
        setUploading(false)
        onUploading?.(false)
      }
    }, [onChange, onUploading, value])

    return (
      <View style={[tw`gap-2`, style]}>
        <Typography color="gray-11" size="sm" weight="medium">
          {t('label')}
        </Typography>

        <View style={tw`flex-row gap-4 flex-wrap`}>
          {value?.map((url, index) => (
            <Pressable
              key={index}
              onPress={() => {
                const next = [...value]

                next.splice(index, 1)

                onChange(next)
              }}
            >
              <Image
                source={getImageUrl(url)}
                style={tw`bg-gray-3 h-20 w-20 rounded-lg`}
              />
            </Pressable>
          ))}

          <IconButton
            loading={uploading}
            name="uploadImage"
            onPress={onPick}
            style={tw`bg-gray-3 h-20 w-20 rounded-lg`}
          />
        </View>
      </View>
    )
  }
)
