"use client"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation";

export const Dashboard = () => {
    const user = useUser();
    const router = useRouter();

    if (!user){
        router.push('/login')
    }
    return (
        <div>
            Dashboard
        </div>
    )
}