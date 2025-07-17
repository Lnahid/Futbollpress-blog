import { supabase } from './supabaseClient';

export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return user;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export function getUser() {
  return supabase.auth.getUser();
} 