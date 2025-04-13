'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Header2 } from '@/components/header2';
import { toast } from 'sonner';

export default function CreateFormPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<string[]>(['']);
    const [submitting, setSubmitting] = useState(false); // State to track form submission
    const { user } = useUser();
    const userId = user?.id;

    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };

    const handleDeleteQuestion = (index: number) => {
        if (questions.length === 1) return; // Prevent deleting the last question
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true); // Disable the button while submitting
        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    title,
                    description,
                    questions,
                }),
            });

            if (response.ok) {
                toast.success(' Your product has been created!', {
                    style: { color: 'green' }, 
                });
                setTitle('');
                setDescription('');
                setQuestions(['']);
                router.push('/dashboard');
            } else {
                toast.error(' Your product was not created.', {
                    style: { color: 'red' }, 
                });
            }
        } catch (err) {
            console.error('Error creating form:', err);
            toast.error('⚠️ An error occurred while creating your product.', {
                style: { color: 'red' }, 
            });
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <div>
            <Header2 />
            <div className="h-16"></div> {/* Spacer for fixed header */}
            <div className="relative w-full min-h-screen">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center brightness-100"
                    style={{ backgroundImage: "url('/feedback4.jpg')" }}
                />

                {/* 🧾 Feedback Form Content */}
                <div className="relative z-10 flex items-center justify-center px-4 py-24">
                    <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden">

                        {/* 📢 Left Panel */}
                        <div className="bg-purple-200 text-black md:w-1/2 w-full p-10 flex flex-col justify-center relative">

                            {/* Go to Dashboard link */}
                            <a
                                href="/dashboard"
                                className="absolute top-4 left-4 text-indigo-700 hover:text-indigo-900 font-semibold text-xl underline flex items-center gap-1"
                            >
                                Go to Dashboard →
                            </a>

                            {/* Feedback Matters section */}
                            <div className="flex items-center mb-4 mt-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-indigo-600 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z"
                                    />
                                </svg>
                                <h2 className="text-3xl font-bold text-indigo-700">Feedback Matters</h2>
                            </div>

                            <p className="text-gray-700 text-base mt-2 leading-relaxed">
                                Create custom feedback forms to gather valuable insights from your customers.
                            </p>
                        </div>

                        {/* 📝 Right Panel (Form) */}
                        <div className="md:w-1/2 w-full p-10 md:p-14">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="bg-indigo-500 p-3 rounded-full shadow-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h1 className="mt-4 text-2xl font-bold text-gray-800 tracking-wide">
                                        Create <span className="text-indigo-600">Feedback Form</span>
                                    </h1>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Form Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Your awesome form title..."
                                        className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-3 text-sm"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="What is this form about?"
                                        className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-3 text-sm"
                                        rows={3}
                                    />
                                </div>

                                {/* Questions */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Questions</label>
                                    {questions.map((question, index) => (
                                        <div key={index} className="flex items-center gap-2 mb-4">
                                            <input
                                                type="text"
                                                value={question}
                                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                placeholder={`Question ${index + 1}`}
                                                className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-3 text-sm"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteQuestion(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddQuestion}
                                        className="text-sm text-indigo-600 hover:underline mt-2 cursor-pointer"
                                    >
                                        + Add another question
                                    </button>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className={`w-full py-2 text-lg font-semibold text-white rounded-xl shadow-md transition cursor-pointer ${
                                        submitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 hover:bg-indigo-700'
                                    }`}
                                    disabled={submitting} // Disable button while submitting
                                >
                                    {submitting ? 'Creating...' : 'Create Form'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-pink-50 text-black py-4 text-center">
                <p>&copy; 2025 FideFeed. All rights reserved.</p>
            </footer>
        </div>
    );
}