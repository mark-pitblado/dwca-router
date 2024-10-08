"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ImageButtonProps {
  uuid: string;
}

const ImageButton = ({ uuid }: ImageButtonProps) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/images/${uuid}`);
  };

  return (
    <Button
      variant="default"
      className="w-3/4 md:w-full"
      onClick={handleImageClick}
    >
      Images
    </Button>
  );
};

export default ImageButton;
