"use client";
import { Button } from "@/components/ui/button";
import { switchDashboard } from "@/lib/dashboard";

export default function DashboardSelector({ setDashboard, current }: {
  setDashboard: (t: string) => void,
  current: string
}) {
  const options = ["unified"];
  
  return (
    <div className="flex w-full justify-center">
      {options.map(opt => (
        <Button
          key={opt}
          className={`py-1 rounded text-white ${opt === current ? "" : "opacity-50"} ${opt === "presenter" ? "rounded-none border-muted-foreground" : opt === "attendee" ? "rounded-r-lg rounded-l-none": "rounded-r-none rounded-l-lg"}`}
          onClick={() => {
            switchDashboard(opt);
            setDashboard(opt);
          }}
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}
