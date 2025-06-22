// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuptevcpwsuxckuhsnwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...rest.of.key...Q'; 
export const supabase = createClient(supabaseUrl, supabaseKey);
