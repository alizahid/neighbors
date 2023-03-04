import { Image } from 'expo-image'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useTranslations } from 'use-intl'

import { getImageUrl } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'

import { IconButton } from './icon-button'
import {
  ImagePicker,
  type ImagePickerComponent,
  type ImagePickerProps,
} from './image-picker'
import { Pressable } from './pressable'
import { Typography } from './typography'

type Props = Omit<ImagePickerProps, 'children'> & {
  style?: StyleProp<ViewStyle>
  uploading?: boolean
}

// eslint-disable-next-line react/display-name
export const ImageUploader = forwardRef<ImagePickerComponent, Props>(
  ({ onChange, onUploading, style, uploading, value }, ref) => {
    const t = useTranslations('component.common.imageUploader')

    const picker = useRef<ImagePickerComponent>(null)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useImperativeHandle(ref, () => picker)

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

          <ImagePicker
            onChange={onChange}
            onUploading={onUploading}
            ref={picker}
            value={value}
          >
            <IconButton
              loading={uploading}
              name="uploadImage"
              onPress={() => {
                picker.current?.open()
              }}
              style={tw`bg-gray-3 h-20 w-20 rounded-lg`}
            />
          </ImagePicker>
        </View>
      </View>
    )
  }
)
