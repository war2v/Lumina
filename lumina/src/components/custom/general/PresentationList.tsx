"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

interface PresentationListProps {
  presentations: any[] | undefined;
}
const PresentationList = ({ presentations }: PresentationListProps) => {

  const {user} = useUser();
  console.log(presentations)

  return (
    <div className={`grid lg:grid-cols-2 gap-4`}>
      {presentations?.map((presentation, index) => (
        <Link
          href={`/user/home/presentation/${presentation.id}`}
          key={index}
          className={`w-full ${!presentation.is_public || !presentation.active ? "hidden" : ""}`}
        >
        
          <Card className="dark:bg-gray-900 w-full h-[150px] overflow-hidden border border-transparent hover:border-red-300 transition">
            <CardHeader>
              <CardTitle className="text-base text-red-300">
                {presentation.title}
                <h1 className="text-muted-foreground text-sm">
                  {presentation.created_by_username}
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {presentation.description}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PresentationList;
