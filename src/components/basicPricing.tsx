"use client";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const Pricing = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-pink-50 text-gray-900 font-mono"
      id="pricing"
    >
      <div className="w-full max-w-4xl text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Unlock Powerful Insights with Our Free Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Experience the core features of our platform absolutely free. No hidden costs, just powerful tools to get you started.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md flex flex-col justify-between">
            <div>
              <Badge className="mb-4 bg-emerald-500 text-white font-semibold uppercase text-xs tracking-wider w-fit">
                Free
              </Badge>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">₹0</span>
                <p className="text-sm text-gray-500 mt-1">Free as of now!</p>
              </div>
              <Separator className="my-4" />
              <ul className="mb-6 space-y-4 text-left text-gray-700">
                {[
                  "Unlimited Testimonials",
                  "Unlimited Spaces",
                  "AI Feedback Analysis",
                  "Visual Analytics",
                  "Customizable Widgets",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500 stroke-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="cursor-pointer w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 mt-2 rounded-md"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing };
