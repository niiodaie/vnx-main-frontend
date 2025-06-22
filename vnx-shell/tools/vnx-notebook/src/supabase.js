// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuptevcpwsuxckuhsnwr.supabase.co';
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cHRldmNwd3N1eGNrdWhzbndyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDU1ODE2OSwiZXhwIjoyMDY2MTM0MTY5fQ.xUPuBYzsqUFlXO8hKjjMRiBsATe3TcV05aZ0D1o6kNk
export const supabase = createClient(supabaseUrl, supabaseKey);
