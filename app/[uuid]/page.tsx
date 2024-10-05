"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function UuidPage({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const router = useRouter();
  const [domain, setDomain] = useState("");

  const handlePlaintextClick = () => {
    router.push(`/plaintext/${uuid}`);
  };
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
      if (domain) {
        if (catalogNumber) {
          window.location.href = `https://${domain}/specify/simple-search/?q=${catalogNumber}`;
        } else {
          alert("Catalog Number not found");
        }
      } else {
        alert("Please enter a valid domain");
      }
    } catch (error) {
      console.error("Error fetching GBIF data:", error);
      alert(
        "An error occurred while converting the UUID to a catalog number. For this functionality to work, the record must exist in GBIF with both a catalogNumber and occurrenceId",
      );
    }
  };

  const handleGbifClick = async () => {
    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
      );
      const result = await response.json();
      const gbifid = result.results[0]?.key;
      if (gbifid) {
        window.location.href = `https://gbif.org/occurrence/${gbifid}`;
      } else {
        alert("GBIF ID not found");
      }
    } catch (error) {
      alert("An error occurred while fetching GBIF data");
    }
  };

  // Handle Image button click
  const handleImageClick = async () => {
    router.push(`/images/${uuid}`);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-[#f5f5f5]">
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Search</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold">Select Viewing Option</h1>
        <div className="flex flex-col space-y-2 items-center w-full">
          <Button
            variant="default"
            className="w-3/4 md:w-full"
            onClick={handlePlaintextClick}
          >
            Plain Text
          </Button>
          <Button
            variant="default"
            className="w-3/4 md:w-full"
            onClick={handleGbifClick}
          >
            GBIF
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="default" className="w-3/4 md:w-full">
                Specify
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="domain" className="text-sm font-medium">
                  Enter Specify Domain:
                </label>
                <input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="sp7demofish.specifycloud.org"
                  className="border rounded p-2"
                />
                <Button variant="default" onClick={handleSpecifyClick}>
                  Submit
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="default"
            className="w-3/4 md:w-full"
            onClick={handleImageClick}
          >
            Images
          </Button>
        </div>
      </div>
    </div>
  );
}
