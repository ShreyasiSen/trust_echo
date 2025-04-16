"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Contact = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-pink-50 py-20 px-6" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-gray-800 mb-4"
        >
          Connect with Us
        </motion.h2>

        <motion.p
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Interested in partnering or have questions? We’d love to hear from you.
          Just drop us a line at{" "}
          <a
            href="mailto:justaisehi03@example.com"
            className="text-indigo-600 font-medium underline hover:text-purple-600"
          >
            fidefeed25@gmail.com
          </a>
          .
        </motion.p>

        
      </div>
    </section>
  );
};

export { Contact };
