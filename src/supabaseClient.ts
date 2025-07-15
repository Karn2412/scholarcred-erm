// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://weomenwupoiizjjmrvjw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlb21lbnd1cG9paXpqam1ydmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMjE3ODAsImV4cCI6MjA2NzY5Nzc4MH0.GKNN-Jby3eHdJ9NVAt2xfRKImWJlrhnOHMvlZHnzoHc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
