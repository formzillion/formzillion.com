import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/Accordion/SAccordion";

interface ItemsProps {
  title: string;
  description: string;
}
interface AccordionProps {
  items: ItemsProps[];
  type: any;
  collapsible: boolean;
  className: string;
}
export default function CustomAccordion({
  items,
  type,
  collapsible = true,
  className = "",
}: AccordionProps) {
  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      className={` space-y-4 ${className}`}
    >
      {items.map((item: ItemsProps, index: number) => (
        <AccordionItem key={index} value={index.toString()} className="">
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
