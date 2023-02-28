import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: AsyncStorage,
  },
})

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
