import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type BuildingStore = {
  buildingId?: string

  setBuildingId: (buildingId: string) => void
}

export const useBuildingStore = create<BuildingStore>()(
  persist(
    (set) => ({
      setBuildingId(buildingId) {
        set({
          buildingId,
        })
      },
    }),
    {
      name: 'building-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
