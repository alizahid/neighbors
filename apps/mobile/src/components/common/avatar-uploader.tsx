import { getTime } from 'date-fns'
import * as ExpoImagePicker from 'expo-image-picker'
import mime from 'mime'
import { forwardRef, useCallback, useImperativeHandle } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import * as Sentry from 'sentry-expo'

import { supabase, SUPABASE_BUCKET } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'

import { Avatar } from '../users/avatar'
import { Icon } from './icon'
import { Pressable } from './pressable'
import { Spinner } from './spinner'

export type AvatarUploaderComponent = {
  focus: () => void
  open: () => void
}

type Props = {
  id?: string
  name?: string
  style?: StyleProp<ViewStyle>
  uploading?: boolean
  value?: string | null

  onChange: (value: string) => void
  onUploading?: (uploading: boolean) => void
}

// eslint-disable-next-line react/display-name
export const AvatarUploader = forwardRef<AvatarUploaderComponent, Props>(
  ({ id, name, onChange, onUploading, style, uploading, value }, ref) => {
    const { width } = useSafeAreaFrame()

    useImperativeHandle(ref, () => ({
      focus: () => null,
      open: () => null,
    }))

    const size = `${width * 0.5}px`

    const onPick = useCallback(async () => {
      if (!id) {
        return
      }

      onUploading?.(true)

      try {
        const result = await ExpoImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          quality: 0.7,
        })

        if (result.canceled) {
          throw new Error()
        }

        const uri = result.assets[0].uri

        if (!uri) {
          throw new Error()
        }

        const name = `${id}.${uri.split('.').pop()}`

        const form = new FormData()

        form.append('file', {
          name,
          type: mime.getType(uri) ?? 'image/jpeg',
          uri,
        } as never)

        const path = `users/${name}`

        await supabase.storage.from(SUPABASE_BUCKET).upload(path, form, {
          upsert: true,
        })

        onChange(`${path}?ts=${getTime(new Date())}`)
      } catch (error) {
        Sentry.Native.captureException(error)
      } finally {
        onUploading?.(false)
      }
    }, [id, onChange, onUploading])

    return (
      <Pressable
        disabled={uploading}
        onPress={onPick}
        style={[tw`h-[${size}] w-[${size}] rounded-full bg-gray-3`, style]}
      >
        <Avatar image={value} name={name} style={tw`h-full w-full`} />

        <View style={tw`absolute bottom-3 right-3 rounded-full bg-gray-4 p-2`}>
          {uploading ? (
            <Spinner color="gray-12" />
          ) : (
            <Icon color="gray-12" name="uploadImage" style={tw`h-5 w-5`} />
          )}
        </View>
      </Pressable>
    )
  }
)
