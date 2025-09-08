import { Container } from "../general/Contatiner";
import { DeletePresentationButton } from "../general/DeletePresentationButton";
import BaseModal from "./BaseModal";

export default function DeletePresentationModal({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BaseModal
      title="DELETING PRESENTATION IS PERMANENT"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Container className="flex flex-col items-center justify-center">
        <div>
          <h1>
            BEWARE: This action is irrevisible. You will lose access to this
            presention
          </h1>
        </div>
        <DeletePresentationButton id={id} />
      </Container>
    </BaseModal>
  );
}
