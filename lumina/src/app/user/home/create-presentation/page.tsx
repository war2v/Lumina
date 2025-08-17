import { Container } from "@/components/custom/general/Contatiner";
import CreatePresentationForm from "@/components/forms/createPresentationForm";
import { Badge } from "@/components/ui/badge";

const createPresentationPage = () => {
    return ( 
        <Container className="flex flex-col">
            <div className="text-2xl text-red-300">Create Presentation</div>
            <div className="flex justify-center">
                <Badge>
                    <h1 className="text-muted-foreground font-semibold">Create</h1>
                </Badge>
            </div>
            <CreatePresentationForm />
        </Container>
     );
}
 
export default createPresentationPage;