"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";

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
        "Yes, our testimonial platform is entirely free and open source. You can use it without any charges or limitations.",
    },
    {
      question: "How can I collect testimonials from users?",
      answer:
        "You can create a personalized link with predefined questions and share it with your customers to gather testimonials seamlessly.",
    },
    {
      question: "Is the platform compatible with no-code tools?",
      answer:
        "Absolutely. Our platform is built with no-code compatibility in mind, allowing effortless integration into your existing tools and workflows.",
    },
    {
      question: "With so many testimonial platforms available, why should I choose this one?",
      answer:
        "Unlike most platforms, we are completely free and allow unlimited testimonials and spaces. Our AI-driven system categorizes responses into strengths and areas for improvement, providing actionable insights.",
    },
    {
      question: "How does the platform utilize AI?",
      answer:
        "Our AI analyzes the content of testimonials to detect customer sentiment and highlight key themes, enabling you to make informed decisions based on authentic feedback.",
    },
    {
      question: "What is the role of visual analytics on the platform?",
      answer:
        "Visual analytics provide a clear overview of how your testimonials perform. You can track sentiment trends and feedback impact through intuitive data visualizations.",
    },
    {
      question: "Can I customize the HTML code of the testimonials?",
      answer:
        "Yes, the platform offers full HTML customization, allowing you to tailor the design and layout to match your brand identity.",
    },
    {
      question: "Are spam responses filtered from the analytics?",
      answer:
        "Yes, our system includes built-in spam detection mechanisms to ensure only authentic responses are included in your analytics.",
    },
    {
      question: "Will I receive email notifications for new testimonials?",
      answer:
        "Yes, you will be notified via email instantly whenever a new testimonial is submitted to your dashboard.",
    }
  ]
  
}: Faq1Props) => {
  return (
    <motion.section
      id="faq"
      className="py-24 bg-gradient-to-b from-blue-50 to-pink-50 relative overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/20 via-white to-white"></div>

      <div className="container mx-auto max-w-4xl px-6 sm:px-12 lg:px-0">
        <h2 className="text-center text-4xl font-bold tracking-tight  text-gray-800 relative mb-16">
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
                <AccordionTrigger className="text-lg font-semibold cursor-pointer text-gray-800 hover:text-purple-600 transition-all duration-300">
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
    </motion.section>
  );
};

export { Faq };