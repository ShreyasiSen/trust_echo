'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Frown, Smile, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const aiOptions = [
    {
        title: 'Pain Points',
        description: 'Identify the key challenges and issues faced by customers based on their feedback.',
        icon: <Frown className="size-6 text-red-500" />,
        bgColor: 'from-red-500 via-red-600 to-red-700',
        route: 'painpoints',
    },
    {
        title: 'Positives',
        description: 'Highlight the strengths and positive aspects appreciated by customers.',
        icon: <Smile className="size-6 text-green-500" />,
        bgColor: 'from-green-500 via-green-600 to-green-700',
        route: 'positives',
    },
];

const AIAnalysisPage = ({ params }: { params: Promise<{ formId: string }> }) => {
    const [formId, setFormId] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchFormId = async () => {
            const resolvedParams = await params;
            setFormId(resolvedParams.formId);
        };
        fetchFormId();
    }, [params]);

    const handleUpdateDescription = async () => {
        try {
            const response = await fetch(`/api/forms/${formId}/update-description`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });

            if (response.ok) {
                alert('Description updated successfully!');
                setIsModalOpen(false);
            } else {
                alert('Failed to update description. Please try again.');
            }
        } catch (error) {
            console.error('Error updating description:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-10"
            >
                <Link href={`/${formId}/ai-analysis`}>
                    <h1 className="text-5xl font-extrabold text-gray-800 hover:text-blue-600 transition duration-300 cursor-pointer">
                        💡 Key Insights from User Feedback
                    </h1>
                </Link>
                <p className="mt-4 text-lg text-gray-600">
                    Subtly surfacing the challenges and strengths that matter most.
                </p>
            </motion.div>

            {/* AI Options Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid gap-10 md:grid-cols-2 lg:grid-cols-2"
                    >
                        {aiOptions.map((option, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative flex flex-col items-center justify-between rounded-xl p-8 shadow-lg bg-gradient-to-br ${option.bgColor} text-white`}
                                onClick={() => router.push(`/forms/${formId}/${option.route}`)}
                            >
                                {/* Icon */}
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                                    {option.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold">{option.title}</h3>

                                {/* Description */}
                                <p className="mt-4 text-center text-white/90 text-lg">
                                    {option.description}
                                </p>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-white opacity-0 transition-opacity hover:opacity-10"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Modal for Updating Description */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Update Company Description
                        </h2>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter your company description here..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        ></textarea>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateDescription}
                                className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg hover:scale-105 transition-transform"
                            >
                                Update
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Bottom Actions Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6"
            >
                {/* Return to Dashboard */}
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 hover:bg-gray-200 transition rounded-full shadow-md font-semibold"
                >
                    <span>←</span> Return to Dashboard
                </Link>

                {/* Update Company Description */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition rounded-full shadow-md font-semibold"
                >
                    ✏️ Update Company Description
                </button>
            </motion.div>
        </div>
    );
};

export default AIAnalysisPage;