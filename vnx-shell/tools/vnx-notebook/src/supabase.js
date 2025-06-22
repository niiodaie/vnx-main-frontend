/// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuptevcpwsuxckuhsnwr.supabase.co'
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cHRldmNwd3N1eGNrdWhzbndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTgxNjksImV4cCI6MjA2NjEzNDE2OX0.eVNn5_PlNDOYD59OQf0EW0rs6X0QRPy5aQwnE7MGaF8
export const supabase = createClient(supabaseUrl, supabaseKey)
