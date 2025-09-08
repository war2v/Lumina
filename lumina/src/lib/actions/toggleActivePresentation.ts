'use server';

import { createClient } from '@/lib/supabase/serverClient';

export async function togglePresentationActive(presentationId: string, currentState: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('presentations')
    .update({ active: !currentState })
    .eq('id', presentationId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

 


  return !currentState;
}
