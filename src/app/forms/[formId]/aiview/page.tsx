'use client';

import { useRouter } from 'next/navigation';
import { useState ,useEffect} from 'react';
import { Frown, Smile, BarChart2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const aiOptions = [
    {
        title: 'Pain Points',
        description:
            'Identify the key challenges and issues faced by customers based on their feedback.',
        icon: <Frown className="size-6 text-red-500" />,
        bgColor: 'from-red-400 to-red-600',
        route: 'painpoints',
    },
    {
        title: 'Positives',
        description:
            'Highlight the strengths and positive aspects appreciated by customers.',
        icon: <Smile className="size-6 text-green-500" />,
        bgColor: 'from-green-400 to-green-600',
        route: 'positives',
    },
    {
        title: 'Sentiment Analysis',
        description:
            'Understand the overall sentiment of customer feedback: positive, negative, or neutral.',
        icon: <BarChart2 className="size-6 text-purple-500" />,
        bgColor: 'from-purple-400 to-purple-600',
        route: 'sentiment',
    },
];

const AIAnalysisPage = ({ params }: { params: Promise<{ formId: string }> }) => {
    const [formId, setFormId] = useState<string | null>(null);
    useEffect(() => {
        const fetchFormId = async () => {
            const resolvedParams = await params; // Await the params Promise to extract formId
            setFormId(resolvedParams.formId);
        };
        fetchFormId();
    }, [params]);
    const router = useRouter();
    const [description, setDescription] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleUpdateDescription = async () => {
        try {
            const response = await fetch(`/api/forms/${formId}/update-description`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });

            if (response.ok) {
                alert('Description updated successfully!');
                setIsModalOpen(false); // Close the modal after successful update
            } else {
                alert('Failed to update description. Please try again.');
            }
        } catch (error) {
            console.error('Error updating description:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div>
            <nav className="flex justify-between items-center py-4 bg-white/80 shadow-md backdrop-blur-sm px-6 rounded-lg">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    Fide<span className="text-blue-600">Feed</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>
            <section className="py-20 bg-pink-50">

                <div className="container mx-auto px-6">
                    {/* Navbar */}


                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mt-8"
                    >
                        <h1 className="text-5xl font-extrabold text-gray-800 md:text-6xl">
                            AI-Powered Insights
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 md:text-xl">
                            Unlock the power of AI to analyze customer feedback and drive
                            meaningful improvements.
                        </p>
                    </motion.div>

                    {/* Update Description Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 flex justify-center"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                            Update Company Description
                        </button>
                    </motion.div>

                    {/* AI Options Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {aiOptions.map((option, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative flex flex-col items-center justify-between rounded-lg p-6 shadow-lg bg-gradient-to-br ${option.bgColor} text-white`}
                                onClick={() => router.push(`/forms/${formId}/${option.route}`)}
                            >
                                {/* Icon */}
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                                    {option.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold">{option.title}</h3>

                                {/* Description */}
                                <p className="mt-2 text-center text-white/90">
                                    {option.description}
                                </p>

                                {/* Motion Effect */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-white opacity-0 transition-opacity hover:opacity-10"></div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Modal for Updating Description */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                                >
                                    <X size={20} />
                                </button>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">
                                    Update Company Description
                                </h2>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter your company description here..."
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                ></textarea>
                                <div className="mt-4 flex justify-end gap-4">
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
                            </div>
                        </div>
                    )}
                </div>
            </section >
        </div>

    );
};

export default AIAnalysisPage;