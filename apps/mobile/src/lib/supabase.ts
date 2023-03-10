import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from '@env'
import { createClient } from '@supabase/supabase-js'

import { type Database } from '~/types/supabase'

import { getStorage } from './storage'

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLIC_KEY,
  {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storage: getStorage('supabase'),
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

  return supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(url, {
    transform: {
      width: 800,
    },
  }).data.publicUrl
}
