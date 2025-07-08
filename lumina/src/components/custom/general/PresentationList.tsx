"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface PresentationListProps {
  presentations: any[] | null;
}
const PresentationList = ({ presentations }: PresentationListProps) => {
  return (
    <div className={`flex flex-col space-y-4`}>
      {presentations?.map((presentation, index) => (
        <Link
          href={`/user/home/presentation/${presentation.id}`}
          key={index}
          className={`w-full ${presentation.is_public&&presentation.active ? '': 'hidden'}`}
        >
          <Card className=" w-full overflow-hidden border border-transparent hover:border-gray-400 transition">
            <CardHeader>
              <CardTitle className="text-base">
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
