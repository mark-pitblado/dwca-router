"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { config } from "@/config.ts";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [resolverDomain, setResolverDomain] = useState<string>("");
  const [size, setSize] = useState<string>("150");
  const [format, setFormat] = useState<string>("png");
  const [errorCorrection, setErrorCorrection] = useState<string>("M");

  useEffect(() => {
    setResolverDomain(config.resolverDomain);
  }, []);

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

  const handleSymbiotaClick = async () => {
    if (domain) {
      window.location.href = `https://${domain}/portal/collections/list.php?catnum=${uuid}&includeothercatnum=1`;
    } else {
      alert("Please enter a valid domain");
    }
  };
  // Handle Image button click
  const handleImageClick = async () => {
    router.push(`/images/${uuid}`);
  };

  const handleGenerateQrCode = () => {
    const url = `https://${resolverDomain}/${uuid}`;
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
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 11V3h8v8zm2-2h4V5H5zM3 21v-8h8v8zm2-2h4v-4H5zm8-8V3h8v8zm2-2h4V5h-4zm4 12v-2h2v2zm-6-6v-2h2v2zm2 2v-2h2v2zm-2 2v-2h2v2zm2 2v-2h2v2zm2-2v-2h2v2zm0-4v-2h2v2zm2 2v-2h2v2z"
                />
              </svg>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Generate QR Code</DialogTitle>
              <DialogDescription>
                Generate a QR code that links to this resolver
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Resolver root
                </Label>
                <Input
                  id="resolverDomain"
                  type="url"
                  onChange={(e) => setResolverDomain(e.target.value)}
                  value={resolverDomain}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Size (pixels)
                </Label>
                <Input
                  id="size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="format" className="text-right">
                  Format
                </Label>
                <RadioGroup
                  value={format}
                  onValueChange={(value) => setFormat(value)}
                  defaultValue="png"
                  className="col-span-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="png" id="png" />
                      <Label htmlFor="png">PNG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="svg" id="svg" />
                      <Label htmlFor="svg">SVG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="base64" id="base64" />
                      <Label htmlFor="base64">Base 64</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="errorCorrection" className="text-right">
                  Error correction
                </Label>
                <RadioGroup
                  defaultValue="M"
                  value={errorCorrection}
                  onValueChange={(value) => setErrorCorrection(value)}
                  className="col-span-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="L" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="M" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="H" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleGenerateQrCode}>Generate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="default" className="w-3/4 md:w-full">
                Symbiota
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="domain" className="text-sm font-medium">
                  Enter Portal Domain:
                </label>
                <input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="bryophyteportal.org"
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
