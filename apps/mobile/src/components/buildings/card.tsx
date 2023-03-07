import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'

import { tw } from '~/lib/tailwind'

import { Icon } from '../common/icon'
import { Typography } from '../common/typography'
import { type ResidencyCardItem } from './residency'

type Props = {
  building: ResidencyCardItem['building']
  selected?: boolean
  style?: StyleProp<ViewStyle>
}

export const BuildingCard: FunctionComponent<Props> = ({
  building,
  selected,
  style,
}) => (
  <View style={[tw`flex-row items-center gap-4`, style]}>
    <View style={tw`flex-1`}>
      <Typography weight="medium">{building.name}</Typography>

      <Typography color="gray-11" size="sm">
        {[building.area, building.city].join(', ')}
      </Typography>
    </View>

    {selected && <Icon name="ok" style={tw`-mr-1`} />}
  </View>
)
