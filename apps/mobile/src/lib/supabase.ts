import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from '@env'
import { createId } from '@paralleldrive/cuid2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import * as ExpoImagePicker from 'expo-image-picker'
import mime from 'mime'

import { type Database } from '~/types/supabase'

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLIC_KEY,
  {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storage: AsyncStorage,
    },
  }
)

export const SUPABASE_BUCKET = 'images'

export const getImageUrl = (url?: string | null) => {
  if (!url) {
    return
  }

  if (url.startsWith('http')) {
    return url
  }

  return supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(url).data.publicUrl
}
