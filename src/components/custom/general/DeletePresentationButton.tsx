"use client";
import { Button } from "@/components/ui/button";
import deletePresentation from "@/lib/actions/deletePresentations";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: string;
  className?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
}

export const DeletePresentationButton = ({
  id,
  className,
  size = "sm",
}: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deletePresentation(id);
    //console.log(res)
    if (res === "Success") {
      router.push("/user/home");
      toast("Presentation Deleted");
    }
  };

  return (
    <Button
      size={size}
      className={cn("bg-red-900 text-white", className)}
      onClick={handleDelete}
    >
      <h1 className="flex ">Delete <Trash2/></h1>
    </Button>
  );
};
