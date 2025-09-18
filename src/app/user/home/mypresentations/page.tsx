import { getUserPresentations } from "@/lib/queries/server/getUserPresentations";
import { Container } from "@/components/custom/general/Contatiner";
import MyPresentationList from "@/components/custom/general/MyPresentationList";
import { MyPresentationSelector } from "@/components/custom/myPresentationDashboard/MyPresentationTypeSelector";
import { SearchComponent } from "@/components/custom/myPresentationDashboard/SearchComponent";
import { Badge } from "@/components/ui/badge";
import PresentationCalendar from "@/components/custom/general/PresentationCalendar";
import { UserResourceList } from "@/components/custom/general/UserResourceList";
import { getUserResources } from "@/lib/queries/server/getUserResource";

const MyPresentations = async () => {
  const presentations = await getUserPresentations();
  const resources = await getUserResources();
  ////console.log(resources)

  if (!presentations) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-700">My Presentations</h1>
        <p>No presentations found.</p>
      </div>
    );
  }

  function groupBy<T>(list: T[], key: keyof T): Record<string, T[]> {
    if (!list) {
      return {} as Record<string, T[]>;
    }

    return list.reduce((acc, item) => {
      const group = String(item[key]);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  }
  const grouped = Object.values(groupBy(presentations, "active"));
  const groupedP = Object.values(groupBy(grouped[0], "is_public"));

  return (
    <Container className="p-4">
      <div className="grid grid-cols-1 gap-2  overflow-hidden">
        <div className="py-2">
          <Badge>
            <h1 className="text-muted-foreground">My Presentations</h1>
          </Badge>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 h-full">
          <div className="h-full">
            <PresentationCalendar presentations={presentations} />
          </div>
          <div>
            <UserResourceList
              resources={resources}
              presentations={presentations}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1  gap-x-4">
          <div>
            <div className="py-4">
              <Badge className="font-semibold text-muted-foreground">
                All Presentations
              </Badge>
            </div>
            <div className="w-full grid grid-cols-1 items-start lg:gap-x-4 md:gap-y-2 ">
              <div className="w-full flex flex-col justify-center items-center">
                <SearchComponent
                  listClassName="mt-2"
                  presentations={presentations}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="py-4">
              <Badge className="font-semibold text-muted-foreground">
                Active
              </Badge>
            </div>
            <div className="w-full grid grid-cols-1 items-start gap-x-4">
              <MyPresentationSelector
                public_presentations={groupedP[1]}
                private_presentations={groupedP[0]}
              />
            </div>
          </div>
          <div>
            <div className="py-4 pb-6">
              <Badge className="font-semibold text-muted-foreground">
                Inactive
              </Badge>
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-4 mt-9">
              <MyPresentationList presentations={grouped[1]} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyPresentations;
