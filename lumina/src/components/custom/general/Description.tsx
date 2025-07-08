
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DescriptionProps {
    description: string
}
const Description = ({description}: DescriptionProps) => {
    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
     );
}
 
export default Description;