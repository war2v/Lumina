'use server';

import { createClient } from '@/lib/supabase/serverClient';

export async function toggleIsPublic(presentationId: string, currentState: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('presentations')
    .update({ is_public: !currentState })
    .eq('id', presentationId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

 


  return !currentState;
}
