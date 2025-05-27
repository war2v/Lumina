"use client";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

const Logout = () => {
    const logout = useLogout()
    return ( 
        <Button variant="destructive" onClick={logout}>Sign-out</Button>
     );
}
 
export default Logout;