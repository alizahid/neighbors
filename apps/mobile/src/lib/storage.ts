import { MMKV } from 'react-native-mmkv'

export const getStorage = (id: string) => {
  const mmkv = new MMKV({
    id,
  })

  return {
    getItem: async (key: string) => mmkv.getString(key) ?? null,
    removeItem: async (key: string) => mmkv.delete(key),
    setItem: async (key: string, value: string) => mmkv.set(key, value),
  }
}
