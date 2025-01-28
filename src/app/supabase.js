import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thtelaxuelgqudylmdmr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodGVsYXh1ZWxncXVkeWxtZG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjAzMzIsImV4cCI6MjA1MjMzNjMzMn0.eQx4gIqD1Fn7Leo4IpWbJUzwm1cf_hx6ks4ZIMkVH1Q'
export const supabase = createClient(supabaseUrl, supabaseKey)