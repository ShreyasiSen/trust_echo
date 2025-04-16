
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Frown, Smile } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const aiOptions = [
    {
        title: 'Pain Points',
        description: 'Discover the top concerns and recurring frustrations your users face.',
        icon: <Frown className="size-6 text-rose-600" />,
        bgColor: 'from-red-300 via-rose-200 to-red-100',
        route: 'painpoints',
    },
    {
        title: 'Positives',
        description: 'Uncover the most celebrated strengths highlighted in user feedback.',
        icon: <Smile className="size-6 text-green-600" />,
        bgColor: 'from-green-200 via-green-100 to-lime-100',
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-100 to-white text-black">
            {/* Header */}
            <div className="text-center pt-8">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-md">
                    AI-Powered Feedback Insights
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                    Dive deep into customer sentiment and unlock hidden opportunities.
                </p>
            </div>

            {/* Clickable Cards with Smooth Pop-Out Animation */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid gap-10 md:grid-cols-2">
                        {aiOptions.map((option, idx) => (
                            <motion.div
                                key={idx}
                                onClick={() => router.push(`/forms/${formId}/${option.route}`)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: idx * 0.1,
                                    duration: 0.5,
                                    ease: [0.25, 0.8, 0.25, 1], // Ease function for smooth transition
                                }}
                                className={`bg-gradient-to-br ${option.bgColor} rounded-3xl p-8 cursor-pointer flex flex-col items-center text-center max-w-md mx-auto border border-white/70 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition duration-300`}
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/60 shadow-inner">
                                    {option.icon}
                                </div>
                                <h3 className="text-2xl font-semibold">{option.title}</h3>
                                <p className="mt-2 text-base text-gray-800">{option.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fancy Back Button */}
            <div className="mt-10 flex justify-center">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-300 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100 text-black font-medium shadow-md hover:shadow-lg hover:from-pink-200 hover:to-pink-300 transition-all duration-300"
                >
                    ← Return to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default AIAnalysisPage;
