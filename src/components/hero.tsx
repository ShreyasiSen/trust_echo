"use client";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const headings = [
    "Collect Testimonials Effortlessly",
    "Grow Your Business with Feedback",
    "Unlock Insights with Testimonials",
    "Engage Customers Like Never Before",
  ];

  const [currentHeading, setCurrentHeading] = useState("");
  const [fullHeading, setFullHeading] = useState(headings[0]);
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 80; // Speed of typing (milliseconds per character)
    const switchingDelay = 2800; // Delay between headings

    const typeEffect = setTimeout(() => {
      if (charIndex < fullHeading.length) {
        setCurrentHeading((prev) => prev + fullHeading[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % headings.length);
          setCurrentHeading("");
          setCharIndex(0);
        }, switchingDelay);
      }
    }, typingSpeed);

    return () => clearTimeout(typeEffect);
  }, [charIndex, fullHeading]);

  useEffect(() => {
    setFullHeading(headings[index]);
  }, [index]);

  return (
    <section className="py-32 bg-purple-50 font-[Quicksand]" id="hero">
      <div className="overflow-hidden ">
        <div className="container mx-auto">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 mt-20 text-4xl font-semibold text-indigo-900 lg:text-6xl">
                {currentHeading}
                <span className="animate-pulse">|</span>
              </h1>
              <p className="mx-auto max-w-screen-md text-black lg:text-xl font-serif overflow-hidden inline-block">
                {Array.from("Create custom testimonial links with questions, share them with your customers, and gather valuable feedback. Unlock features like video testimonials, insight graphs, and more to grow your business. ").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block animate-typing opacity-0 text-black font-sans rounded-sm"
                    style={{
                      animationDelay: `${index * 0.09}s`,
                      animationIterationCount: "infinite",
                      animationDuration: "30s",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-4 sm:flex-row">
                <Button className="cursor-pointer bg-gradient-to-r from-fuchsia-600 to-rose-400 text-white font-semibold shadow-pink-300 shadow-lg hover:shadow-xl rounded-full px-8 py-4 font-[Quicksand] text-lg transition-all duration-300 hover:scale-105" 
                onClick={() => window.location.href = "/dashboard"}>
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/80 text-gray-800 border-2 border-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 cursor-pointer rounded-full px-8 py-4 font-[Quicksand] text-lg shadow-md hover:shadow-lg"
                >
                  Learn more
                  <ChevronRight className="ml-2 h-5" />
                </Button>
              </div>
            </div>
          </div>
          {/* <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg"
          /> */}
        </div>
      </div>
    </section>
  );
};

export { Hero };
