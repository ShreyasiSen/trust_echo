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

const Faq = ({
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
    <section
      id="faq"
      className="py-32 bg-gradient-to-b from-purple-50 via-purple-100 to-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/20 via-white to-white"></div>

      <div className="container mx-auto max-w-4xl px-6 sm:px-12 lg:px-0">
        <h2 className="text-center text-4xl font-semibold font-['Playfair_Display'] text-gray-800 relative mb-16">
          {heading}
          <span className="block h-1 w-24 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mx-auto mt-3 rounded-full animate-pulse" />
        </h2>

        <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-xl ring-1 ring-purple-100 px-6 py-10 space-y-4 transition-all duration-500">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-all duration-300">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base font-[Inter] transition-all duration-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>

  );
};

export { Faq };