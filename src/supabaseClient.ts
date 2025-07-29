// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdcbcvvlbyizxhrbramv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkY2JjdnZsYnlpenhocmJyYW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjA5ODksImV4cCI6MjA2OTMzNjk4OX0.ciNAvlPFboBA9Xe3gztwCiINMBkDuQ03p1Mq16WQe3A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
