
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DescriptionProps {
    description: string,
    tags: string,
    date: string,
}
const Description = ({description, tags, date}: DescriptionProps) => {
    return ( 
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
                <p className="text-sm text-muted-foreground">Date: </p>
                <p className="text-sm text-muted-foreground">Start: <span className="text-yellow-400">{new Date(date).toDateString()}</span> </p>
                <p className="text-sm text-muted-foreground">Tags: {tags}</p>
            </CardContent>
        </Card>
     );
}
 
export default Description;