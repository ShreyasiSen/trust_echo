"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    subtitle: "Multiple layout options ",
    title: "Layouts to showcase your testimonials",
    desc: "Choose from multiple layouts to display your testimonials. Customize the look and feel to match your brand.",
    cta: "Try it for free",
    image: "/F1.png",
  },
  {
    subtitle: "Easy to manage",
    title: "A dashboard to manage all testimonials",
    desc: "Manage all your testimonials in one place. It's like your inbox but designed for social proof!",
    cta: "Try it for free",
    image: "/F2.png",
  },
  {
    subtitle: "Ai insights",
    title: "AI-powered insights",
    desc: "Get insights into your testimonials with AI-powered insights. Understand what your customers are saying and how they feel,including positives and negatives.",
    cta: "Try it for free",
    image: "/F3.jpeg",
  },
  {
    subtitle: "Integrated analytics dashboard",
    title: "Analytics dashboard to track performance",
    desc: "Track the performance of your testimonials with our integrated analytics dashboard. Summarize performance of products. See how they impact your business.",
    cta: "Try it for free",
    image: "/F4.jpg",
  },
  {
    subtitle: "Seamless experience",
    title: "Let your users easily submit testimonials",
    desc: "With just a link, users can submit feedback, no sign-up required.",
    cta: "Try it for free",
    image: "/F5.jpeg",
  },
  {
    subtitle: "Customizable",
    title: "Customizable and embeddable",
    desc: "Easily embed testimonials on your website with just a few lines of code. Customize the look and feel to match your brand.",
    cta: "Try it for free",
    image: "/F6.png",
  },
];

const Feature = () => {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-pink-50 text-gray-800 relative overflow-hidden"
      id="features"
    >


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 space-y-28 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-[Playfair Display] text-gray-900">
          What makes us <span className="text-pink-500">different?</span>
        </h2>

        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid md:grid-cols-2 gap-16 md:gap-x-24 items-center"
          >
            {/* Text Block */}
            <div
              className={`rounded-3xl px-6 py-8 md:px-8 md:py-12 transition duration-300 ${
                index % 2 === 1 ? "md:order-2" : "md:order-1"
              }`} // Added background and shadow
            >
              <p className="text-sm text-fuchsia-600 font-semibold uppercase tracking-wider mb-3">
                {feature.subtitle}
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold mb-5 font-[Quicksand] text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed font-[Inter]">
                {feature.desc}
              </p>
              <Link href="/dashboard">
                <button
                  className="cursor-pointer bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-transform hover:shadow-md" // Added hover effect
                >
                  {feature.cta}
                </button>
              </Link>
            </div>

            {/* Image Block */}
            <div
              className={`rounded-3xl overflow-hidden shadow-2xl ${
                index % 2 === 1 ? "md:order-1" : "md:order-2"
              }`}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-3xl transition-all duration-300 hover:scale-105" // Added hover effect
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export { Feature };