const supabaseUrl = "https://etqhjkvmazpxrpsudeaa.supabase.co";
const supabaseKey = "sb_publishable_crYVs5YVzIpqD3fqdRNcCw_Bvl1bIeg";
let supabase = null;
if (window.supabase) {
  supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
} else if (typeof Supabase !== 'undefined') {
  supabase = Supabase.createClient(supabaseUrl, supabaseKey);
}
window.supabaseInstance = supabase;
export { supabase };