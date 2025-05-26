// lib/auth/logout.ts
'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browserClient';

export const useLogout = () => {
  const router = useRouter();
  const supabase = createClient();
  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  return logout;
};
