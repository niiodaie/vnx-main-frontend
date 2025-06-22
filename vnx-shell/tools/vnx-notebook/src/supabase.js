import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuptevcpwsuxckuhsnwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // make sure this entire key is a string

export const supabase = createClient(supabaseUrl, supabaseKey);
