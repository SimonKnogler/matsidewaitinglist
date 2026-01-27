import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "";
const supabaseAnonKey = "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
