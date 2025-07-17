import { supabase } from './supabaseClient';

export async function addLike(postId, userIdOrIp) {
  const { data, error } = await supabase
    .from('likes')
    .insert([{ post_id: postId, user_ip: userIdOrIp }]);
  if (error) throw error;
  return data;
} 