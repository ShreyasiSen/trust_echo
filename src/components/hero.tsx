"use client";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-pink-50 to-blue-50 font-sans mt-18" id="hero">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          {/* Headline */}
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 font-serif">
          Build trust with real <br />
            <span> customer stories.</span>
          </h1>
          {/* Subtext */}
          <p className="text-xl text-gray-700 mb-1 font-[Poppins]">
          Collect, manage, and beautifully showcase testimonials — powered by AI. 
          </p>
          <p className="text-xl text-gray-600 mb-8  font-[Poppins]">
          Whether you have a website or not, FideFeed helps you turn happy customers into your most convincing marketers.
          </p>

          {/* CTA */}
          <Button
            className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-fuchsia-500 to-rose-400 hover:from-rose-400 hover:to-fuchsia-500 border-pink-600 border-2 text-white font-semibold px-6 py-6 rounded-sm text-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Get started for FREE
            <span className="absolute inset-0 bg-white opacity-10 transition-opacity duration-300 rounded-full hover:opacity-20"></span>
          </Button>


          {/* Sub-caption */}
          <p className="text-sm text-gray-500 mt-4">
            It&apos;s 100% free to start.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Hero };
