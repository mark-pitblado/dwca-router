// components/SpecifyButton.tsx
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
import { config } from "@/config.ts"; // Import the config

interface SpecifyButtonProps {
  uuid: string;
}

const SpecifyButton = ({ uuid }: SpecifyButtonProps) => {
  const [specifyURL, setSpecifyURL] = useState<string>("");

  useEffect(() => {
    // Set default specifyURL from config
    setSpecifyURL(config.specifyURL);
  }, []);

  const handleSpecifyClick = async () => {
    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      const catalogNumber = result.results[0]?.catalogNumber;
      if (specifyURL) {
        if (catalogNumber) {
          window.location.href = `${specifyURL}/specify/simple-search/?q=${catalogNumber}`;
        } else {
          alert("Catalog Number not found");
        }
      } else {
        alert("Please enter a valid Specify URL");
      }
    } catch (error) {
      console.error("Error fetching GBIF data:", error);
      alert(
        "An error occurred while converting the UUID to a catalog number. For this functionality to work, the record must exist in GBIF with both a catalogNumber and occurrenceId",
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="w-3/4 md:w-full">
          Specify
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="specifyURL" className="text-sm font-medium">
            Enter Specify URL:
          </label>
          <Input
            id="specifyURL"
            type="text"
            value={specifyURL}
            onChange={(e) => setSpecifyURL(e.target.value)}
            className="border rounded p-2"
          />
          <Button variant="default" onClick={handleSpecifyClick}>
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SpecifyButton;
