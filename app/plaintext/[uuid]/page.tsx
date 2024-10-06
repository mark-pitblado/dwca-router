import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";

export default async function PlaintextPage({
  params,
}: {
  params: { uuid: string };
}) {
  const { uuid } = params;

  let results = [];
  try {
    const response = await fetch(
      `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    results = result.results;
  } catch (error) {
    return notFound();
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
              <BreadcrumbLink href={`/r/${uuid}`}>Options</BreadcrumbLink>
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
            results.map((item: any, index: number) => (
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
