"use client";

import { Badge } from "@/components/ui/badge";
import { Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Updated import
import { ToastAction } from "@/components/ui/toast"; // Import ToastAction if needed

interface UuidBadgeProps {
  uuid: string;
}

const UuidBadge = ({ uuid }: UuidBadgeProps) => {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(uuid).then(
      () => {
        toast({
          description: "UUID copied to clipboard!",
          action: (
            <ToastAction altText="Copied" onClick={() => {}}>
              OK
            </ToastAction>
          ),
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          description: "Failed to copy UUID.",
          variant: "destructive",
        });
      },
    );
  };

  return (
    <Badge
      variant="outline"
      onClick={handleCopyToClipboard}
      className="cursor-pointer flex items-center space-x-1"
      aria-label="Copy UUID to clipboard"
    >
      <span>{uuid}</span>
      <Clipboard size={16} />
    </Badge>
  );
};

export default UuidBadge;
