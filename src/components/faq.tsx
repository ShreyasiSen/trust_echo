import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FaqItem {
    question: string;
    answer: string;
  }
  
  interface Faq1Props {
    heading?: string;
    items?: FaqItem[];
  }
  
  const Faq= ({
    heading = "Frequently Asked Questions",
    items = [
      {
        question: "Is this platform free to use?",
        answer:
          "Yes, our testimonial platform is completely free and open source. You can use it without any cost.",
      },
      {
        question: "How do I collect testimonials?",
        answer:
          "You can generate a custom link with questions and share it with your customers to collect testimonials.",
      },
      {
        question: "Can I collect video testimonials?",
        answer:
          "Absolutely! Our platform supports video testimonials, allowing your customers to share their feedback in a more personal way.",
      },
      {
        question: "What insights can I get from testimonials?",
        answer:
          "You can access detailed analytics, including sentiment analysis and graphs, to better understand customer feedback.",
      },
      {
        question: "Is the platform customizable?",
        answer:
          "Yes, being open source, you can customize the platform to suit your specific needs and requirements.",
      },
    ],
  }: Faq1Props) => {
    return (
      <section className="py-32" id="faq">
        <div className="container max-w-3xl mx-auto">
          <h1 className="mb-4 text-center text-3xl font-semibold md:mb-11 md:text-4xl">
            {heading}
          </h1>
          <Accordion type="single" collapsible>
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
export { Faq };