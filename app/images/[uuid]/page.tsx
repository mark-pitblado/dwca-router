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
      <div className="relative w-full max-w-lg mx-auto">
        <Carousel className="flex justify-center items-center">
          <CarouselPrevious className="absolute left-0 z-10 p-2" />
          <CarouselContent className="w-full flex justify-center items-center">
            {mediaLinks.map((link: string, index: number) => (
              <CarouselItem key={index} className="w-full">
                <img
                  src={link}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto max-h-[500px] rounded-lg object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute right-0 z-10 p-2" />
        </Carousel>
      </div>
    </div>
  );
}
