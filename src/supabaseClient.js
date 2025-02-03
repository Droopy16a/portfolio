import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rmbmsgwjeapwpngziukh.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtYm1zZ3dqZWFwd3BuZ3ppdWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MDU3ODEsImV4cCI6MjA1NDA4MTc4MX0.LCart0haQgF2N0CkkDvdTZMmFzyF8VyvfYwfewOunME"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
