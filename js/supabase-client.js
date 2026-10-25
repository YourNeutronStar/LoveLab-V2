const config =window.LL_SUPABASE_CONFIG;

window.LL_SUPABASE = window.supabase.createClient(config.url, config.publishableKey);