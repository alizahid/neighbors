import { type FunctionComponent } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

import { getColor, type TailwindColor, tw } from '~/lib/tailwind'

export type IconName = keyof typeof icons

type Props = Pick<SvgProps, 'style'> & {
  color?: TailwindColor
  name: IconName
}

export const Icon: FunctionComponent<Props> = ({
  color = 'gray-12',
  name,
  style,
}) => (
  <Svg fill={getColor(color)} style={[tw`h-6 w-6`, style]} viewBox="0 0 48 48">
    <Path d={icons[name]} />
  </Svg>
)

const icons = {
  account:
    'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 12 C 22.125 12 20.528815 12.757133 19.503906 13.910156 C 18.478997 15.063179 18 16.541667 18 18 C 18 19.458333 18.478997 20.936821 19.503906 22.089844 C 20.528815 23.242867 22.125 24 24 24 C 25.875 24 27.471185 23.242867 28.496094 22.089844 C 29.521003 20.936821 30 19.458333 30 18 C 30 16.541667 29.521003 15.063179 28.496094 13.910156 C 27.471185 12.757133 25.875 12 24 12 z M 24 15 C 25.124999 15 25.778816 15.367867 26.253906 15.902344 C 26.728997 16.436821 27 17.208333 27 18 C 27 18.791667 26.728997 19.563179 26.253906 20.097656 C 25.778816 20.632133 25.124999 21 24 21 C 22.875001 21 22.221184 20.632133 21.746094 20.097656 C 21.271003 19.563179 21 18.791667 21 18 C 21 17.208333 21.271003 16.436821 21.746094 15.902344 C 22.221184 15.367867 22.875001 15 24 15 z M 17.259766 26 C 15.478261 26 14 27.477066 14 29.259766 L 14 30.341797 C 14 32.32976 15.256514 34.057405 17.046875 35.199219 C 18.837236 36.341033 21.229275 37.001953 24 37.001953 C 26.770725 37.001953 29.162764 36.341033 30.953125 35.199219 C 32.743486 34.057405 34 32.32976 34 30.341797 L 34 29.259766 C 34 27.478261 32.522934 26 30.740234 26 L 17.259766 26 z M 17.259766 29 L 30.740234 29 C 30.901535 29 31 29.09927 31 29.259766 L 31 30.341797 C 31 31.053834 30.535733 31.907236 29.339844 32.669922 C 28.143954 33.432608 26.284275 34.001953 24 34.001953 C 21.715725 34.001953 19.856046 33.432608 18.660156 32.669922 C 17.464267 31.907236 17 31.053834 17 30.341797 L 17 29.259766 C 17 29.098465 17.09927 29 17.259766 29 z',
  chat: 'M 10.5 6 C 6.9280619 6 4 8.9280619 4 12.5 L 4 28.5 L 4 34.535156 C 4 36.486795 6.3899087 37.705105 7.96875 36.558594 A 1.50015 1.50015 0 0 0 7.9707031 36.558594 L 12.291016 33.416016 C 13.114957 36.061625 15.594339 38 18.5 38 L 31.011719 38 L 40.029297 44.558594 A 1.50015 1.50015 0 0 0 40.03125 44.558594 C 41.610044 45.705105 44 44.486795 44 42.535156 L 44 36.5 L 44 20.5 C 44 16.928062 41.071938 14 37.5 14 L 36 14 L 36 12.5 C 36 8.9280619 33.071938 6 29.5 6 L 10.5 6 z M 10.5 9 L 29.5 9 C 31.450062 9 33 10.549938 33 12.5 L 33 23.5 C 33 25.450062 31.450062 27 29.5 27 L 16.5 27 A 1.50015 1.50015 0 0 0 15.617188 27.287109 L 7 33.554688 L 7 28.5 L 7 12.5 C 7 10.549938 8.5499381 9 10.5 9 z M 36 17 L 37.5 17 C 39.450062 17 41 18.549938 41 20.5 L 41 36.5 L 41 41.554688 L 32.382812 35.287109 A 1.50015 1.50015 0 0 0 31.5 35 L 18.5 35 C 16.549938 35 15 33.450062 15 31.5 L 15 31.445312 L 16.988281 30 L 29.5 30 C 33.071938 30 36 27.071938 36 23.5 L 36 17 z',
  clock:
    'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.476562 11.978516 A 1.50015 1.50015 0 0 0 22 13.5 L 22 25.5 A 1.50015 1.50015 0 0 0 23.5 27 L 31.5 27 A 1.50015 1.50015 0 1 0 31.5 24 L 25 24 L 25 13.5 A 1.50015 1.50015 0 0 0 23.476562 11.978516 z',
  comment:
    'M 10.5 7 C 6.9280619 7 4 9.9280619 4 13.5 L 4 30.5 C 4 34.071938 6.9280619 37 10.5 37 L 12 37 L 12 42.5 C 12 44.46599 14.427297 45.67893 16 44.5 L 26 37 L 37.5 37 C 41.071938 37 44 34.071938 44 30.5 L 44 13.5 C 44 9.9280619 41.071938 7 37.5 7 L 10.5 7 z M 10.5 10 L 37.5 10 C 39.450062 10 41 11.549938 41 13.5 L 41 30.5 C 41 32.450062 39.450062 34 37.5 34 L 25.5 34 A 1.50015 1.50015 0 0 0 24.599609 34.300781 L 15 41.5 L 15 35.5 A 1.50015 1.50015 0 0 0 13.5 34 L 10.5 34 C 8.5499381 34 7 32.450062 7 30.5 L 7 13.5 C 7 11.549938 8.5499381 10 10.5 10 z M 15.5 16.998047 A 1.50015 1.50015 0 1 0 15.5 19.998047 L 32.5 19.998047 A 1.50015 1.50015 0 1 0 32.5 16.998047 L 15.5 16.998047 z M 15.5 23.998047 A 1.50015 1.50015 0 1 0 15.5 26.998047 L 28.5 26.998047 A 1.50015 1.50015 0 1 0 28.5 23.998047 L 15.5 23.998047 z',
  error:
    'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 12.978516 A 1.50015 1.50015 0 0 0 22.5 14.5 L 22.5 26.5 A 1.50015 1.50015 0 1 0 25.5 26.5 L 25.5 14.5 A 1.50015 1.50015 0 0 0 23.976562 12.978516 z M 24 31 A 2 2 0 0 0 24 35 A 2 2 0 0 0 24 31 z',
  home: 'M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z',
  info: 'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z',
  left: 'M 21.470703 8.9863281 A 1.50015 1.50015 0 0 0 20.439453 9.4394531 L 6.4394531 23.439453 A 1.50015 1.50015 0 0 0 6.4394531 25.560547 L 20.439453 39.560547 A 1.50015 1.50015 0 1 0 22.560547 37.439453 L 11.121094 26 L 40.5 26 A 1.50015 1.50015 0 1 0 40.5 23 L 11.121094 23 L 22.560547 11.560547 A 1.50015 1.50015 0 0 0 21.470703 8.9863281 z',
  like: 'M 22.566406 4.1015625 A 1.50015 1.50015 0 0 0 21.376953 4.7480469 C 21.376953 4.7480469 19.800401 7.0353874 17.894531 9.6328125 C 15.988661 12.230238 13.667085 15.199917 12.564453 16.242188 C 10.476915 18.216003 9 20.901502 9 23.941406 L 9 30.5 C 9 36.83361 14.16639 42 20.5 42 L 29.839844 42 C 33.608263 42 36.80997 39.17385 37.28125 35.435547 L 37.802734 31.707031 L 38.642578 25.707031 L 38.986328 23.261719 C 39.44602 19.979767 36.852377 17 33.539062 17 L 25.068359 17 C 25.760675 15.285488 26.269684 13.733223 26.625 11.986328 A 1.50015 1.50015 0 0 0 26.626953 11.986328 C 26.834844 10.962945 27.009766 10.160054 27.009766 9.3066406 C 27.009766 7.2502388 25.959673 5.7737331 24.941406 5.0351562 C 23.923093 4.2965795 22.865234 4.1210937 22.865234 4.1210938 A 1.50015 1.50015 0 0 0 22.566406 4.1015625 z M 23.138672 7.4453125 C 23.160002 7.4597825 23.158108 7.4491928 23.179688 7.4648438 C 23.610421 7.7772669 24.009766 8.1530425 24.009766 9.3066406 C 24.009766 9.6812269 23.891656 10.374055 23.685547 11.388672 C 23.317219 13.199539 22.89917 14.610616 22.125 16.417969 A 1.50015 1.50015 0 0 0 22.125 16.419922 C 21.799959 17.181231 21.832249 18.040712 22.230469 18.751953 C 22.628685 19.463147 23.478462 20 24.375 20 L 33.539062 20 C 35.083748 20 36.22798 21.315655 36.013672 22.845703 L 35.671875 25.292969 L 34.832031 31.292969 L 34.308594 35.035156 A 1.50015 1.50015 0 0 0 34.304688 35.058594 C 34.021141 37.323145 32.121296 39 29.839844 39 L 20.5 39 C 15.78761 39 12 35.21239 12 30.5 L 12 23.941406 C 12 21.873311 13.004538 19.954059 14.625 18.421875 C 16.189368 16.943146 18.37662 14.046528 20.3125 11.408203 C 21.860136 9.2989994 22.666748 8.1244476 23.138672 7.4453125 z',
  market:
    'M 9.5 5 C 7.5850452 5 6 6.5850452 6 8.5 L 6 11.210938 L 4.1074219 15.943359 A 1.50015 1.50015 0 0 0 4.1972656 17.242188 A 1.50015 1.50015 0 0 0 4.1972656 17.244141 C 4.4255533 18.839081 5.0641162 20.30273 6 21.521484 L 6 42.5 A 1.50015 1.50015 0 0 0 7.5 44 L 40.5 44 A 1.50015 1.50015 0 0 0 42 42.5 L 42 21.525391 C 42.93955 20.303208 43.579477 18.832965 43.806641 17.232422 A 1.50015 1.50015 0 0 0 43.892578 15.943359 L 42 11.210938 L 42 8.5 C 42 6.5850452 40.414955 5 38.5 5 L 9.5 5 z M 9.5 8 L 38.5 8 C 38.795045 8 39 8.2049548 39 8.5 L 39 11.5 A 1.50015 1.50015 0 0 0 39.107422 12.056641 L 40.925781 16.603516 C 40.61678 19.635474 38.120928 22 35 22 C 33.332692 22 31.840802 21.329533 30.753906 20.240234 A 1.50015 1.50015 0 0 0 28.6875 20.185547 C 27.440099 21.313006 25.810875 22 24 22 C 22.189125 22 20.559901 21.313006 19.3125 20.185547 A 1.50015 1.50015 0 0 0 17.246094 20.240234 C 16.159198 21.32953 14.667308 22 13 22 C 9.8778428 22 7.3823584 19.63533 7.0742188 16.603516 L 8.8925781 12.056641 A 1.50015 1.50015 0 0 0 9 11.5 L 9 8.5 C 9 8.2049548 9.2049548 8 9.5 8 z M 29.5 10 A 1.5 1.5 0 0 0 29.5 13 A 1.5 1.5 0 0 0 29.5 10 z M 34.5 10 A 1.5 1.5 0 0 0 34.5 13 A 1.5 1.5 0 0 0 34.5 10 z M 18.335938 23.054688 C 19.960763 24.20091 21.862238 25 24 25 C 26.137762 25 28.039237 24.200909 29.664062 23.054688 C 31.174664 24.19798 32.967968 25 35 25 C 36.445243 25 37.801322 24.648914 39 24.033203 L 39 41 L 35 41 L 35 29.5 A 1.50015 1.50015 0 0 0 33.5 28 L 22.5 28 A 1.50015 1.50015 0 0 0 21 29.5 L 21 41 L 9 41 L 9 24.033203 C 10.19861 24.649179 11.554288 25 13 25 C 15.032032 25 16.825336 24.19798 18.335938 23.054688 z M 24 31 L 32 31 L 32 41 L 24 41 L 24 31 z',
  ok: 'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 31.470703 17.986328 A 1.50015 1.50015 0 0 0 30.439453 18.439453 L 21.5 27.378906 L 17.560547 23.439453 A 1.50015 1.50015 0 1 0 15.439453 25.560547 L 20.439453 30.560547 A 1.50015 1.50015 0 0 0 22.560547 30.560547 L 32.560547 20.560547 A 1.50015 1.50015 0 0 0 31.470703 17.986328 z',
}
