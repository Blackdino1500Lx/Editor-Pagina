const supabaseUrl = "https://xgvjxwkxfxvmwpndwfpx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhndmp4d2t4Znh2bXdwbmR3ZnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NDg4NDQsImV4cCI6MjA2NDMyNDg0NH0.JegQhVKuLrdiefB6nw6DdnVAVpKL5H93NYv9FMm-evM";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export { supabase };