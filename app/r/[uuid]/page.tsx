"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { config } from "@/config.ts";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PlainTextButton from "@/components/PlainTextButton";
import QRCodeGenerator from "@/components/QRCodeGenerator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function UuidPage({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [specifyURL, setSpecifyURL] = useState<string>("");
  const [symbiotaURL, setSymbiotaURL] = useState<string>("");

  useEffect(() => {
    setSpecifyURL(config.specifyURL);
    setSymbiotaURL(config.symbiotaURL);
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
        alert("Please enter a valid URL");
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

  const handleSymbiotaClick = async () => {
    if (symbiotaURL) {
      window.location.href = `${symbiotaURL}/portal/collections/list.php?catnum=${uuid}&includeothercatnum=1`;
    } else {
      alert("Please enter a valid URL");
    }
  };
  // Handle Image button click
  const handleImageClick = async () => {
    router.push(`/images/${uuid}`);
  };

  const handleGenerateQrCode = () => {
    const url = `${routerURL}/r/${uuid}`;
    const qrCodeApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=${encodeURIComponent(size)}&format=${encodeURIComponent(format)}&ecLevel=${errorCorrection}`;
    window.location.href = qrCodeApiUrl;
  };

  const handleBadgeClick = () => {
    navigator.clipboard.writeText(uuid).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
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
              <BreadcrumbPage>Options</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>{" "}
        <QRCodeGenerator />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant="outline"
                onClick={handleBadgeClick}
                className="cursor-pointer"
              >
                {uuid}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center space-x-2">
                <p>Copy to clipboard</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <h1 className="text-2xl font-bold">Select Viewing Option</h1>
        <div className="flex flex-col space-y-2 items-center w-full">
          <PlainTextButton uuid={uuid} />
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
                <label htmlFor="specifyURL" className="text-sm font-medium">
                  Enter Specify URL:
                </label>
                <input
                  id="specifyURL"
                  type="text"
                  value={specifyURL}
                  onChange={(e) => setDomain(e.target.value)}
                  className="border rounded p-2"
                />
                <Button variant="default" onClick={handleSpecifyClick}>
                  Submit
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="default" className="w-3/4 md:w-full">
                Symbiota
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="symbiotaURL" className="text-sm font-medium">
                  Enter Portal URL:
                </label>
                <input
                  id="symbiotaURL"
                  type="text"
                  value={symbiotaURL}
                  onChange={(e) => setDomain(e.target.value)}
                  className="border rounded p-2"
                />
                <Button variant="default" onClick={handleSymbiotaClick}>
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

          <Link
            className="pt-16 underline text-sm text-gray-500 cursor-pointer"
            href={`/faq/${uuid}`}
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
