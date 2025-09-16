"use client";
import { useEffect, useState } from "react";
import { getDashboardType } from "@/lib/dashboard";
import DashboardSelector from "@/components/custom/general/DashboardSelector";
import { redirect } from "next/navigation";
import { UnifiedDashboard } from "@/components/custom/Dashboards/Unified";
import { PresenterDashboard } from "@/components/custom/Dashboards/Presenter";
import { AttendeeDashboard } from "@/components/custom/Dashboards/Attendee";
import CreatePresentationModal from "@/components/custom/Modals/CreatePresentationModal";
import { getUserResources } from "@/lib/queries/client/getUserResource";
import { PresentationType } from "@/app/types";

interface Props {
    className?: string;
    presentations: PresentationType[];
    user: any;
    notes: any[]
}
export default function Dashboard({ user, className, presentations, notes }: Props) {
  const [dashboard, setDashboard] = useState("unified");
  const [createPresModal, openCreatePresModal] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  
      
  
  useEffect(() => {
      const getResources = async () => {
          const resources = await getUserResources();
          setResources(resources)
      }
      getResources()
      setDashboard("unified")
  }, []);
  

  if (!user){
        redirect('/login')
    }

  useEffect(() => {
    setDashboard(getDashboardType(user.role));
  }, [user]);

  return (
    <div className={className}>
      <DashboardSelector setDashboard={setDashboard} current={dashboard} />
      {dashboard === "unified" && <UnifiedDashboard resources={resources} notes={notes} presentations={presentations} />}
      {dashboard === "presenter" && <PresenterDashboard resources={resources} presentations={presentations}/>}
      {dashboard === "attendee" && <AttendeeDashboard />}
      <CreatePresentationModal open={createPresModal} onOpenChange={openCreatePresModal} />
    </div>
  );
}
