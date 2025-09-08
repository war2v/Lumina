"use client";
import { Button } from "@/components/ui/button";
import deleteResource from "@/lib/actions/deleteResource";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: string;
  className?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
  ModalController?: (open: boolean) => void;
}

export const DeleteResourceButton = ({
  id,
  className,
  size = "sm",
  ModalController,
}: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteResource(id);
    ////console.log(res)
    if (res === "Success") {
      router.refresh();
      toast("Resource Deleted");
    }
    if (ModalController) {
      ModalController(false);
    }
  };

  return (
    <Button
      size={size}
      className={cn("bg-red-900 dark:text-white", className)}
      onClick={handleDelete}
    >
      <h1>Delete (CAUTION PERMANENT)</h1>
    </Button>
  );
};
