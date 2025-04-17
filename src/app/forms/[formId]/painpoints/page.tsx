'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Frown } from 'lucide-react';

interface Response {
  questions: string[];
  answers: string[];
}

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const titleVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PainPointsPage({ params }: { params: Promise<{ formId: string }> }) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formId, setFormId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFormId = async () => {
      try {
        const resolvedParams = await params;
        setFormId(resolvedParams.formId);
      } catch {
        setError('Failed to resolve form ID.');
        setLoading(false);
      }
    };
    fetchFormId();
  }, [params]);

  useEffect(() => {
    const fetchAndProcessResponses = async () => {
      if (!formId) return;
      try {
        const responsesResponse = await fetch(`/api/forms/${formId}/responses`);
        if (!responsesResponse.ok) throw new Error('Failed to fetch user responses.');

        const responsesData: Response[] = await responsesResponse.json();
        const combinedStrings = responsesData.map((response) =>
          response.questions.map((q, i) => `Q: ${q}\nA: ${response.answers[i] ?? 'N/A'}`).join('\n\n')
        );

        const geminiResponse = await fetch('/api/gemini/painpoints', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionsAndAnswers: combinedStrings }),
        });

        if (!geminiResponse.ok) throw new Error('Failed to process feedback with AI.');

        const geminiResult = await geminiResponse.json();
        setResult(geminiResult.painPoints);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessResponses();
  }, [formId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#1d2671] to-[#c33764] text-white text-lg font-semibold animate-pulse">
        <Frown className="animate-spin size-10 mr-3" /> Analyzing pain points...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-medium bg-gray-900 min-h-screen">
        <Frown className="size-12 mx-auto mb-4" /> {error}
        {formId && (
          <Link href={`/forms/${formId}/ai-analysis`} className="mt-4 inline-block text-indigo-400 hover:underline">
            ← Back to AI Analysis
          </Link>
        )}
        {!formId && (
          <Link href="/dashboard" className="mt-4 inline-block text-indigo-400 hover:underline">
            ← Back to Dashboard
          </Link>
        )}
      </div>
    );

  const painPoints = result
    ? result
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => {
        const match = line.match(/^\*\s*(.*?):\s*(.*)/);
        if (match) {
          return {
            title: match[1].trim().slice(2).replace(/^[-\s]+/, ''),
            content: match[2].trim().slice(2).replace(/^[-\s]+/, ''),
          };
        }
        return null;
      })
      .filter((point): point is { title: string; content: string } => point !== null)
    : [];

  if (painPoints.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#00b09b] to-[#96c93d] text-white text-2xl font-semibold">
        <Frown className="size-10 mr-3" /> No significant pain points found. Users seem content.
        {formId && (
          <Link href={`/forms/${formId}/ai-analysis`} className="ml-6 text-indigo-400 hover:underline">
            ← Back to AI Analysis
          </Link>
        )}
        {!formId && (
          <Link href="/dashboard" className="ml-6 text-indigo-400 hover:underline">
            ← Back to Dashboard
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-16 bg-gradient-to-br from-[#1d2671] via-[#3a506b] to-[#c33764] text-white overflow-hidden font-sans">
      {/* Animated Background Circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] opacity-30 filter blur-xl pointer-events-none`}
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}

      {/* Animated Heading */}
      <div className="relative z-10 text-center mb-12">
        <motion.h1
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] text-transparent bg-clip-text"
        >
          <Frown className="inline-block mr-3 size-12 align-middle text-white" /> Key User Pain Points
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-lg md:text-xl text-gray-200 font-medium"
        >
          Understanding user frustrations to drive meaningful improvements.
        </motion.p>

        <motion.button
          onClick={() => router.push(`/forms/${formId}/ai-analysis`)}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer mt-8 px-6 py-3 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-[#6dd5ed] to-[#2193b0] hover:opacity-90 transition shadow-md text-white"
        >
          ← Back to AI Analysis
        </motion.button>
      </div>

      {/* Pain Point Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {painPoints.map((point, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            custom={index}
            className="bg-gradient-to-br from-[#2c3e50] to-[#3f4c6b] border-l-4 border-[#fc4a1a] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-[#f7b733] mb-3">
              <span className="mr-2 text-[#fc4a1a]">•</span> {point.title}
            </h3>
            <p className="text-sm text-gray-100 leading-relaxed">{point.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}