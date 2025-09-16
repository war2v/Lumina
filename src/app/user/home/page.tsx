import { redirect } from 'next/navigation'
import { Container } from '@/components/custom/general/Contatiner';
import Dashboard from './_components/DashboardComponents';
import { getUser } from '@/lib/supabase/getUserServer';
import { getUserPresentations } from '@/lib/queries/server/getUserPresentations';
import { getUserNotes } from '@/lib/queries/server/getUserNotes';
import { Badge } from '@/components/ui/badge';

export default async function DashboardHome() {
  const user = getUser();
  const presentations = await getUserPresentations();
  const notes = await getUserNotes();

  if (!user ){
    redirect("/sign-in")
  }
  return (
    <Container className='h-full p-4'>
      <div className="flex justify-start p-2">
                <Badge>
                    <h1 className="text-muted-foreground font-semibold">Create</h1>
                </Badge>
            </div>
      
      <Dashboard className='flex flex-col items-center w-full  h-full' user={user} presentations={presentations} notes={notes} />

    </Container>
  );
}
