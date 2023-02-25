import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { Typography } from '~/components/common/typography'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const t = useTranslations('screen.home')

  return (
    <View style={tw`items-center flex-1 justify-center gap-4`}>
      <Typography color="primary-11" size="4xl" weight="bold">
        {t('title')}
      </Typography>
    </View>
  )
}

export default Screen
