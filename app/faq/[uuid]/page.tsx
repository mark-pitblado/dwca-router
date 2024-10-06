import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import Image from "next/image";

export default async function FAQPage({
  params,
}: {
  params: { uuid: string };
}) {
  const { uuid } = params;

  return (
    <div className="flex flex-col justify-center p-4 items-center min-h-screen bg-[#f5f5f5]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Search</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/r/${uuid}`}>Options</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>FAQ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>{" "}
      <Accordion
        type="single"
        collapsible
        className="pt-5 w-full max-w-lg text-left"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Which identifiers can this application resolve?
          </AccordionTrigger>
          <AccordionContent>
            This application can resolve UUID v1 and UUID v4 occurrenceID's, as
            defined in{" "}
            <Link
              href="http://rs.tdwg.org/dwc/terms/occurrenceID"
              className="text-blue-500 text-underline"
            >
              Darwin Core
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            Why is it necessary to add a domain for the Specify and Symbiota
            options?
          </AccordionTrigger>
          <AccordionContent>
            Specify and Symbiota exist on individually run instances, rather
            than one central place. Therefore, in order for the application to
            know which instance to redirect to, it needs to know the specific
            domain. For Specify, you should have access to your instance only.
            The demo instance is a great option to test out how the button
            works, as it does not require a login.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            Typing in UUID's is a pain, how can I avoid doing this?
          </AccordionTrigger>
          <AccordionContent>
            The application is primarily intended to open up options after
            scanning a code. For example, a given specimen can have a code that
            encodes "https://dwca.net/4c906ce8-a2bf-425f-8d50-82197e918028".
            Then when this code is scanned, it will go directly to the Options
            page. You can generate a code from the options page to try it out!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
