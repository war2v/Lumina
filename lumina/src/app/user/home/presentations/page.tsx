import { getUserPresentations } from "@/app/queries/server/getUserPresentations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import Link from "next/link";


const MyPresentations = async () => {
    const presentations = await getUserPresentations();

    function groupBy<T>(list: T[], key: keyof T): Record<string, T[]> {
        return list.reduce((acc, item) => {
            const group = String(item[key]);
            if (!acc[group]) acc[group] = [];
            acc[group].push(item);
            return acc;
        }, {} as Record<string, T[]>);
    }


    if(!presentations){
        return <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-700">My Presentations</h1>
            <p>No presentations found.</p>
         </div>
    }
    const grouped = Object.values(groupBy(presentations, 'active'));
    console.log(grouped[1])
    

    return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-700">My Presentations</h1>

        <div>
            <div>
                <div className="border-b py-4">
                    <h1 className="text-xl font-semibold text-muted-foreground">Active Presentations</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {grouped[1]?.map((presentation: any) => (
                        <Link className="w-full" key={presentation.id} href={`/user/home/presentations/${presentation.id}`}>
                            <Card  className="my-5 w-full overflow-hidden border border-transparent hover:border-gray-400 transition" >
                                
                                <CardHeader>
                                    <CardTitle className="text-base">{presentation.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    
                                        <div className="">
                                            <div className="flex items-center gap-x-3 overflow-hidden">
                                                <p>{presentation.description}</p>
                                            </div>
                                        </div>
                                        
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="border-b py-4">
                <h1 className="text-xl font-semibold text-muted-foreground">Completed Presentations</h1>
            </div>

            {grouped[0]?.map((presentation: any) => (
                <Link key={presentation.id}   href={`/user/home/presentations/${presentation.id}`}>
                    <Card  className="my-5 border border-transparent hover:border-gray-400 transition">
                        <CardHeader>
                            <CardTitle className="text-base">{presentation.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                                <div className="">
                                    <div className="flex items-center gap-x-3">
                                        <p>{presentation.description}</p>
                                    </div>
                                </div>
                    
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
 
export default MyPresentations;