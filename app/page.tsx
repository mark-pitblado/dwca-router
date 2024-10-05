"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResolverPage() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Regular expression to validate both UUIDv1 and UUIDv4
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const finalInputValue =
      inputValue.trim() === ""
        ? "4c906ce8-a2bf-425f-8d50-82197e918028"
        : inputValue;
    if (!uuidRegex.test(finalInputValue)) {
      setError("Invalid UUID (version 1 or 4)");
    } else {
      setError("");
      // Navigate to /{uuid} route with the valid UUID
      router.push(`/${finalInputValue}`);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-[#f5f5f5]">
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Resolver</h1>
        <p className="text-gray-500">
          Enter an occurrenceID for a specimen shared in Darwin Core. Must
          follow the UUID v1 or v4 standard. Click Submit to use the example
          value.
        </p>
        <form
          className="flex w-full flex-col items-center space-y-2"
          onSubmit={handleSubmit}
        >
          <div className="flex w-3/4 md:w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="4c906ce8-a2bf-425f-8d50-82197e918028"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
