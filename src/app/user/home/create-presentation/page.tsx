import { Container } from "@/components/custom/general/Contatiner";
import CreatePresentationForm from "@/components/forms/createPresentationForm";
import { Badge } from "@/components/ui/badge";

const createPresentationPage = () => {
    return ( 
        <Container className="flex flex-col p-4">
        
            <div className="flex justify-start p-2">
                <Badge>
                    <h1 className="text-muted-foreground font-semibold">Create</h1>
                </Badge>
            </div>
            <CreatePresentationForm />
        </Container>
     );
}
 
export default createPresentationPage;