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

interface PNWHerbariaProps {
  uuid: string;
}

const PNWHerbariaButton = ({ uuid }: PNWHerbariaProps) => {
  const handlePNWHerbariaClick = async () => {
    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      const catalogNumber = result.results[0]?.catalogNumber;
      if (catalogNumber) {
        window.location.href = `https://www.pnwherbaria.org/data/results.php?DisplayAs=WebPage&ExcludeCultivated=Y&GroupBy=ungrouped&SortBy=Year&SortOrder=DESC&SearchAllHerbaria=Y&QueryCount=1&Accession1=${catalogNumber}&Zoom=4&Lat=55&Lng=-135&PolygonCount=0`;
      } else {
        alert("Failed to get catalog number from GBIF");
      }
    } catch (error) {
      console.error("Error fetching GBIF data:", error);
      alert(
        "An error occurred while converting the UUID to a catalog number. For this functionality to work, the record must exist in GBIF with both a catalogNumber and occurrenceId",
      );
    }
  };

  return (
    <Button
      variant="default"
      onClick={handlePNWHerbariaClick}
      className="w-3/4 md:w-full"
    >
      Pacific Northwest Herbaria
    </Button>
  );
};

export default PNWHerbariaButton;
