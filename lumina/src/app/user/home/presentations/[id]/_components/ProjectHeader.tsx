import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface HeaderProps {
    title: string;
}

const Header = ({title}: HeaderProps) => {
    return ( 
      
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
                <div className="flex gap-2">
                <Button variant="outline"><Pencil className="mr-1 h-4 w-4" /> Edit</Button>
                <Button variant="destructive"><Trash className="mr-1 h-4 w-4" /> End Presentation</Button>
            </div>
        </div>
       
     );
}
 
export default Header;