"use client";
import React from "react";

export default function Video() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-pink-50 px-6 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Smart by Design,<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-pink-600">Powered </span>
            <span>by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-pink-600"> AI</span>
          </h1>

          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              At <span className="font-semibold text-fuchsia-600">FideFeed</span>, we make it effortless for
              <span className="font-medium italic"> small businesses, freelancers, and creators</span> to collect and showcase
              authentic customer testimonials — <span className="italic">no tech skills or website required</span>.
            </p>
            <p>
              <span className="text-gray-900 font-bold">Our mission</span> is simple:
              <span className="font-medium text-gray-900"> help you build trust</span> through real stories that speak for your brand.
              Whether you&apos;re a <span className="font-medium">local brand</span> or a <span className="font-medium">solo creator</span>,
              FideFeed turns your happy customers into your most powerful marketing tool.
            </p>
          </div>
        </div>

        {/* Right Video Placeholder */}
        <div className="md:w-1/2 w-full p-6 flex items-center justify-center min-h-[350px] md:min-h-[420px] bg-white rounded-2xl shadow-md border border-fuchsia-100 relative transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/uCrv7rg4zzo"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-fuchsia-300 rounded-full opacity-20 blur-3xl z-0"></div>
        </div>
      </div>
    </section>
  );
}
