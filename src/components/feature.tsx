"use client";

import { Timer, Zap, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

const Feature = () => {
  const features = [
    {
      icon: <Timer className="size-6 text-white" />,
      title: "Customizable Links",
      desc: "Create personalized testimonial links with tailored questions to gather meaningful feedback from your customers.",
      color: "from-fuchsia-500 to-rose-400",
    },
    {
      icon: <ZoomIn className="size-6 text-white" />,
      title: "Video Testimonials",
      desc: "Collect video testimonials from your customers to add a personal and authentic touch to your feedback.",
      color: "from-pink-500 to-violet-400",
    },
    {
      icon: <Zap className="size-6 text-white" />,
      title: "Insightful Analytics",
      desc: "Gain actionable insights with detailed graphs and analytics to understand customer sentiment and improve your services.",
      color: "from-rose-500 to-orange-400",
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-b mt-20 from-pink-50 via-purple-100 to-purple-50" id="features">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold font-[Playfair Display] text-black mb-16">Why Choose Us?</h2>
        <div className="grid gap-10 lg:grid-cols-3">
          {features.map(({ icon, title, desc, color }, index) => (
            <div
              key={index}
              className={`group relative transform rounded-3xl p-8 shadow-xl transition-all duration-500 bg-white bg-opacity-70 backdrop-blur-lg border border-gray-200`}
            >
              <span className={`mb-6 flex size-14 items-center justify-center rounded-full bg-gradient-to-br ${color} shadow-lg`}>
                {icon}
              </span>
              <h3 className="mb-3 text-2xl font-semibold font-[Quicksand] text-gray-800">{title}</h3>
              <p className="text-gray-600 font-[Inter] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export { Feature };