"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { config } from "@/config.ts";

interface QRCodeGeneratorProps {
  uuid: string;
}

const QRCodeGenerator = ({ uuid }: QRCodeGeneratorProps) => {
  const [routerURL, setRouterURL] = useState<string>("");
  const [size, setSize] = useState<string>("150");
  const [format, setFormat] = useState<string>("png");
  const [errorCorrection, setErrorCorrection] = useState<string>("M");

  useEffect(() => {
    setRouterURL(config.routerURL);
    setSize(config.qrCodeSize);
    setFormat(config.qrCodeFormat);
    setErrorCorrection(config.qrCodeErrorCorrection);
  }, []);

  const handleGenerateQrCode = () => {
    const url = `${routerURL}/r/${uuid}`;
    const qrCodeApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=${encodeURIComponent(size)}&format=${encodeURIComponent(format)}&ecLevel=${errorCorrection}`;
    window.location.href = qrCodeApiUrl;
  };

  return (
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
            Generate a QR code that links to this router
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="routerURL" className="text-right">
              Router
            </Label>
            <Input
              id="routerURL"
              type="url"
              onChange={(e) => setRouterURL(e.target.value)}
              value={routerURL}
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
  );
};

export default QRCodeGenerator;
