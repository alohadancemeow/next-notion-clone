"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="flex items-center justify-center w-full p-2 text-sm text-center text-white bg-rose-500 gap-x-2">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="h-auto p-1 px-2 font-normal text-white bg-transparent border-white hover:bg-primary/5 hover:text-white"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="h-auto p-1 px-2 font-normal text-white bg-transparent border-white hover:bg-primary/5 hover:text-white"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
