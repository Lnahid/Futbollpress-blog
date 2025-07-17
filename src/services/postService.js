import { supabase } from './supabaseClient';

export async function fetchPosts(category = 'Hamısı') {
  let query = supabase
    .from('posts')
    .select('*, likes:likes(count)')
    .order('created_at', { ascending: false });
  if (category && category !== 'Hamısı') {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  // likes_count üçün uyğunlaşdırma
  return data.map(post => ({
    ...post,
    likes_count: post.likes?.[0]?.count || 0,
  }));
} 