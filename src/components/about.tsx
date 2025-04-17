"use client";
import React from "react";
import { LightBulbIcon, ShareIcon, ChatBubbleBottomCenterTextIcon, SparklesIcon } from "@heroicons/react/24/solid";

const steps = [
  {
    title: "1. Create a Testimonial Page",
    desc: "Set up a space where customers can drop their feedback, in their own words and voice.",
    icon: LightBulbIcon,
  },
  {
    title: "2. Share the Link",
    desc: "Send your unique testimonial link via WhatsApp, Instagram DMs, email, or anywhere else you connect with customers.",
    icon: ShareIcon,
  },
  {
    title: "3. Collect Responses",
    desc: "Get honest testimonials — written, audio, or even video — all stored in one place on your dashboard.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    title: "4. Showcase with Confidence",
    desc: "Curate the best stories and display them anywhere — on your website, social media, or portfolio — with no coding required.",
    icon: SparklesIcon,
  },
];

export default function AboutUs() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-pink-50 text-gray-900" id="about">
      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">How <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-pink-600">FideFeed</span> Works</h2>
          <p className="text-lg text-gray-600 mt-4 italic">Getting started is as easy as<span className="text-purple-500 font-semibold"> 1-2-3-4</span>:</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-14 max-w-6xl mx-auto px-4">
          {steps.map(({ title, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-5 bg-white rounded-xl shadow-md p-6 border border-fuchsia-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-3 bg-fuchsia-100 rounded-full text-fuchsia-700">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fuchsia-700">{title}</h3>
                <p className="text-gray-700 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-12  px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold tracking-tight text-gray-800">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-pink-600">
              Mission
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-700 leading-relaxed">
            To <span className="font-semibold text-gray-900">empower every business</span>, big or small, to build
            authentic trust through the voices of{" "}
            <span className="italic text-gray-800">real customers</span>.
          </p>
          <p className="mt-4 text-xl text-gray-700 leading-relaxed">
            We&apos;re here to <span className="font-medium text-gray-900">simplify testimonials</span> — turning them into your brand&apos;s{" "}
            <span className="text-black font-semibold">most impactful growth engine</span>.
          </p>
        </div>

        {/* Optional CTA */}
        <div className="mt-12">
          <a
            href="/dashboard"
            className="inline-block px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white font-semibold rounded-xl shadow-md hover:from-rose-400 hover:to-fuchsia-500 transition duration-300"
          >
            Get Started for FREE
          </a>
        </div>
      </section>
    </main>
  );
}
