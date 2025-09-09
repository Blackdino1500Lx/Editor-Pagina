const supabaseUrl = "https://etqhjkvmazpxrpsudeaa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cWhqa3ZtYXpweHJwc3VkZWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTE1NTksImV4cCI6MjA3MzAyNzU1OX0.9MMQJjE1_cTAFwWDZjRyFbMY2Bpki8he9b54LS60OHI";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export { supabase };