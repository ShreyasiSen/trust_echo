"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const screenshots = [
  "/S5.png",
  "/S3.png",
  "/S2.png",
  "/S1.png",
  "/S6.png",
  "/S4.png",
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Speciality = () => {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-blue-50 py-24 flex flex-col items-center" id="testimonials">
      {/* Fancy Title */}
      <div className="text-center mb-12 px-6 text-black max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight">
          Add testimonials to your site with{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            zero coding
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 rounded-full" />
        <p className="text-lg text-gray-700">
          Paste our HTML snippet and embed your Wall Of Love instantly.
          Works on Webflow, WordPress — you name it!
        </p>
      </div>

      {/* Masonry Grid with Style */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 px-4 md:px-12 w-full max-w-6xl space-y-6">
        {screenshots.map((src, i) => (
          <motion.div
            key={i}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
          >
            <Card className="break-inside-avoid rounded-xl bg-white/70 backdrop-blur-lg border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 hover:border-blue-400 overflow-hidden p-0">
              <Image
                src={src}
                alt={`screenshot-${i}`}
                width={800}
                height={600}
                layout="responsive"
                className="w-full h-auto object-cover"
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export { Speciality };
