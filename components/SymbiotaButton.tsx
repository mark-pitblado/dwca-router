"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { config } from "@/config.ts";

interface SymbiotaButtonProps {
  uuid: string;
}

const SymbiotaButton = ({ uuid }: SymbiotaButtonProps) => {
  const [symbiotaURL, setSymbiotaURL] = useState<string>("");

  useEffect(() => {
    setSymbiotaURL(config.symbiotaURL);
  }, []);

  const handleSymbiotaClick = () => {
    if (symbiotaURL) {
      window.location.href = `${symbiotaURL}/portal/collections/list.php?catnum=${uuid}&includeothercatnum=1`;
    } else {
      alert("Please enter a valid Symbiota URL");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="w-3/4 md:w-full">
          Symbiota
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="symbiotaURL" className="text-sm font-medium">
            Enter Symbiota URL:
          </Label>
          <Input
            id="symbiotaURL"
            type="text"
            value={symbiotaURL}
            onChange={(e) => setSymbiotaURL(e.target.value)}
            className="border rounded p-2"
          />
          <Button variant="default" onClick={handleSymbiotaClick}>
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SymbiotaButton;
