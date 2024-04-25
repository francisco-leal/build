import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with TypeScript typings
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

let start = 0;

const {
    data: users,
    error: userError,
    count
} = await supabaseAdmin
    .from('users')
    .select('*')
    .is('rank', null)
    .order('created_at', { ascending: true })
    .range(start, start + 1000);

console.log(users, count);
