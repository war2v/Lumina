import { Container } from "../general/Contatiner";
import BaseModal from "./BaseModal";
import { DeleteResourceButton } from "../general/DeleteResourceButton";

export default function DeleteResourceModal(
    {
    id,
    open,
    onOpenChange}:{
        id: string;
        open: boolean;
        onOpenChange: (open: boolean) => void;
    }
){

  return (
    <BaseModal title='DELETING RESOURCE IS PERMANENT' open={open} onOpenChange={onOpenChange}>
        <Container className="flex flex-col items-center justify-center">
            <div>
                <h1>BEWARE: This action is irrevisible. You will lose access to this resource</h1>
            </div>
            <DeleteResourceButton id={id} ModalController={onOpenChange} />
        </Container>
    </BaseModal>
  );
}