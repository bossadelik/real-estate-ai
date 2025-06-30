import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldulvsuenuuoshsfzian.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdWx2c3VlbnV1b3Noc2Z6aWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzQwOTgsImV4cCI6MjA2NjM1MDA5OH0.-2eDrZsMwNezxjpDxByBR4IjFOhFOcLTsXeNwO_dewQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);