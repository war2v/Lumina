import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Lightbulb } from "lucide-react";

const Problem = () => {
    return ( 
        <div className="py-12 px-4 md:px-12 bg-muted/50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              Why Flare Notes?
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Problem & Our Solution
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Addressing a common pain point for presenters and audiences alike.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            <Card className="bg-white dark:bg-gray-900 border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <AlertCircle className="text-red-500 mt-1" size={22} />
                  <h3 className="text-xl font-semibold text-red-700 dark:text-red-400">
                    The Problem
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  During live presentations, audiences are often distracted by the need to take notes or snap photos of slides. This leads to missed key points and decreased engagement. Presenters struggle to keep their audience focused while sharing resources efficiently.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Lightbulb className="text-green-500 mt-1" size={22} />
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                    Our Solution
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Flare Notes allows presenters to share slides, links, and key materials before or during their talk, so the audience can stay present and fully engaged. Meanwhile, each audience member can take private, personalized notes within the app — no distractions, no missed moments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
     );
}
 
export default Problem;