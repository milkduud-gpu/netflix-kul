import { supabase } from './supabase'

export async function helloWorld(body) {
  const { data, error } = await supabase.functions.invoke('hello-world', { body })
  if (error) throw error
  return data
}
