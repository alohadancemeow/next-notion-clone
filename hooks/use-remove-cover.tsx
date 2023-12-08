import { useEdgeStore } from "@/lib/edgestore";

export const useRomveCover = () => {
  const { edgestore } = useEdgeStore();

  const removeCoverFromEdgestore = async (url?: string) => {
    if (!url) return null;

    await edgestore.publicFiles.delete({
      url: url,
    });
  };

  return { removeCoverFromEdgestore };
};
