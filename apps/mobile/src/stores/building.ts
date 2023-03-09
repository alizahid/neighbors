import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { getStorage } from '~/lib/storage'

type State = {
  buildingId?: string

  setBuildingId: (buildingId: string) => void
}

export const useBuildingStore = create<State>()(
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
      storage: createJSONStorage(() => getStorage('building')),
    }
  )
)
