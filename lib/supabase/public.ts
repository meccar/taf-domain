import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createPublicClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createSupabaseClient(url, key);
}
