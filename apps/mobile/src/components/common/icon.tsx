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
    'M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 24 7 C 27.883764 7 31 10.116238 31 14 C 31 17.883762 27.883764 21 24 21 C 20.116236 21 17 17.883762 17 14 C 17 10.116238 20.116236 7 24 7 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z M 12.5 31 L 35.5 31 C 36.346499 31 37 31.653501 37 32.5 L 37 33.699219 C 37 35.364355 35.927463 37.127823 33.677734 38.5625 C 31.428006 39.997177 28.068841 41 24 41 C 19.931159 41 16.571994 39.997177 14.322266 38.5625 C 12.072537 37.127823 11 35.364355 11 33.699219 L 11 32.5 C 11 31.653501 11.653501 31 12.5 31 z',
  ad: 'M 9.5 8 C 6.4802259 8 4 10.480226 4 13.5 L 4 34.5 C 4 37.519774 6.4802259 40 9.5 40 L 38.5 40 C 41.519774 40 44 37.519774 44 34.5 L 44 13.5 C 44 10.480226 41.519774 8 38.5 8 L 9.5 8 z M 9.5 11 L 38.5 11 C 39.898226 11 41 12.101774 41 13.5 L 41 34.5 C 41 35.898226 39.898226 37 38.5 37 L 9.5 37 C 8.1017741 37 7 35.898226 7 34.5 L 7 13.5 C 7 13.325222 7.0179237 13.154176 7.0507812 12.990234 C 7.2807841 11.842646 8.2765523 11 9.5 11 z M 19 17 C 18.391 17 17.842328 17.368641 17.611328 17.931641 L 13.111328 28.931641 C 12.797328 29.698641 13.164641 30.573719 13.931641 30.886719 C 14.698641 31.202719 15.575672 30.834406 15.888672 30.066406 L 16.324219 29 L 21.675781 29 L 22.111328 30.066406 C 22.349328 30.647406 22.910953 31 23.501953 31 C 23.690953 31 23.882359 30.964672 24.068359 30.888672 C 24.834359 30.575672 25.202672 29.698641 24.888672 28.931641 L 20.388672 17.931641 C 20.158672 17.367641 19.609 17 19 17 z M 33.75 19 C 33.06 19 32.5 19.56 32.5 20.25 L 32.5 22 L 30.5 22 C 28.019 22 26 24.019 26 26.5 C 26 28.981 28.019 31 30.5 31 L 33.75 31 C 34.44 31 35 30.44 35 29.75 L 35 20.25 C 35 19.56 34.44 19 33.75 19 z M 19 22.460938 L 20.447266 26 L 17.552734 26 L 19 22.460938 z M 30.5 24.5 L 32.5 24.5 L 32.5 28.5 L 30.5 28.5 C 29.397 28.5 28.5 27.603 28.5 26.5 C 28.5 25.397 29.397 24.5 30.5 24.5 z',
  add: 'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 13.978516 A 1.50015 1.50015 0 0 0 22.5 15.5 L 22.5 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 22.5 25.5 L 22.5 32.5 A 1.50015 1.50015 0 1 0 25.5 32.5 L 25.5 25.5 L 32.5 25.5 A 1.50015 1.50015 0 1 0 32.5 22.5 L 25.5 22.5 L 25.5 15.5 A 1.50015 1.50015 0 0 0 23.976562 13.978516 z',
  apartment:
    'M 14.5 4 C 11.480226 4 9 6.4802259 9 9.5 L 9 41.5 C 9 42.863594 10.136406 44 11.5 44 L 19.5 44 C 20.863594 44 22 42.863594 22 41.5 L 22 37.5 C 22 37.204955 22.204955 37 22.5 37 L 25.5 37 C 25.795045 37 26 37.204955 26 37.5 L 26 41.5 C 26 42.863594 27.136406 44 28.5 44 L 36.5 44 C 37.863594 44 39 42.863594 39 41.5 L 39 9.5 C 39 6.4802259 36.519774 4 33.5 4 L 14.5 4 z M 14.5 7 L 33.5 7 C 34.898226 7 36 8.1017741 36 9.5 L 36 41 L 29 41 L 29 37.5 C 29 35.585045 27.414955 34 25.5 34 L 22.5 34 C 20.585045 34 19 35.585045 19 37.5 L 19 41 L 12 41 L 12 9.5 C 12 8.1017741 13.101774 7 14.5 7 z M 16.5 10 A 1.50015 1.50015 0 1 0 16.5 13 L 17.5 13 A 1.50015 1.50015 0 1 0 17.5 10 L 16.5 10 z M 23.5 10 A 1.50015 1.50015 0 1 0 23.5 13 L 24.5 13 A 1.50015 1.50015 0 1 0 24.5 10 L 23.5 10 z M 30.5 10 A 1.50015 1.50015 0 1 0 30.5 13 L 31.5 13 A 1.50015 1.50015 0 1 0 31.5 10 L 30.5 10 z M 16.5 16 A 1.50015 1.50015 0 1 0 16.5 19 L 17.5 19 A 1.50015 1.50015 0 1 0 17.5 16 L 16.5 16 z M 23.5 16 A 1.50015 1.50015 0 1 0 23.5 19 L 24.5 19 A 1.50015 1.50015 0 1 0 24.5 16 L 23.5 16 z M 30.5 16 A 1.50015 1.50015 0 1 0 30.5 19 L 31.5 19 A 1.50015 1.50015 0 1 0 31.5 16 L 30.5 16 z M 16.5 22 A 1.50015 1.50015 0 1 0 16.5 25 L 17.5 25 A 1.50015 1.50015 0 1 0 17.5 22 L 16.5 22 z M 23.5 22 A 1.50015 1.50015 0 1 0 23.5 25 L 24.5 25 A 1.50015 1.50015 0 1 0 24.5 22 L 23.5 22 z M 30.5 22 A 1.50015 1.50015 0 1 0 30.5 25 L 31.5 25 A 1.50015 1.50015 0 1 0 31.5 22 L 30.5 22 z M 16.5 28 A 1.50015 1.50015 0 1 0 16.5 31 L 17.5 31 A 1.50015 1.50015 0 1 0 17.5 28 L 16.5 28 z M 23.5 28 A 1.50015 1.50015 0 1 0 23.5 31 L 24.5 31 A 1.50015 1.50015 0 1 0 24.5 28 L 23.5 28 z M 30.5 28 A 1.50015 1.50015 0 1 0 30.5 31 L 31.5 31 A 1.50015 1.50015 0 1 0 31.5 28 L 30.5 28 z',
  boxes:
    'M 14.5 6 A 1.50015 1.50015 0 0 0 13 7.5 L 13 20.5 C 13 21.41337 13.283492 22.23905 13.683594 23 L 5.5 23 A 1.50015 1.50015 0 0 0 4 24.5 L 4 37.5 C 4 40.519774 6.4802259 43 9.5 43 L 20 43 C 21.584839 43 22.992917 42.294739 24 41.208984 C 25.007083 42.294739 26.415161 43 28 43 L 38.5 43 C 41.519774 43 44 40.519774 44 37.5 L 44 24.5 A 1.50015 1.50015 0 0 0 42.5 23 L 33.316406 23 C 33.716508 22.23905 34 21.41337 34 20.5 L 34 7.5 A 1.50015 1.50015 0 0 0 32.5 6 L 14.5 6 z M 16 9 L 31 9 L 31 20.5 C 31 21.898226 29.898226 23 28.5 23 L 24 23 L 18.5 23 C 17.101774 23 16 21.898226 16 20.5 L 16 9 z M 21.5 12 A 1.50015 1.50015 0 1 0 21.5 15 L 25.5 15 A 1.50015 1.50015 0 1 0 25.5 12 L 21.5 12 z M 7 26 L 18.5 26 L 22.5 26 L 22.5 37.5 C 22.5 38.898226 21.398226 40 20 40 L 9.5 40 C 8.1017741 40 7 38.898226 7 37.5 L 7 26 z M 25.5 26 L 28.5 26 L 41 26 L 41 37.5 C 41 38.898226 39.898226 40 38.5 40 L 28 40 C 26.601774 40 25.5 38.898226 25.5 37.5 L 25.5 26 z M 12.5 29 A 1.50015 1.50015 0 1 0 12.5 32 L 16.5 32 A 1.50015 1.50015 0 1 0 16.5 29 L 12.5 29 z M 31.5 29 A 1.50015 1.50015 0 1 0 31.5 32 L 35.5 32 A 1.50015 1.50015 0 1 0 35.5 29 L 31.5 29 z',
  buildings:
    'M 14.5 6 A 1.50015 1.50015 0 0 0 13 7.5 L 13 25 L 7.5 25 A 1.50015 1.50015 0 0 0 6 26.5 L 6 42.5 A 1.50015 1.50015 0 1 0 9 42.5 L 9 28 L 14.253906 28 A 1.50015 1.50015 0 0 0 14.740234 28 L 19 28 L 19 42.5 A 1.50015 1.50015 0 1 0 22 42.5 L 22 26.746094 A 1.50015 1.50015 0 0 0 22 26.259766 L 22 22 L 33.253906 22 A 1.50015 1.50015 0 0 0 33.740234 22 L 39 22 L 39 42.5 A 1.50015 1.50015 0 1 0 42 42.5 L 42 20.5 A 1.50015 1.50015 0 0 0 40.5 19 L 35 19 L 35 7.5 A 1.50015 1.50015 0 0 0 33.5 6 L 14.5 6 z M 16 9 L 32 9 L 32 19 L 20.5 19 A 1.50015 1.50015 0 0 0 19 20.5 L 19 25 L 16 25 L 16 9 z M 20 12 C 19.448 12 19 12.448 19 13 L 19 15 C 19 15.552 19.448 16 20 16 L 22 16 C 22.552 16 23 15.552 23 15 L 23 13 C 23 12.448 22.552 12 22 12 L 20 12 z M 26 12 C 25.448 12 25 12.448 25 13 L 25 15 C 25 15.552 25.448 16 26 16 L 28 16 C 28.552 16 29 15.552 29 15 L 29 13 C 29 12.448 28.552 12 28 12 L 26 12 z M 26 25 C 25.448 25 25 25.448 25 26 L 25 28 C 25 28.552 25.448 29 26 29 L 28 29 C 28.552 29 29 28.552 29 28 L 29 26 C 29 25.448 28.552 25 28 25 L 26 25 z M 33 25 C 32.448 25 32 25.448 32 26 L 32 28 C 32 28.552 32.448 29 33 29 L 35 29 C 35.552 29 36 28.552 36 28 L 36 26 C 36 25.448 35.552 25 35 25 L 33 25 z M 13 31 C 12.448 31 12 31.448 12 32 L 12 34 C 12 34.552 12.448 35 13 35 L 15 35 C 15.552 35 16 34.552 16 34 L 16 32 C 16 31.448 15.552 31 15 31 L 13 31 z M 26 31 C 25.448 31 25 31.448 25 32 L 25 34 C 25 34.552 25.448 35 26 35 L 28 35 C 28.552 35 29 34.552 29 34 L 29 32 C 29 31.448 28.552 31 28 31 L 26 31 z M 33 31 C 32.448 31 32 31.448 32 32 L 32 34 C 32 34.552 32.448 35 33 35 L 35 35 C 35.552 35 36 34.552 36 34 L 36 32 C 36 31.448 35.552 31 35 31 L 33 31 z M 13 37 C 12.448 37 12 37.448 12 38 L 12 40 C 12 40.552 12.448 41 13 41 L 15 41 C 15.552 41 16 40.552 16 40 L 16 38 C 16 37.448 15.552 37 15 37 L 13 37 z M 26 37 C 25.448 37 25 37.448 25 38 L 25 40 C 25 40.552 25.448 41 26 41 L 28 41 C 28.552 41 29 40.552 29 40 L 29 38 C 29 37.448 28.552 37 28 37 L 26 37 z M 33 37 C 32.448 37 32 37.448 32 38 L 32 40 C 32 40.552 32.448 41 33 41 L 35 41 C 35.552 41 36 40.552 36 40 L 36 38 C 36 37.448 35.552 37 35 37 L 33 37 z',
  chat: 'M 15.5 5 C 13.2 5 11.179531 6.1997656 10.019531 8.0097656 C 10.179531 7.9997656 10.34 8 10.5 8 L 33.5 8 C 37.64 8 41 11.36 41 15.5 L 41 31.5 C 41 31.66 41.000234 31.820469 40.990234 31.980469 C 42.800234 30.820469 44 28.8 44 26.5 L 44 15.5 C 44 9.71 39.29 5 33.5 5 L 15.5 5 z M 10.5 10 C 6.9280619 10 4 12.928062 4 16.5 L 4 31.5 C 4 35.071938 6.9280619 38 10.5 38 L 11 38 L 11 42.535156 C 11 44.486408 13.392719 45.706869 14.970703 44.558594 L 23.988281 38 L 32.5 38 C 36.071938 38 39 35.071938 39 31.5 L 39 16.5 C 39 12.928062 36.071938 10 32.5 10 L 10.5 10 z M 10.5 13 L 32.5 13 C 34.450062 13 36 14.549938 36 16.5 L 36 31.5 C 36 33.450062 34.450062 35 32.5 35 L 23.5 35 A 1.50015 1.50015 0 0 0 22.617188 35.287109 L 14 41.554688 L 14 36.5 A 1.50015 1.50015 0 0 0 12.5 35 L 10.5 35 C 8.5499381 35 7 33.450062 7 31.5 L 7 16.5 C 7 16.256242 7.0241227 16.018071 7.0703125 15.789062 C 7.3936413 14.186005 8.7936958 13 10.5 13 z',
  clock:
    'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.476562 11.978516 A 1.50015 1.50015 0 0 0 22 13.5 L 22 25.5 A 1.50015 1.50015 0 0 0 23.5 27 L 31.5 27 A 1.50015 1.50015 0 1 0 31.5 24 L 25 24 L 25 13.5 A 1.50015 1.50015 0 0 0 23.476562 11.978516 z',
  close:
    'M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z',
  comment:
    'M 10.5 7 C 6.9280619 7 4 9.9280619 4 13.5 L 4 30.5 C 4 34.071938 6.9280619 37 10.5 37 L 12 37 L 12 42.5 C 12 44.46599 14.427297 45.67893 16 44.5 L 26 37 L 37.5 37 C 41.071938 37 44 34.071938 44 30.5 L 44 13.5 C 44 9.9280619 41.071938 7 37.5 7 L 10.5 7 z M 10.5 10 L 37.5 10 C 39.450062 10 41 11.549938 41 13.5 L 41 30.5 C 41 32.450062 39.450062 34 37.5 34 L 25.5 34 A 1.50015 1.50015 0 0 0 24.599609 34.300781 L 15 41.5 L 15 35.5 A 1.50015 1.50015 0 0 0 13.5 34 L 10.5 34 C 8.5499381 34 7 32.450062 7 30.5 L 7 13.5 C 7 11.549938 8.5499381 10 10.5 10 z M 15.5 16.998047 A 1.50015 1.50015 0 1 0 15.5 19.998047 L 32.5 19.998047 A 1.50015 1.50015 0 1 0 32.5 16.998047 L 15.5 16.998047 z M 15.5 23.998047 A 1.50015 1.50015 0 1 0 15.5 26.998047 L 28.5 26.998047 A 1.50015 1.50015 0 1 0 28.5 23.998047 L 15.5 23.998047 z',
  community:
    'M 9.9277344 5.0019531 A 1.50015 1.50015 0 0 0 8.8710938 5.5117188 L 5.3710938 9.5117188 A 1.50015 1.50015 0 0 0 5 10.5 L 5 38.5 C 5 40.414955 6.5850452 42 8.5 42 L 11.5 42 C 13.414955 42 15 40.414955 15 38.5 L 15 36 L 19 36 L 19 38.5 C 19 40.414955 20.585045 42 22.5 42 L 25.5 42 C 27.414955 42 29 40.414955 29 38.5 L 29 36 L 33 36 L 33 38.5 C 33 40.414955 34.585045 42 36.5 42 L 39.5 42 C 41.414955 42 43 40.414955 43 38.5 L 43 10.5 A 1.50015 1.50015 0 0 0 42.628906 9.5117188 L 39.128906 5.5117188 A 1.50015 1.50015 0 0 0 37.927734 5.0019531 A 1.50015 1.50015 0 0 0 36.871094 5.5117188 L 33.371094 9.5117188 A 1.50015 1.50015 0 0 0 33 10.5 L 33 16 L 29 16 L 29 10.5 A 1.50015 1.50015 0 0 0 28.628906 9.5117188 L 25.128906 5.5117188 A 1.50015 1.50015 0 0 0 23.927734 5.0019531 A 1.50015 1.50015 0 0 0 22.871094 5.5117188 L 19.371094 9.5117188 A 1.50015 1.50015 0 0 0 19 10.5 L 19 16 L 15 16 L 15 10.5 A 1.50015 1.50015 0 0 0 14.628906 9.5117188 L 11.128906 5.5117188 A 1.50015 1.50015 0 0 0 9.9277344 5.0019531 z M 10 8.7792969 L 12 11.064453 L 12 38.5 C 12 38.795045 11.795045 39 11.5 39 L 8.5 39 C 8.2049548 39 8 38.795045 8 38.5 L 8 11.064453 L 10 8.7792969 z M 24 8.7792969 L 26 11.064453 L 26 38.5 C 26 38.795045 25.795045 39 25.5 39 L 22.5 39 C 22.204955 39 22 38.795045 22 38.5 L 22 11.064453 L 24 8.7792969 z M 38 8.7792969 L 40 11.064453 L 40 38.5 C 40 38.795045 39.795045 39 39.5 39 L 36.5 39 C 36.204955 39 36 38.795045 36 38.5 L 36 11.064453 L 38 8.7792969 z M 15 21 L 19 21 L 19 31 L 15 31 L 15 21 z M 29 21 L 33 21 L 33 31 L 29 31 L 29 21 z',
  edit: 'M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z',
  error:
    'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 12.978516 A 1.50015 1.50015 0 0 0 22.5 14.5 L 22.5 26.5 A 1.50015 1.50015 0 1 0 25.5 26.5 L 25.5 14.5 A 1.50015 1.50015 0 0 0 23.976562 12.978516 z M 24 31 A 2 2 0 0 0 24 35 A 2 2 0 0 0 24 31 z',
  exit: 'M 12.5 6 C 10.57 6 9 7.57 9 9.5 L 9 31.056641 C 9.635 30.406641 10.519 30 11.5 30 L 12 30 L 12 23.626953 A 1.50015 1.50015 0 0 0 14.396484 24.501953 L 19.095703 21 L 21.876953 21 L 20.095703 28.285156 C 20.038703 28.515156 20 28.751047 20 28.998047 C 20 30.244482 20.760356 31.314194 21.841797 31.767578 L 27.125 34.480469 L 28.015625 40.712891 A 1.50015 1.50015 0 1 0 30.984375 40.287109 L 29.984375 33.287109 A 1.50015 1.50015 0 0 0 29.462891 32.351562 L 26.044922 29.150391 L 27.251953 24.257812 L 29.267578 27.15625 A 1.50015 1.50015 0 0 0 30.5 27.800781 L 36 27.800781 L 36 40.5 C 36 41.329 36.672 42 37.5 42 C 38.328 42 39 41.329 39 40.5 L 39 9.5 C 39 7.57 37.43 6 35.5 6 L 12.5 6 z M 12.5 9 L 35.5 9 C 35.775 9 36 9.224 36 9.5 L 36 24.800781 L 31.283203 24.800781 L 27.634766 19.552734 A 1.50015 1.50015 0 0 0 27.556641 19.449219 C 27.030581 18.583857 26.086529 18 24.998047 18 C 24.917682 18 24.842385 18.015258 24.763672 18.021484 A 1.50015 1.50015 0 0 0 24.5 18 L 18.599609 18 A 1.50015 1.50015 0 0 0 17.703125 18.296875 L 12.603516 22.097656 A 1.50015 1.50015 0 0 0 12 23.025391 L 12 9.5 C 12 9.224 12.225 9 12.5 9 z M 29.998047 12 C 28.342047 12 27 13.343047 27 14.998047 C 27 16.655047 28.342047 18 29.998047 18 C 31.657047 18 33 16.655047 33 14.998047 C 33 13.343047 31.657047 12 29.998047 12 z M 18.392578 30.917969 L 17.015625 32 L 11.5 32 C 10.672 32 10 32.671 10 33.5 C 10 34.329 10.672 35 11.5 35 L 17.5 35 C 17.815 35 18.122906 34.899844 18.378906 34.714844 L 21.154297 33.662109 L 20.992188 33.578125 C 19.788187 33.050125 18.877578 32.084969 18.392578 30.917969 z M 9 35.943359 L 9 40.5 C 9 41.329 9.672 42 10.5 42 C 11.328 42 12 41.329 12 40.5 L 12 37 L 11.5 37 C 10.519 37 9.635 36.593359 9 35.943359 z',
  expand:
    'M 43.486328 11.978516 A 1.50015 1.50015 0 0 0 42.439453 12.439453 L 24 30.878906 L 5.5605469 12.439453 A 1.50015 1.50015 0 0 0 4.484375 11.984375 A 1.50015 1.50015 0 0 0 3.4394531 14.560547 L 22.939453 34.060547 A 1.50015 1.50015 0 0 0 25.060547 34.060547 L 44.560547 14.560547 A 1.50015 1.50015 0 0 0 43.486328 11.978516 z',
  home: 'M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z',
  info: 'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z',
  left: 'M 21.470703 8.9863281 A 1.50015 1.50015 0 0 0 20.439453 9.4394531 L 6.4394531 23.439453 A 1.50015 1.50015 0 0 0 6.4394531 25.560547 L 20.439453 39.560547 A 1.50015 1.50015 0 1 0 22.560547 37.439453 L 11.121094 26 L 40.5 26 A 1.50015 1.50015 0 1 0 40.5 23 L 11.121094 23 L 22.560547 11.560547 A 1.50015 1.50015 0 0 0 21.470703 8.9863281 z',
  like: 'M 22.566406 4.1015625 A 1.50015 1.50015 0 0 0 21.376953 4.7480469 C 21.376953 4.7480469 19.800401 7.0353874 17.894531 9.6328125 C 15.988661 12.230238 13.667085 15.199917 12.564453 16.242188 C 10.476915 18.216003 9 20.901502 9 23.941406 L 9 30.5 C 9 36.83361 14.16639 42 20.5 42 L 29.839844 42 C 33.608263 42 36.80997 39.17385 37.28125 35.435547 L 37.802734 31.707031 L 38.642578 25.707031 L 38.986328 23.261719 C 39.44602 19.979767 36.852377 17 33.539062 17 L 25.068359 17 C 25.760675 15.285488 26.269684 13.733223 26.625 11.986328 A 1.50015 1.50015 0 0 0 26.626953 11.986328 C 26.834844 10.962945 27.009766 10.160054 27.009766 9.3066406 C 27.009766 7.2502388 25.959673 5.7737331 24.941406 5.0351562 C 23.923093 4.2965795 22.865234 4.1210937 22.865234 4.1210938 A 1.50015 1.50015 0 0 0 22.566406 4.1015625 z M 23.138672 7.4453125 C 23.160002 7.4597825 23.158108 7.4491928 23.179688 7.4648438 C 23.610421 7.7772669 24.009766 8.1530425 24.009766 9.3066406 C 24.009766 9.6812269 23.891656 10.374055 23.685547 11.388672 C 23.317219 13.199539 22.89917 14.610616 22.125 16.417969 A 1.50015 1.50015 0 0 0 22.125 16.419922 C 21.799959 17.181231 21.832249 18.040712 22.230469 18.751953 C 22.628685 19.463147 23.478462 20 24.375 20 L 33.539062 20 C 35.083748 20 36.22798 21.315655 36.013672 22.845703 L 35.671875 25.292969 L 34.832031 31.292969 L 34.308594 35.035156 A 1.50015 1.50015 0 0 0 34.304688 35.058594 C 34.021141 37.323145 32.121296 39 29.839844 39 L 20.5 39 C 15.78761 39 12 35.21239 12 30.5 L 12 23.941406 C 12 21.873311 13.004538 19.954059 14.625 18.421875 C 16.189368 16.943146 18.37662 14.046528 20.3125 11.408203 C 21.860136 9.2989994 22.666748 8.1244476 23.138672 7.4453125 z',
  lock: 'M 24 4 C 19.599415 4 16 7.599415 16 12 L 16 16 L 12.5 16 C 10.032499 16 8 18.032499 8 20.5 L 8 39.5 C 8 41.967501 10.032499 44 12.5 44 L 35.5 44 C 37.967501 44 40 41.967501 40 39.5 L 40 20.5 C 40 18.032499 37.967501 16 35.5 16 L 32 16 L 32 12 C 32 7.599415 28.400585 4 24 4 z M 24 7 C 26.779415 7 29 9.220585 29 12 L 29 16 L 19 16 L 19 12 C 19 9.220585 21.220585 7 24 7 z M 12.5 19 L 35.5 19 C 36.346499 19 37 19.653501 37 20.5 L 37 39.5 C 37 40.346499 36.346499 41 35.5 41 L 12.5 41 C 11.653501 41 11 40.346499 11 39.5 L 11 20.5 C 11 19.653501 11.653501 19 12.5 19 z M 24 27 A 3 3 0 0 0 24 33 A 3 3 0 0 0 24 27 z',
  market:
    'M 10.5 6 C 10.311158 6 10.123459 6.0106094 9.9394531 6.0292969 C 7.3546484 6.2927266 5.2927266 8.3546484 5.0292969 10.939453 C 5.0292969 10.939453 5.0292969 10.941406 5.0292969 10.941406 C 5.0106094 11.125412 5 11.311158 5 11.5 L 5 13.210938 L 3.1074219 17.943359 A 1.50015 1.50015 0 0 0 3.0039062 18.599609 C 3.1218394 20.379079 3.8897246 21.965195 5 23.263672 L 5 36.5 C 5 39.519774 7.4802259 42 10.5 42 L 37.5 42 C 40.519774 42 43 39.519774 43 36.5 L 43 23.263672 C 44.110275 21.965195 44.87816 20.379079 44.996094 18.599609 A 1.50015 1.50015 0 0 0 44.892578 17.943359 L 43 13.210938 L 43 11.5 C 43 11.311264 42.989606 11.1235 42.970703 10.939453 C 42.707273 8.3546484 40.643398 6.2927266 38.058594 6.0292969 C 37.874547 6.0103939 37.688736 6 37.5 6 L 10.5 6 z M 10.5 9 C 11.328 9 12 9.672 12 10.5 C 12 11.328 11.328 12 10.5 12 C 9.672 12 9 11.328 9 10.5 C 9 9.672 9.672 9 10.5 9 z M 15.5 9 C 16.328 9 17 9.672 17 10.5 C 17 11.328 16.328 12 15.5 12 C 14.672 12 14 11.328 14 10.5 C 14 9.672 14.672 9 15.5 9 z M 21.5 9 L 37.5 9 C 38.328 9 39 9.672 39 10.5 C 39 11.328 38.328 12 37.5 12 L 21.5 12 C 20.672 12 20 11.328 20 10.5 C 20 9.672 20.672 9 21.5 9 z M 7.515625 15 L 40.484375 15 L 41.931641 18.619141 C 41.766257 19.976139 40.979932 21.287576 39.712891 22.289062 C 38.3757 23.345997 36.597373 24 35 24 C 33.333175 24 31.841123 23.327101 30.753906 22.238281 A 1.50015 1.50015 0 0 0 28.6875 22.185547 C 27.440099 23.313006 25.810875 24 24 24 C 22.189125 24 20.559901 23.313006 19.3125 22.185547 A 1.50015 1.50015 0 0 0 17.246094 22.238281 C 16.158877 23.327105 14.666825 24 13 24 C 11.402627 24 9.6242999 23.345996 8.2871094 22.289062 C 7.0200675 21.287575 6.2337428 19.976139 6.0683594 18.619141 L 7.515625 15 z M 18.335938 25.054688 C 19.960763 26.20091 21.862238 27 24 27 C 26.137762 27 28.039237 26.200909 29.664062 25.054688 C 31.174366 26.197416 32.967572 27 35 27 C 36.745295 27 38.470903 26.51437 40 25.677734 L 40 36.5 C 40 37.898226 38.898226 39 37.5 39 L 10.5 39 C 9.1017741 39 8 37.898226 8 36.5 L 8 25.677734 C 9.5290972 26.51437 11.254705 27 13 27 C 15.032428 27 16.825634 26.197416 18.335938 25.054688 z',
  ok: 'M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 31.470703 17.986328 A 1.50015 1.50015 0 0 0 30.439453 18.439453 L 21.5 27.378906 L 17.560547 23.439453 A 1.50015 1.50015 0 1 0 15.439453 25.560547 L 20.439453 30.560547 A 1.50015 1.50015 0 0 0 22.560547 30.560547 L 32.560547 20.560547 A 1.50015 1.50015 0 0 0 31.470703 17.986328 z',
  online:
    'M 9.4296875 9.984375 A 1.50015 1.50015 0 0 0 8.2675781 10.482422 C 1.2457719 18.098381 1.2450175 29.890165 8.265625 37.515625 A 1.50015 1.50015 0 1 0 10.472656 35.484375 C 4.493264 28.989835 4.4944628 19.001619 10.472656 12.517578 A 1.50015 1.50015 0 0 0 9.4296875 9.984375 z M 38.675781 9.984375 A 1.50015 1.50015 0 0 0 38.525391 9.9863281 A 1.50015 1.50015 0 0 0 37.527344 12.517578 C 43.505537 19.001619 43.506736 28.989835 37.527344 35.484375 A 1.50015 1.50015 0 1 0 39.734375 37.515625 C 46.754982 29.890165 46.754275 18.098381 39.732422 10.482422 A 1.50015 1.50015 0 0 0 38.675781 9.984375 z M 31.5 15.144531 A 1.50015 1.50015 0 0 0 30.429688 17.710938 C 33.870426 21.220491 33.870426 26.779509 30.429688 30.289062 A 1.50015 1.50015 0 1 0 32.570312 32.390625 C 37.129575 27.740179 37.129575 20.259821 32.570312 15.609375 A 1.50015 1.50015 0 0 0 31.5 15.144531 z M 16.455078 15.146484 A 1.50015 1.50015 0 0 0 15.429688 15.609375 C 10.870425 20.259821 10.870426 27.740179 15.429688 32.390625 A 1.50015 1.50015 0 1 0 17.570312 30.289062 C 14.129575 26.779509 14.129575 21.220491 17.570312 17.710938 A 1.50015 1.50015 0 0 0 16.455078 15.146484 z M 24 21 A 3 3 0 0 0 24 27 A 3 3 0 0 0 24 21 z',
  plus: 'M 23.976562 4.9785156 A 1.50015 1.50015 0 0 0 22.5 6.5 L 22.5 22.5 L 6.5 22.5 A 1.50015 1.50015 0 1 0 6.5 25.5 L 22.5 25.5 L 22.5 41.5 A 1.50015 1.50015 0 1 0 25.5 41.5 L 25.5 25.5 L 41.5 25.5 A 1.50015 1.50015 0 1 0 41.5 22.5 L 25.5 22.5 L 25.5 6.5 A 1.50015 1.50015 0 0 0 23.976562 4.9785156 z',
  qr: 'M 10.5 6 C 8.0324991 6 6 8.0324991 6 10.5 L 6 17.5 C 6 19.967501 8.0324991 22 10.5 22 L 17.5 22 C 19.967501 22 22 19.967501 22 17.5 L 22 10.5 C 22 8.0324991 19.967501 6 17.5 6 L 10.5 6 z M 30.5 6 C 28.032499 6 26 8.0324991 26 10.5 L 26 17.5 C 26 19.967501 28.032499 22 30.5 22 L 37.5 22 C 39.967501 22 42 19.967501 42 17.5 L 42 10.5 C 42 8.0324991 39.967501 6 37.5 6 L 30.5 6 z M 10.5 9 L 17.5 9 C 18.346499 9 19 9.6535009 19 10.5 L 19 17.5 C 19 18.346499 18.346499 19 17.5 19 L 10.5 19 C 9.6535009 19 9 18.346499 9 17.5 L 9 10.5 C 9 9.6535009 9.6535009 9 10.5 9 z M 30.5 9 L 37.5 9 C 38.346499 9 39 9.6535009 39 10.5 L 39 17.5 C 39 18.346499 38.346499 19 37.5 19 L 30.5 19 C 29.653501 19 29 18.346499 29 17.5 L 29 10.5 C 29 9.6535009 29.653501 9 30.5 9 z M 12 12 L 12 16 L 16 16 L 16 12 L 12 12 z M 32 12 L 32 16 L 36 16 L 36 12 L 32 12 z M 10.5 26 C 8.0324991 26 6 28.032499 6 30.5 L 6 37.5 C 6 39.967501 8.0324991 42 10.5 42 L 17.5 42 C 19.967501 42 22 39.967501 22 37.5 L 22 30.5 C 22 28.032499 19.967501 26 17.5 26 L 10.5 26 z M 26 26 L 26 31.5 L 31.5 31.5 L 31.5 26 L 26 26 z M 31.5 31.5 L 31.5 36.5 L 36.5 36.5 L 36.5 31.5 L 31.5 31.5 z M 36.5 31.5 L 42 31.5 L 42 26 L 36.5 26 L 36.5 31.5 z M 36.5 36.5 L 36.5 42 L 42 42 L 42 36.5 L 36.5 36.5 z M 31.5 36.5 L 26 36.5 L 26 42 L 31.5 42 L 31.5 36.5 z M 10.5 29 L 17.5 29 C 18.346499 29 19 29.653501 19 30.5 L 19 37.5 C 19 38.346499 18.346499 39 17.5 39 L 10.5 39 C 9.6535009 39 9 38.346499 9 37.5 L 9 30.5 C 9 29.653501 9.6535009 29 10.5 29 z M 12 32 L 12 36 L 16 36 L 16 32 L 12 32 z',
  right:
    'M 26.484375 8.984375 A 1.50015 1.50015 0 0 0 25.439453 11.560547 L 36.878906 23 L 7.5 23 A 1.50015 1.50015 0 1 0 7.5 26 L 36.878906 26 L 25.439453 37.439453 A 1.50015 1.50015 0 1 0 27.560547 39.560547 L 41.560547 25.560547 A 1.50015 1.50015 0 0 0 41.560547 23.439453 L 27.560547 9.4394531 A 1.50015 1.50015 0 0 0 26.484375 8.984375 z',
  search:
    'M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z',
  send: 'M 5.4453125 4.0019531 A 1.50015 1.50015 0 0 0 4.109375 6.0644531 L 11.380859 24 L 4.109375 41.935547 A 1.50015 1.50015 0 0 0 6.1699219 43.841797 L 43.169922 25.341797 A 1.50015 1.50015 0 0 0 43.169922 22.658203 L 6.1699219 4.1582031 A 1.50015 1.50015 0 0 0 5.4453125 4.0019531 z M 8.3828125 8.6191406 L 39.146484 24 L 8.3828125 39.380859 L 14.011719 25.5 L 27.5 25.5 A 1.50015 1.50015 0 1 0 27.5 22.5 L 14.011719 22.5 L 8.3828125 8.6191406 z',
  startChat:
    'M 10.5 7 C 6.9280619 7 4 9.9280619 4 13.5 L 4 30.5 C 4 34.071938 6.9280619 37 10.5 37 L 12 37 L 12 42.5 C 12 44.46599 14.427297 45.67893 16 44.5 L 26 37 L 37.5 37 C 41.071938 37 44 34.071938 44 30.5 L 44 13.5 C 44 9.9280619 41.071938 7 37.5 7 L 10.5 7 z M 10.5 10 L 37.5 10 C 39.450062 10 41 11.549938 41 13.5 L 41 30.5 C 41 32.450062 39.450062 34 37.5 34 L 25.5 34 A 1.50015 1.50015 0 0 0 24.599609 34.300781 L 15 41.5 L 15 35.5 A 1.50015 1.50015 0 0 0 13.5 34 L 10.5 34 C 8.5499381 34 7 32.450062 7 30.5 L 7 13.5 C 7 11.549938 8.5499381 10 10.5 10 z',
  uploadImage:
    'M 11.5 6 C 8.47 6 6 8.47 6 11.5 L 6 36.5 C 6 39.53 8.47 42 11.5 42 L 24.050781 42 C 23.460781 41.07 22.980625 40.07 22.640625 39 L 11.5 39 C 11.4 39 11.299219 38.990469 11.199219 38.980469 L 11.195312 38.980469 L 23.269531 27.289062 C 23.619531 26.959063 24.209375 26.919219 24.609375 27.199219 C 25.209375 26.399219 25.909688 25.659766 26.679688 25.009766 C 25.159688 23.669766 22.659453 23.710859 21.189453 25.130859 L 9.0292969 36.894531 C 9.0290993 36.893266 9.0294926 36.891891 9.0292969 36.890625 C 9.0092969 36.760625 9 36.63 9 36.5 L 9 11.5 C 9 10.12 10.12 9 11.5 9 L 36.5 9 C 37.88 9 39 10.12 39 11.5 L 39 22.640625 C 40.07 22.980625 41.07 23.460781 42 24.050781 L 42 11.5 C 42 8.47 39.53 6 36.5 6 L 11.5 6 z M 30.5 13 C 29.125 13 27.903815 13.569633 27.128906 14.441406 C 26.353997 15.313179 26 16.416667 26 17.5 C 26 18.583333 26.353997 19.686821 27.128906 20.558594 C 27.903815 21.430367 29.125 22 30.5 22 C 31.875 22 33.096185 21.430367 33.871094 20.558594 C 34.646003 19.686821 35 18.583333 35 17.5 C 35 16.416667 34.646003 15.313179 33.871094 14.441406 C 33.096185 13.569633 31.875 13 30.5 13 z M 30.5 16 C 31.124999 16 31.403816 16.180367 31.628906 16.433594 C 31.853997 16.686821 32 17.083333 32 17.5 C 32 17.916667 31.853997 18.313179 31.628906 18.566406 C 31.403816 18.819633 31.124999 19 30.5 19 C 29.875001 19 29.596184 18.819633 29.371094 18.566406 C 29.146003 18.313179 29 17.916667 29 17.5 C 29 17.083333 29.146003 16.686821 29.371094 16.433594 C 29.596184 16.180367 29.875001 16 30.5 16 z M 35 24 C 28.925 24 24 28.925 24 35 C 24 41.075 28.925 46 35 46 C 41.075 46 46 41.075 46 35 C 46 28.925 41.075 24 35 24 z M 35 27 C 35.552 27 36 27.448 36 28 L 36 34 L 42 34 C 42.552 34 43 34.448 43 35 C 43 35.552 42.552 36 42 36 L 36 36 L 36 42 C 36 42.552 35.552 43 35 43 C 34.448 43 34 42.552 34 42 L 34 36 L 28 36 C 27.448 36 27 35.552 27 35 C 27 34.448 27.448 34 28 34 L 34 34 L 34 28 C 34 27.448 34.448 27 35 27 z',
}
