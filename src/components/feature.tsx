"use client";

import { Timer, Zap, ZoomIn } from "lucide-react";
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Feature = () => {
  return (
    <section className="py-10 bg-gradient-to-b mt-20 from-pink-50 via-purple-100 to-purple-50" id="features">

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        className="container mx-auto">
        <motion.h2
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="text-4xl font-bold font-[Playfair Display]  text-black mb-16">
          Why Choose Us?
        </motion.h2>
        <motion.div
          className="grid gap-10 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {[
            {
              icon: <Timer className="size-6 text-white" />,
              title: "Customizable Links",
              desc: "Create personalized testimonial links with tailored questions to gather meaningful feedback from your customers.",
              color: "from-fuchsia-500 to-rose-400"
            },
            {
              icon: <ZoomIn className="size-6 text-white" />,
              title: "Video Testimonials",
              desc: "Collect video testimonials from your customers to add a personal and authentic touch to your feedback.",
              color: "from-pink-500 to-violet-400"
            },
            {
              icon: <Zap className="size-6 text-white" />,
              title: "Insightful Analytics",
              desc: "Gain actionable insights with detailed graphs and analytics to understand customer sentiment and improve your services.",
              color: "from-rose-500 to-orange-400"
            },
          ].map(({ icon, title, desc, color }, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.3,
                    duration: 0.6,
                    ease: 'easeOut',
                  }
                }
              }}
              className={`
        group relative transform rounded-3xl p-8 shadow-xl transition-all duration-500 
        hover:rotate-[1deg] hover:scale-[1.05] hover:shadow-2xl 
        bg-white bg-opacity-70 backdrop-blur-lg border border-gray-200
        before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:blur-2xl before:opacity-30 
        before:content-[''] before:bg-gradient-to-br before:${color} 
        animate-float
      `}
            >
              <span
                className={`mb-6 flex size-14 items-center justify-center rounded-full bg-gradient-to-br ${color} shadow-lg shadow-${color.split(' ')[1]}-400/30 animate-pulse`}
              >
                {icon}
              </span>
              <h3 className="mb-3 text-2xl font-semibold font-[Quicksand] text-gray-800">
                {title}
              </h3>
              <p className="text-gray-600 font-[Inter] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/20 via-white to-white"></div>
    </section>
  );
};

export { Feature };