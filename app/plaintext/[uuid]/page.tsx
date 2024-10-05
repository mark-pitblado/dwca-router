"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PlaintextPage({
  params,
}: {
  params: { uuid: string };
}) {
  const { uuid } = params;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the GBIF API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        // Extract and set only the 'results' field
        setResults(result.results);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-start items-start h-screen bg-[#f5f5f5] overflow-auto"
      style={{ paddingTop: "5vh" }}
    >
      {/* Breadcrumbs with back button */}
      <div className="flex items-center justify-between w-full p-4">
        <Breadcrumb>
          <BreadcrumbList className="flex space-x-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Search</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Options</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Plaintext</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* JSON Content */}
      <div className="p-4 w-full">
        <pre className="text-sm whitespace-pre-wrap">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div key={index}>{JSON.stringify(item, null, 2)}</div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </pre>
      </div>
    </div>
  );
}
