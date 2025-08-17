import { getUserPresentations } from "@/app/queries/server/getUserPresentations";
import { Container } from "@/components/custom/general/Contatiner";
import MyPresentationList from "@/components/custom/general/MyPresentationList";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  if (!presentations) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-700">My Presentations</h1>
        <p>No presentations found.</p>
      </div>
    );
  }
  const grouped = Object.values(groupBy(presentations, "active"));
  const groupedP = Object.values(groupBy(presentations, "is_public"));

  return (
    <Container>
      
      <div>
        <div>
          <div className="border-b pb-2">
            <h1 className="text-2xl text-red-300">Presentations</h1>

            <Badge className="font-semibold text-muted-foreground">
              Active
            </Badge>
          </div>
          <div className="w-full flex items-start gap-x-4">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <h1 className="text-green-400 py-5 text-xl">Public</h1>
              <MyPresentationList presentations={groupedP[1]}  />
              
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
              <h1 className="text-red-300 py-5 text-xl">Private</h1>
              <MyPresentationList presentations={groupedP[0]} />
            </div>
          </div>
        </div>
        <div>
          <div className="border-b py-4">
            <Badge className="font-semibold text-muted-foreground">
              Inactive
            </Badge>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-4 space-y-4 ">
            <MyPresentationList presentations={grouped[1]} />
          </div>
        </div>

      </div>
    </Container>
  );
};

export default MyPresentations;
