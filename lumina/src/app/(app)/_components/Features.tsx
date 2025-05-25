import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: 'Seamless Resource Sharing',
    description:
      'Presenters can easily share slides, links, and documents before or during their presentation.',
  },
  {
    title: 'Private Audience Notes',
    description:
      'Each audience member can take and keep their own personal notes, distraction-free.',
  },
  {
    title: 'Live & Pre-Talk Support',
    description:
      'Resources can be shared in advance or in real time, helping audiences prepare and stay engaged.',
  },
  {
    title: 'Mobile & Desktop Friendly',
    description:
      'Accessible across devices so both presenters and viewers can stay connected wherever they are.',
  },
  {
    title: 'No More Slide Photos',
    description:
      'Attendees focus on the message — not their cameras or notepads.',
  },
]

const Features = () => {
    return ( 
        <div className="px-4 py-10 mx-auto max-w-[100rem] sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              Key Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Makes Flare Notes Different
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Designed to keep presenters focused and audiences engaged.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <CheckCircle className="text-red-500 mt-1" size={20} />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
     );
}
 
export default Features;