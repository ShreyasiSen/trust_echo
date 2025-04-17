'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        duration: 0.7,
        delay: i * 0.1,
        ease: 'easeOut',
      },
    }),
  };
  
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const floatingCircleVariants = {
    initial: {
      x: 0,
      y: 0,
      scale: 0.5,
      opacity: 0,
    },
    animate: {
      x: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0], // Random horizontal movement
      y: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0], // Random vertical movement
      scale: [0.5, 1, 1, 0.5],
      opacity: [0, 0.8, 0.8, 0],
      transition: {
        duration: Math.random() * 4 + 3, // Random duration for each circle
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
        delay: Math.random() * 1, // Slight random delay for staggered effect
      },
    },
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
                setError('Failed to resolve form ID');
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
                if (!responsesResponse.ok) {
                    throw new Error('Failed to fetch responses');
                }

                const responsesData: Response[] = await responsesResponse.json();
                const combinedStrings = responsesData.map((response) =>
                    response.questions
                        .map((q, i) => `Q: ${q}\nA: ${response.answers[i] ?? 'N/A'}`)
                        .join('\n\n')
                );

                const geminiResponse = await fetch('/api/gemini/positives', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ questionsAndAnswers: combinedStrings }),
                });

                if (!geminiResponse.ok) {
                    throw new Error('Failed to process data with Gemini API');
                }

                const geminiResult = await geminiResponse.json();
                setResult(geminiResult.painPoints);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An error occurred while processing responses');
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessResponses();
    }, [formId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#00b09b] to-[#96c93d] text-white text-lg font-semibold animate-pulse">
              <Smile className="animate-spin size-10 mr-3" /> Analyzing positive feedback...
            </div>
          );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500 font-medium bg-gray-900 min-h-screen">
              <Smile className="size-12 mx-auto mb-4" /> {error}
              {formId && (
                <Link href={`/forms/${formId}/ai-analysis`} className="mt-4 inline-block text-teal-400 hover:underline">
                  ← Back to AI Analysis
                </Link>
              )}
              {!formId && (
                <Link href="/dashboard" className="mt-4 inline-block text-teal-400 hover:underline">
                  ← Back to Dashboard
                </Link>
              )}
            </div>
        );
    }

    const painPoints = result
        ? result
            .split('\n')
            .filter((line) => line.trim() !== '')
            .map((line) => {
                const match = line.match(/^\*\s*(.*?):\s*(.*)/);
                if (match) {
                    return {
                        title: match[1].trim(),
                        content: match[2].trim(),
                    };
                }
                return null;
            })
            .filter((point): point is { title: string; content: string } => point !== null)
        : [];
    painPoints.map((point => {
        point.title = point.title.slice(2);
        point.content = point.content.slice(2);
    }))

    if (painPoints.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#00b09b] to-[#96c93d] text-white text-2xl font-semibold">
        <Smile className="size-10 mr-3" /> No positive feedback identified yet.
        {formId && (
          <Link href={`/forms/${formId}/ai-analysis`} className="ml-6 text-teal-400 hover:underline">
            ← Back to AI Analysis
          </Link>
        )}
        {!formId && (
          <Link href="/dashboard" className="ml-6 text-teal-400 hover:underline">
            ← Back to Dashboard
          </Link>
        )}
      </div>
        );
    }
    return (
        <div className="relative min-h-screen px-6 py-16 bg-gradient-to-br from-[#a18cd1] via-[#fbc2eb] to-[#a6c0fe] text-white overflow-hidden font-sans">
      {/* Animated Background Floating Circles */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-10 filter blur-xl pointer-events-none"
          style={{
            width: `${Math.random() * 80 + 30}px`,
            height: `${Math.random() * 80 + 30}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
          variants={floatingCircleVariants}
          initial="initial"
          animate="animate"
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`secondary-${i}`}
          className="absolute rounded-full bg-cyan-200 opacity-10 filter blur-xl pointer-events-none"
          style={{
            width: `${Math.random() * 100 + 40}px`,
            height: `${Math.random() * 100 + 40}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
          variants={floatingCircleVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: Math.random() * 1 }}
        />
      ))}

      {/* Animated Heading */}
      <div className="relative z-10 text-center mb-12">
        <motion.h1
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-800"
        >
          <Smile className="inline-block mr-3 size-10 align-middle" /> What Users Love
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-lg md:text-xl text-gray-800 font-medium"
        >
          Shining a spotlight on the positive feedback we&#39;ve received.
        </motion.p>

        <motion.button
          onClick={() => router.push(`/forms/${formId}/ai-analysis`)}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer mt-8 px-6 py-3 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] hover:opacity-90 transition shadow-md text-indigo-900"
        >
          ← Back to AI Analysis
        </motion.button>
      </div>

      {/* Positive Feedback Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {painPoints.map((point, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            custom={index}
            className="bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] border-l-4 border-[#2980b9] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-[#2980b9] mb-3">
            <span className="mr-2 text-black">•</span> {point.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{point.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
    );
}
