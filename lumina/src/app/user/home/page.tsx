import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/serverClient';
import { Container } from '@/components/custom/general/Contatiner';
import { Dashboard } from './_components/DashboardComponents';
export default async function DashboardHome() {
  return (
    <Container>
      <div className="text-2xl text-red-300">Dashboard</div>
      <h2 className="text-2xl font-semibold">Welcome back!</h2>
      <p className="text-muted-foreground">
        Select a section on the left to get started.
      </p>
      <Dashboard />
    </Container>
  );
}
