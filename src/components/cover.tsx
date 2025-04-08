"use client";
import { motion } from "framer-motion";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Cover = ({
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  image = {
    src: "/cover.png",
    alt: "Space section demo image",
  },
}: Hero1Props) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 md:gap-16 items-center lg:grid-cols-2">
          {/* Left Div Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <h1 className="italic mb-6 text-3xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-fuchsia-600 via-rose-500 to-blue-700 bg-clip-text text-transparent">
              {heading}
            </h1>
            <p className="mb-8 max-w-2xl text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed tracking-wide">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Example buttons if needed */}
              {/* <Button>{buttons?.primary?.text}</Button>
              <Button variant="outline">{buttons?.secondary?.text}</Button> */}
            </div>
          </motion.div>

          {/* Right Div Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full max-w-lg h-auto rounded-md object-cover shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Cover };