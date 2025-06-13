import { getUserPresentations } from "@/app/queries/server/getUserPresentations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import Link from "next/link";


const MyPresentations = async () => {
    const presentations = await getUserPresentations();

    return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-700">My Presentations</h1>
      {presentations?.length === 0 ? (
        <p>No presentations found.</p>
      ) : (
        <ul className="list-disc pl-5">
            
            <div className="border-b py-4">
                <h1 className="text-xl font-semibold text-muted-foreground">Active Presentations</h1>
            </div>
            {presentations?.map((presentation: any) => (
                <Link  href={`/user/home/presentations/${presentation.id}`} key={presentation.id} hidden={presentation.active == true}>
                    <Card   className="my-5 border border-transparent hover:border-gray-400 transition" >
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

            <div className="border-b py-4">
                <h1 className="text-xl font-semibold text-muted-foreground">Completed Presentations</h1>
            </div>

            {presentations?.map((presentation: any) => (
                <Link key={presentation.id}   href={`/user/home/presentations/${presentation.id}`}>
                    <Card  className="my-5 border border-transparent hover:border-gray-400 transition" hidden={presentation.active == false}>
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
        </ul>
        
      )}
    </div>
  );
}
 
export default MyPresentations;