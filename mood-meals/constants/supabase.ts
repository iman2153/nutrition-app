import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jwndkqdvgimdlrchmfdw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bmRrcWR2Z2ltZGxyY2htZmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwODg4MzAsImV4cCI6MjA2MDY2NDgzMH0.FAofaoE2fXMCy7KdeV5MMsX2_zCkLrl2aoDX2e83ekg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
