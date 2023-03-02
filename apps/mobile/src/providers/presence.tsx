import {
  createContext,
  type FunctionComponent,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useProfile } from '~/hooks/auth/profile'

import { supabase } from '../lib/supabase'

type PresenceValue = {
  users: Array<string>
}

const PresenceContext = createContext<PresenceValue>({
  users: [],
})

type Props = {
  children: ReactNode
}

export const PresenceProvider: FunctionComponent<Props> = ({ children }) => {
  const [users, setUers] = useState<PresenceValue['users']>([])

  const { profile } = useProfile()

  useEffect(() => {
    if (!profile?.id) {
      return
    }

    const channel = supabase.channel('online', {
      config: {
        presence: {
          key: profile.id,
        },
      },
    })

    channel.on('presence', { event: 'sync' }, () =>
      setUers(Object.keys(channel.presenceState()))
    )

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({})
      }
    })

    return () => {
      channel.unsubscribe()
    }
  }, [profile?.id])

  return (
    <PresenceContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </PresenceContext.Provider>
  )
}

export const usePresence = () => useContext(PresenceContext)
