import 'server-only'
import { supabase } from './supabase'

export async function readData<T>(key: string, fallback: T): Promise<T> {
  const { data } = await supabase
    .from('site_data')
    .select('value')
    .eq('key', key)
    .single()
  return data ? (data.value as T) : fallback
}

export async function writeData(key: string, value: unknown): Promise<void> {
  await supabase
    .from('site_data')
    .upsert({ key, value, updated_at: new Date().toISOString() })
}
