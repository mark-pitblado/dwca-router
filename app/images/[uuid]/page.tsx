import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function ImagesPage({
  params,
}: {
  params: { uuid: string };
}) {
  const { uuid } = params;

  // Server-side fetching of media data from the GBIF API
  const response = await fetch(
    `https://api.gbif.org/v1/occurrence/search?occurrenceid=${uuid}`,
  );
  const result = await response.json();

  const media = result.results[0]?.media || [];
  const mediaLinks = media.map(
    (item: { identifier: string }) => item.identifier,
  );

  if (mediaLinks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No images found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
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
              <BreadcrumbLink>Images</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-2xl font-bold py-4 ">Images</h1>
      <span>Click on an image to open it up in fullscreen</span>
      <div className="relative w-full max-w-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {mediaLinks.map((link: string, index: number) => (
            <div key={index} className="shadow-lg rounded-lg overflow-hidden">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img
                  src={link}
                  alt={`Image ${index + 1}`}
                  className="rounded-lg"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
