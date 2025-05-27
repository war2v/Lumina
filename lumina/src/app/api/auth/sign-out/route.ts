// app/api/auth/sign-out/route.ts
import { createClient } from '@/lib/supabase/serverClient';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createClient();

  // Sign out server-side (removes auth cookies)
  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}
