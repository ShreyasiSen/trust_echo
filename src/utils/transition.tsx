'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const transitionVariants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
};

const TransitionLayer = ({ delay, zIndex, bgColor }: { delay: number; zIndex: number; bgColor: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // Optional: margin tweak for earlier/later trigger

  return (
    <motion.div
      ref={ref}
      className={`fixed top-0 bottom-0 right-full w-screen h-screen z-${zIndex} ${bgColor}`}
      variants={transitionVariants}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{ delay, duration: 0.6, ease: 'easeInOut' }}
    />
  );
};

const Transition = () => {
  return (
    <>
      <TransitionLayer delay={0.2} zIndex={30} bgColor="bg-[#2e2257]" />
      <TransitionLayer delay={0.4} zIndex={20} bgColor="bg-[#3b2d71]" />
      <TransitionLayer delay={0.6} zIndex={10} bgColor="bg-[#4b3792]" />
    </>
  );
};

export default Transition;
