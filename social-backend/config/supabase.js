    //not necessary for this app but keeping this for future reference
    require('dotenv').config();
    
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL; // Use environment variables for security
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    module.exports = supabase;