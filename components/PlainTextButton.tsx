"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PlainTextButtonProps {
  uuid: string;
}

const PlainTextButton = ({ uuid }: PlainTextButtonProps) => {
  const router = useRouter();

  const handlePlaintextClick = () => {
    router.push(`/plaintext/${uuid}`);
  };

  return (
    <Button
      variant="default"
      className="w-3/4 md:w-full"
      onClick={handlePlaintextClick}
    >
      Plain Text
    </Button>
  );
};

export default PlainTextButton;
