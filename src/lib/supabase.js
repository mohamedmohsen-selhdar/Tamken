import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
// Get them from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

/**
 * Uploads a file to Supabase Storage under the 'images' bucket.
 * Returns the public URL of the uploaded file.
 */
export async function uploadImage(file, folder = 'general') {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
