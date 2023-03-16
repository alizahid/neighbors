import { createId } from '@paralleldrive/cuid2'
import mitt from 'mitt'
import {
  type FunctionComponent,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import { View } from 'react-native'
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Icon, type IconName } from '~/components/common/icon'
import { Pressable } from '~/components/common/pressable'
import { Typography } from '~/components/common/typography'
import { getSpace, tw } from '~/lib/tailwind'

type Toast = {
  delay?: number
  icon?: IconName
  message: string
  title?: string
  variant?: 'message' | 'error' | 'success' | 'notification'

  onPress?: () => void
}

type Events = {
  toast: Toast
}

export const mitter = mitt<Events>()

type Props = {
  children: ReactNode
}

export const ToastProvider: FunctionComponent<Props> = ({ children }) => {
  const { top } = useSafeAreaInsets()

  const [toasts, setToasts] = useState<
    Array<
      Toast & {
        id: string
      }
    >
  >([])

  useEffect(() => {
    const handler = (toast: Toast) => {
      const id = createId()

      setToasts((toasts) => [
        ...toasts,
        {
          ...toast,
          id,
        },
      ])

      setTimeout(
        () => setToasts((toasts) => toasts.filter((toast) => toast.id !== id)),
        toast.delay ?? 5_000
      )
    }

    mitter.on('toast', handler)

    return () => mitter.off('toast', handler)
  }, [])

  return (
    <>
      {children}

      <View
        pointerEvents="box-none"
        style={tw`absolute top-[${top + getSpace(4)}px] inset-x-0 gap-2`}
      >
        {toasts.map(({ icon, id, message, onPress, title, variant }) => (
          <Animated.View
            entering={SlideInUp.duration(500)}
            exiting={SlideOutUp.duration(500)}
            key={id}
            style={tw`mx-4`}
          >
            <Pressable
              onPress={() => {
                onPress?.()

                setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
              }}
              style={tw.style(
                'flex-row items-center gap-2 rounded-xl border px-3 py-3 shadow',
                variant === 'notification'
                  ? 'border-mint-6 bg-mint-3'
                  : variant === 'success'
                  ? 'border-green-6 bg-green-3'
                  : variant === 'error'
                  ? 'border-red-6 bg-red-3'
                  : 'border-yellow-6 bg-yellow-3'
              )}
            >
              {icon && (
                <Icon
                  color={
                    variant === 'notification'
                      ? 'mint-11'
                      : variant === 'success'
                      ? 'green-11'
                      : variant === 'error'
                      ? 'red-11'
                      : 'yellow-11'
                  }
                  name={icon}
                />
              )}

              <View style={tw`flex-1`}>
                {!!title && (
                  <Typography
                    color={
                      variant === 'notification'
                        ? 'mint-12'
                        : variant === 'success'
                        ? 'green-12'
                        : variant === 'error'
                        ? 'red-12'
                        : 'yellow-12'
                    }
                    lines={1}
                    size="sm"
                    weight="medium"
                  >
                    {title}
                  </Typography>
                )}

                <Typography
                  color={
                    variant === 'notification'
                      ? 'mint-12'
                      : variant === 'success'
                      ? 'green-12'
                      : variant === 'error'
                      ? 'red-12'
                      : 'yellow-12'
                  }
                  lines={1}
                >
                  {message}
                </Typography>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </>
  )
}

export const toast = (toast: Toast) => mitter.emit('toast', toast)
