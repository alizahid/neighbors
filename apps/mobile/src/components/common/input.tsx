import { forwardRef, useState } from 'react'
import {
  type StyleProp,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native'

import { tw } from '~/lib/tailwind'

import { Typography } from './typography'

type Props = Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'autoFocus'
  | 'keyboardType'
  | 'onBlur'
  | 'onChangeText'
  | 'onFocus'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'secureTextEntry'
  | 'value'
> & {
  error?: string
  hint?: string
  label?: string
  style?: StyleProp<ViewStyle>
  styleInput?: StyleProp<TextStyle>
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<TextInput, Props>(
  (
    {
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      error,
      hint,
      keyboardType,
      label,
      onBlur,
      onChangeText,
      onFocus,
      onSubmitEditing,
      placeholder,
      returnKeyType,
      secureTextEntry,
      style,
      styleInput,
      value,
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    return (
      <View style={[tw`gap-1`, style]}>
        {!!label && (
          <Typography color="gray-11" size="sm" weight="medium">
            {label}
          </Typography>
        )}

        <TextInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          onBlur={(event) => {
            setFocused(false)

            onBlur?.(event)
          }}
          onChangeText={onChangeText}
          onFocus={(event) => {
            setFocused(true)

            onFocus?.(event)
          }}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          ref={ref}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          style={[
            tw.style(
              'h-12 bg-gray-2 rounded-lg border border-gray-7 px-3',
              error && 'border-red-7',
              focused && (error ? 'border-red-8' : 'border-primary-8')
            ),
            styleInput,
          ]}
          value={value}
        />

        {!!hint && (
          <Typography color="gray-11" size="sm">
            {hint}
          </Typography>
        )}

        {!!error && (
          <Typography color="red-11" size="sm">
            {error}
          </Typography>
        )}
      </View>
    )
  }
)
