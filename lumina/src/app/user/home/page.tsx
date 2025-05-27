import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/serverClient';
export default async function DashboardHome() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()  
  if (error || !data?.user) { redirect('/sign-in')  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Welcome back!</h2>
      <p className="text-muted-foreground">
        Select a section on the left to get started.
      </p>
    </div>
  );
}
