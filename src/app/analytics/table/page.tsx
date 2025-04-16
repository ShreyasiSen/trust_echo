'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { HiArrowLeft, HiChartBar } from 'react-icons/hi'; // Added icons

interface Form {
    id: string;
    name: string;
    avgRating: number;
    totalResponses: number;
    spamPercentage: number;
    avgResponseLength: number;
}

export default function FormComparisonPage() {
    const { user, isLoaded } = useUser();
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFormsData = async () => {
            try {
                const response = await fetch(`/api/forms/compare?clerkUserId=${user?.id}`);
                if (!response.ok) throw new Error('Failed to fetch forms data');

                const data = await response.json();
                setForms(data);
            } catch (error) {
                console.error('Error fetching forms data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded && user) {
            fetchFormsData();
        }
    }, [isLoaded, user]);

    if (!isLoaded || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
                <div className="text-lg animate-pulse">Loading user data...</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
                <div className="text-lg animate-pulse">Loading forms...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-950 to-black text-white px-6 py-10">
            <div className="max-w-7xl mx-auto">
                {/* Header Section with Buttons */}
                <div className="flex justify-between items-center mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-lg text-blue-300 font-semibold hover:underline transition duration-300"
                    >
                        <HiArrowLeft className="text-xl" /> {/* Added icon */}
                        Back to Dashboard
                    </Link>
                    <Link
                        href="/analytics"
                        className="inline-flex items-center gap-2 text-lg text-blue-300 font-semibold hover:underline transition duration-300"
                    >
                        Go to Graph Analytics
                        <HiChartBar className="text-xl" /> {/* Added icon */}
                    </Link>
                </div>

                <h1 className="text-5xl font-extrabold 
        text-pink-200  drop-shadow-lg text-center">
                    📊 Compare Your Forms: Insights at a Glance
                </h1>
                <p className="mt-4 text-xl text-gray-300 text-center max-w-2xl mx-auto">
                    Dive deep into your form data, track performance, and make informed decisions with detailed comparisons.
                </p>

                {/* Form Comparison Table */}
                <div className="overflow-x-auto bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg mt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-300 drop-shadow">Form Comparison</h2>
                    <table className="min-w-full table-auto text-white border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-left border-b text-lg font-semibold">Form Name</th>
                                <th className="px-6 py-4 text-left border-b text-lg font-semibold">Avg Rating</th>
                                <th className="px-6 py-4 text-left border-b text-lg font-semibold">Total Responses</th>
                                <th className="px-6 py-4 text-left border-b text-lg font-semibold">Spam %</th>
                                <th className="px-6 py-4 text-left border-b text-lg font-semibold">Avg Response Length</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map((form) => (
                                <tr key={form.id} className="hover:bg-blue-700/20 transition-colors">
                                    <td className="px-6 py-4 border-b">{form.name}</td>
                                    <td className="px-6 py-4 border-b">{form.avgRating.toFixed(2)}</td>
                                    <td className="px-6 py-4 border-b">{form.totalResponses}</td>
                                    <td className="px-6 py-4 border-b">{form.spamPercentage}%</td>
                                    <td className="px-6 py-4 border-b">{form.avgResponseLength}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
