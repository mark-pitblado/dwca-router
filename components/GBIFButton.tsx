"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GbifButtonProps {
  uuid: string;
}

const GbifButton = ({ uuid }: GbifButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleGbifClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from GBIF");
      }
      const result = await response.json();
      const gbifId = result.results[0]?.key;
      if (gbifId) {
        window.location.href = `https://gbif.org/occurrence/${gbifId}`;
      } else {
        alert("GBIF ID not found");
      }
    } catch (error) {
      console.error("Error fetching GBIF data:", error);
      alert("An error occurred while fetching GBIF data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      className="w-3/4 md:w-full"
      onClick={handleGbifClick}
      disabled={loading}
    >
      {loading ? "Loading..." : "GBIF"}
    </Button>
  );
};

export default GbifButton;
