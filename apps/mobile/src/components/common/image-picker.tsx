import { createId } from '@paralleldrive/cuid2'
import * as ExpoImagePicker from 'expo-image-picker'
import mime from 'mime'
import {
  forwardRef,
  type ReactElement,
  useCallback,
  useImperativeHandle,
} from 'react'

import { supabase, SUPABASE_BUCKET } from '~/lib/supabase'

export type ImagePickerComponent = {
  focus: () => void
  open: () => void
}

export type ImagePickerProps = {
  children: ReactElement
  value?: Array<string>

  onChange: (value: Array<string>) => void
  onUploading?: (done: boolean) => void
}

// eslint-disable-next-line react/display-name
export const ImagePicker = forwardRef<ImagePickerComponent, ImagePickerProps>(
  ({ children, onChange, onUploading, value }, ref) => {
    useImperativeHandle(ref, () => ({
      focus: onPick,
      open: onPick,
    }))

    const onPick = useCallback(async () => {
      onUploading?.(true)

      try {
        const result = await ExpoImagePicker.launchImageLibraryAsync({
          allowsMultipleSelection: true,
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          quality: 0.7,
        })

        if (result.canceled) {
          throw new Error()
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
        onUploading?.(false)
      }
    }, [onChange, onUploading, value])

    return <>{children}</>
  }
)
