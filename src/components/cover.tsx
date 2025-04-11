"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  { src: "/Cover1.png", alt: "Screenshot 1" },
  { src: "/Cover2.png", alt: "Screenshot 2" },
  { src: "/Cover3.png", alt: "Screenshot 3" },
  { src: "/Cover4.png", alt: "Screenshot 4" },
];

const Cover = () => {
  const [selectedImage, setSelectedImage] = useState<null | { src: string; alt: string }>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const scrollAmount = 1.5; // Smoother, slower movement
  const scrollDelay = 16;   // ~60fps; increase to slow more

  const startScrolling = useCallback(() => {
    if (scrollRef.current) {
      scrollInterval.current = setInterval(() => {
        const el = scrollRef.current;
        if (el) {
          el.scrollLeft += scrollAmount;
          if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
            el.scrollLeft = 0; // Loop back to start
          }
        }
      }, scrollDelay);
    }
  }, []);

  const stopScrolling = () => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
  };

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, [startScrolling]);

  return (
    <section className="flex items-center justify-center py-12 overflow-hidden">
      <div className="relative w-full max-w-5xl">
        {/* Gradient Fades */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex gap-6 w-max max-w-full overflow-x-scroll px-8"
          onMouseEnter={stopScrolling}
          onMouseLeave={startScrolling}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...images, ...images].map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              onClick={() => setSelectedImage(image)}
              className="h-[200px] sm:h-[250px] lg:h-[280px] w-auto object-contain cursor-pointer rounded-xl border border-black/10 bg-white/70 ring-1 ring-black/10 shadow-md hover:scale-105 hover:contrast-110 transition duration-300"
              style={{ flexShrink: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
          >
            <div className="relative max-w-6xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 bg-black text-white rounded-full p-2 cursor-pointer transition"
              >
                <X size={20} />
              </button>

              <motion.img
                src={selectedImage.src}
                alt={selectedImage.alt}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbar on Webkit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export { Cover };
