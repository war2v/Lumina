import { getUserPresentations } from "@/app/queries/getUserPresentations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import Link from "next/link";


const MyPresentations = async () => {
    const presentations = await getUserPresentations();

    return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Presentations</h1>
      {presentations?.length === 0 ? (
        <p>No presentations found.</p>
      ) : (
        <ul className="list-disc pl-5">
            
                <CardHeader className="border-b">
                    <h1 className="text-xl font-semibold">Active Presentations</h1>
                </CardHeader>
            <Card className="my-5">
                <CardContent>
                {presentations?.map((presentation: any) => (
                    <Link key={presentation.id}  href="#">
                        <div className="border my-3 rounded-lg p-2" hidden={presentation.active == true}>
                            <h2 className="font-semibold">
                                {presentation.title}
                            </h2>
                            
                            <div className="flex items-center gap-x-3">
                                <p>{presentation.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                </CardContent>
            </Card>

            <Card className="my-5">
                <CardHeader className="border-b">
                <h1 className="text-xl font-semibold">Completed Presentations</h1>
                </CardHeader>

                <CardContent>
                    {presentations?.map((presentation: any) => (
                        <Link key={presentation.id}  href="#">
                        <div className="border my-3 rounded-lg p-2" hidden={presentation.active == false}>
                            <h2 className="font-semibold">{presentation.title}</h2>
                            <div className="flex items-center gap-x-3">
                                <p>{presentation.description}</p>
                            </div>
                        </div>
                         </Link>
                    ))}
                </CardContent>
            </Card>
        </ul>
        
      )}
    </div>
  );
}
 
export default MyPresentations;