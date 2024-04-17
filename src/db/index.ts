import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://hyzzeizbcpyzooqjzyeh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase };
