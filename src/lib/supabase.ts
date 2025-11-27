import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://exrojkbrugojwynbvwco.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4cm9qa2JydWdvand5bmJ2d2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTg4NTAsImV4cCI6MjA3OTc3NDg1MH0.ixGnOtca7hCuoHl6NFej8CVDiEDHpHtmPQ0UHAsJ86o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
