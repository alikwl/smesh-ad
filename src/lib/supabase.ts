import { createClient } from '@supabase/supabase-js';
// Trigger push for Deploy Admin Dashboard workflow with keep_files

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function signInWithMagicLink(email: string) {
  const redirectTo = typeof window !== 'undefined' 
    ? `${window.location.origin}/dashboard` 
    : 'https://admin.smesh.dev/dashboard';

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo
    }
  });
  return { error };
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/login';
}

// Blog CRUD
export async function getBlogs() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, published, published_at, category, updated_at')
    .order('updated_at', { ascending: false });
  return { data, error };
}

export async function getBlog(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function saveBlog(blog: any, id?: string) {
  if (id) {
    return await supabase.from('blog_posts').update({ ...blog, updated_at: new Date().toISOString() }).eq('id', id).select();
  }
  return await supabase.from('blog_posts').insert([{ ...blog, updated_at: new Date().toISOString() }]).select();
}

export async function deleteBlog(id: string) {
  return await supabase.from('blog_posts').delete().eq('id', id);
}

// Resources CRUD
export async function getResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('id, slug, title, published, category, updated_at')
    .order('updated_at', { ascending: false });
  return { data, error };
}

export async function getResource(id: string) {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function saveResource(resource: any, id?: string) {
  if (id) {
    return await supabase.from('resources').update({ ...resource, updated_at: new Date().toISOString() }).eq('id', id).select();
  }
  return await supabase.from('resources').insert([{ ...resource, updated_at: new Date().toISOString() }]).select();
}

export async function deleteResource(id: string) {
  return await supabase.from('resources').delete().eq('id', id);
}

// Portfolio CRUD
export async function getPortfolios() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('id, slug, title, published, sort_order, updated_at')
    .order('sort_order', { ascending: true });
  return { data, error };
}

export async function getPortfolio(id: string) {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function savePortfolio(item: any, id?: string) {
  if (id) {
    return await supabase.from('portfolio').update({ ...item, updated_at: new Date().toISOString() }).eq('id', id).select();
  }
  return await supabase.from('portfolio').insert([{ ...item, updated_at: new Date().toISOString() }]).select();
}

// Leads — read only
export async function getLeads() {
  const { data: leads } = await supabase
    .from('resource_leads')
    .select('*')
    .order('unlocked_at', { ascending: false });
  const { data: contacts } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });
  return { leads, contacts };
}

// GitHub deploy trigger via deployments table insert
export async function triggerDeploy() {
  const { data: { session } } = await supabase.auth.getSession();
  const email = session?.user?.email || 'unknown';
  const { error } = await supabase
    .from('deployments')
    .insert([{ triggered_by: email }]);
  return !error;
}
