// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://zfunalpwvrssdottjlwl.supabase.co'
// const supabaseAnonKey = 'sb_publishable_Bek1SGfFsfTSLvxuB70HiA_S9sHp28X'

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables')
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)


import { createClient } from '@supabase/supabase-js'

// Ye values apni daalna
const supabaseUrl = 'https://zfunalpwvrssdottjlwl.supabase.co'
const supabaseAnonKey = 'sb_publishable_Bek1SGfFsfTSLvxuB70HiA_S9sHp28X'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})