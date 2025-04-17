'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Frown, Smile, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const aiOptions = [
  {
    title: 'Pinpoint User Frustrations',
    description:
      'Analyze user interactions to detect where they get stuck, confused, or drop off. This helps you address the most pressing pain points and enhance overall usability and satisfaction.',
    icon: <Frown className="size-9 text-red-400 stroke-2" />,
    bgColor: 'from-red-100 to-red-400',
    shadowColor: 'shadow-red-100',
    route: 'painpoints',
  },
  {
    title: 'Highlight Positive Feedback',
    description:
      'Uncover the most appreciated features, delightful moments, and standout experiences that make users smile—so you can keep doing more of what works and reinforce brand loyalty.',
    icon: <Smile className="size-9 text-green-400 stroke-2" />,
    bgColor: 'from-green-100 to-green-400',
    shadowColor: 'shadow-green-100',
    route: 'positives',
  },
];

const AIAnalysisPage = ({ params }: { params: Promise<{ formId: string }> }) => {
  const [formId, setFormId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFormId = async () => {
      const resolvedParams = await params;
      setFormId(resolvedParams.formId);
    };
    fetchFormId();
  }, [params]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    tap: { scale: 0.98 },
  };

  const headerVariants = {
    initial: { opacity: 0, y: -15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const backButtonVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: aiOptions.length * 0.15 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    tap: { scale: 0.97 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-orange-50 to-blue-300 text-slate-700 font-sans flex items-center justify-center px-4 py-2 overflow-hidden">
      <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md z-0" />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="initial"
          animate="animate"
          className="text-center mb-8 md:mb-10" // Reduced mb
        >
          {/* Sleek Icon Animation */}
          <div className="relative inline-block">
            <Lightbulb className="mx-auto size-12 text-indigo-800 mb-3 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-indigo-100/30 dark:bg-indigo-900/30 blur-lg animate-orbit" />
          </div>

          {/* Modern Typography */}
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-indigo-700 dark:text-indigo-300 font-serif leading-tight">
            {/* Gradient Text with Subtle Shine */}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
              Illuminate Insights,
            </span>
            <br className="hidden sm:block" />
            <span className="text-slate-700 dark:text-slate-200">
              Drive Decisive Action.
            </span>
          </h1>

          {/* Concise and Impactful Subheadline */}
          <p className="mt- text-lg sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium leading-relaxed tracking-normal">
            Unleash the power of AI to transform raw feedback into clear pathways for growth and enhanced user experiences.
          </p>
        </motion.div>

        {/* Cards */}
        <section className="relative grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 place-items-center py-8 md:py-4 overflow-hidden"> {/* Reduced py */}
          {/* Abstract Background Shapes */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse duration-75" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-bl from-teal-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-150 duration-75" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-300 duration-75" />
          </div>

          {aiOptions.map((option, idx) => (
            <motion.div
              key={idx}
              onClick={() => router.push(`/forms/${formId}/${option.route}`)}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={idx}
              className="relative z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border-0 overflow-hidden w-full max-w-md transition-transform duration-300 hover:scale-105"
            >
              {/* Card Header */}
              <div className={`py-5 px-6 bg-gradient-to-r ${option.bgColor} text-white flex items-center space-x-4`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 shadow-inner">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight font-mono text-black">{option.title}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-md text-slate-600 dark:text-slate-400 leading-relaxed">{option.description}</p>
              </div>

              {/* Card Footer */}
              <div className="py-4 px-6 text-right">
                <button className="cursor-pointer inline-flex items-center font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Dive In
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Back Button */}
        <motion.div
          variants={backButtonVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center mt-4" // Adjusted mt
        >
          <Link href="/dashboard">
            <button className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-300 bg-white/70 shadow text-slate-600 font-mono hover:bg-blue-300 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L7.414 11H15a1 1 0 110 2H7.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Dashboard
            </button>
          </Link>
        </motion.div>
      </div>
      
    </div>
  );
};

export default AIAnalysisPage;

<style jsx>
  {`
    @keyframes pulse {
      0%,
      100% {
        opacity: 0.8;
      }
      50% {
        opacity: 0.4;
      }
    }

    @keyframes orbit {
      0% {
        transform: translate(-50%, -50%) rotate(0deg) scale(1);
        opacity: 0.6;
      }
      50% {
        transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
        opacity: 0.8;
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg) scale(1);
        opacity: 0.6;
      }
    }

    .text-gradient {
      background-image: linear-gradient(to right, #6366f1, #3b82f6);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}
</style>