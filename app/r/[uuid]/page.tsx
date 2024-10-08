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
import SpecifyButton from "@/components/SpecifyButton";
import SymbiotaButton from "@/components/SymbiotaButton";
import ImageButton from "@/components/ImageButton";
import GBIFButton from "@/components/GBIFButton";

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
          <GBIFButton uuid={uuid} />
          <SpecifyButton uuid={uuid} />
          <SymbiotaButton uuid={uuid} />
          <ImageButton uuid={uuid} />
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
