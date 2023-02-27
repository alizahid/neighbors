import { Image } from 'expo-image'
import { type FunctionComponent, useState } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import ImageViewer from 'react-native-image-viewing'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getColor, getSpace, tw } from '~/lib/tailwind'

import { IconButton } from '../common/icon-button'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'

type Props = {
  images: Array<string>
  style?: StyleProp<ViewStyle>
  title?: string
}

export const Gallery: FunctionComponent<Props> = ({ images, style, title }) => {
  const { bottom, top } = useSafeAreaInsets()

  const [index, setIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  if (images.length === 0) {
    return null
  }

  const show = imageIndex ?? index

  return (
    <View style={[tw`flex-row flex-wrap gap-2`, style]}>
      {images.map((source, index) => (
        <Pressable
          key={index}
          onPress={() => {
            setIndex(index)
            setVisible(true)
          }}
        >
          <Image source={source} style={tw`bg-gray-3 h-20 w-20 rounded-lg`} />
        </Pressable>
      ))}

      <ImageViewer
        FooterComponent={() => (
          <View style={tw`items-center mx-4 mb-[${bottom + getSpace(4)}px]`}>
            <Typography color="gray-1" size="sm">
              {show + 1}/{images.length}
            </Typography>
          </View>
        )}
        HeaderComponent={() => (
          <View style={tw`flex-row mx-4 gap-2 mt-[${top + getSpace(4)}px]`}>
            {!!title && (
              <Typography
                color="gray-1"
                size="lg"
                style={tw`flex-1`}
                weight="semibold"
              >
                {title}
              </Typography>
            )}

            <IconButton
              color="gray-1"
              name="close"
              onPress={() => setVisible(false)}
              style={tw`ml-auto`}
            />
          </View>
        )}
        backgroundColor={getColor('gray-12')}
        imageIndex={index}
        images={images.map((uri) => ({
          uri,
        }))}
        onImageIndexChange={(index) => setImageIndex(index)}
        onRequestClose={() => setVisible(false)}
        visible={visible}
      />
    </View>
  )
}
