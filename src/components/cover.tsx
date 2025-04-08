"use client";
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

interface Hero1Props {
    badge?: string;
    heading: string;
    description: string;
    buttons?: {
        primary?: {
            text: string;
            url: string;
        };
        secondary?: {
            text: string;
            url: string;
        };
    };
    image: {
        src: string;
        alt: string;
    };
}

const Cover = ({
    heading = "Blocks Built With Shadcn & Tailwind",
    description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    image = {
        src: "/cover.png",
        alt: "Space section demo image",
    },
}: Hero1Props) => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
            
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-10 md:gap-16 items-center lg:grid-cols-2">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <motion.h1 
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.4 }}
                        className="italic mb-6 text-3xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-fuchsia-600 via-rose-500 to-blue-700 bg-clip-text text-transparent">
                        {heading}
                        </motion.h1>

                        <motion.p 
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.4 }}
                        className="mb-8 max-w-2xl text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed tracking-wide">
                            {description}
                        </motion.p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            {/* Example buttons if needed */}
                            {/* <Button>{buttons?.primary?.text}</Button>
                            <Button variant="outline">{buttons?.secondary?.text}</Button> */}
                        </div>
                    </div>

                    <motion.div
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                     className="flex justify-center">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full max-w-lg h-auto rounded-md object-cover shadow-md"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export { Cover };