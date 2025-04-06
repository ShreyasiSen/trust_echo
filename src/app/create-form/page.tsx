'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CreateFormPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<string[]>(['']);
    const [message, setMessage] = useState('');
    const { user } = useUser();
    const userId = user?.id;
    console.log('User:', user); // Debugging line
    console.log('User ID:', userId); // Debugging line
    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                setMessage('Form created successfully!');
                setTitle('');
                setDescription('');
                setQuestions(['']);
                router.push('/dashboard'); // Redirect to the dashboard after form creation
            } else {
                setMessage('Failed to create form.');
            }
        } catch (err) {
            console.error('Error creating form:', err);
            setMessage('An error occurred.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create a Feedback Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Form Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter form title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Form Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter form description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Questions</label>
                    {questions.map((question, index) => (
                        <input
                            key={index}
                            type="text"
                            value={question}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                            placeholder={`Question ${index + 1}`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-2"
                            required
                        />
                    ))}
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                        + Add Question
                    </button>
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Form
                </button>
                {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
            </form>
        </div>
    );
}