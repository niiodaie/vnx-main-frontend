// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuptevcpwsuxckuhsnwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cHRldmNwd3N1eGNrdWhzbmRyIiwicm9sZSI6InBvc3RncmVzIiwiaWF0IjoxNjg4MzQ0NjMzLCJleHAiOjIwMDM5MjA2MzN9.nP0EdURuhXBrRXYcnFiTgaJ9vPQDwr2vZPZ9qtdcJ4o';
export const supabase = createClient(supabaseUrl, supabaseKey);
