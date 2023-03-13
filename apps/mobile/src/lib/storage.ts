import { MMKV } from 'react-native-mmkv'

type Key = 'supabase' | 'trpc' | 'building'

export const getStorage = (id: Key) => {
  const mmkv = new MMKV({
    id,
  })

  return {
    clear: () => mmkv.clearAll(),
    getItem: async (key: string) => mmkv.getString(key) ?? null,
    removeItem: async (key: string) => mmkv.delete(key),
    setItem: async (key: string, value: string) => mmkv.set(key, value),
  }
}
