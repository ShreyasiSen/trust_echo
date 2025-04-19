'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { HiArrowLeft, HiChartBar } from 'react-icons/hi';
import { Button } from '@/components/ui/button'; // Assuming you have shadcn/ui or a similar component

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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] to-[#121212] text-gray-300">
                <div className="text-lg animate-pulse text-center">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 inline-block" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10s4.477 10 10 10v-4a8 8 0 01-8-8z"></path>
                    </svg>
                    Loading user data...
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] to-[#121212] text-gray-300">
                <div className="text-lg animate-pulse text-center">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 inline-block" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10s4.477 10 10 10v-4a8 8 0 01-8-8z"></path>
                    </svg>
                    Loading  tabular data
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-gray-200 px-6 py-10 relative overflow-hidden">
            <style jsx global>
                {`
                    @keyframes gradient-flow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    .bg-animated-gradient {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(270deg, #ff6a00, #ff4b7f, #ee2f73);
                        background-size: 300% 300%;
                        animation: gradient-flow 15s ease infinite;
                        opacity: 0.3;
                        z-index: -1;
                    }

                    @keyframes pulse-circles {
                        0% { transform: scale(1); opacity: 0.1; }
                        50% { transform: scale(1.2); opacity: 0.3; }
                        100% { transform: scale(1); opacity: 0.1; }
                    }

                    .bg-pulse-circle {
                        position: absolute;
                        border-radius: 50%;
                        background-color: rgba(250, 80, 100, 0.15); /* Subtle Red */
                        animation: pulse-circles 8s ease-in-out infinite alternate;
                        z-index: -1;
                    }

                    .circle-1 { width: 80px; height: 80px; top: 20%; left: 15%; }
                    .circle-2 { width: 120px; height: 120px; top: 60%; right: 10%; animation-delay: 1s; }
                    .circle-3 { width: 60px; height: 60px; bottom: 15%; left: 35%; animation-delay: 3s; }
                    .circle-4 { width: 100px; height: 100px; top: 10%; right: 30%; animation-delay: 5s; }
                    .circle-5 { width: 70px; height: 70px; bottom: 40%; right: 5%; animation-delay: 2s; }

                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(-15px); }  /* Increased transform */
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out forwards;
                    }

                    @keyframes slide-left {
                        from { transform: translateX(-30px); opacity: 0; } /* Increased transform */
                        to { transform: translateX(0); opacity: 1; }
                    }

                    .animate-slide-left {
                        animation: slide-left 0.3s ease-out forwards;
                    }

                    @keyframes slide-right {
                        from { transform: translateX(30px); opacity: 0; }  /* Increased transform */
                        to { transform: translateX(0); opacity: 1; }
                    }

                    .animate-slide-right {
                        animation: slide-right 0.3s ease-out forwards;
                    }

                    @keyframes slide-down {
                        from { transform: translateY(-30px); opacity: 0; } /* Increased transform */
                        to { transform: translateY(0); opacity: 1; }
                    }

                    .animate-slide-down {
                        animation: slide-down 0.3s ease-out forwards;
                    }

                    @keyframes slide-up {
                        from { transform: translateY(30px); opacity: 0; }    /* Increased transform */
                        to { transform: translateY(0); opacity: 1; }
                    }

                    .animate-slide-up {
                        animation: slide-up 0.3s ease-out forwards;
                    }
                `}
            </style>

            {/* Animated Gradient Background */}
            <div className="bg-animated-gradient"></div>

            {/* Pulsating Circles Background */}
            <div className="bg-pulse-circle circle-1"></div>
            <div className="bg-pulse-circle circle-2"></div>
            <div className="bg-pulse-circle circle-3"></div>
            <div className="bg-pulse-circle circle-4"></div>
            <div className="bg-pulse-circle circle-5"></div>

            <div className="max-w-7xl mx-auto relative z-10 animate-fade-in">
                {/* Header Section with Buttons */}
                <div className="flex justify-between items-center mb-8">
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="cursor-pointer text-black hover:text-blue-800 hover:bg-blue-200 border-gray-700 transition-all duration-300 flex items-center gap-2"
                        >
                            <HiArrowLeft className="text-xl transition-transform duration-300 transform animate-bounce-left" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/analytics">
                        <Button
                            variant="outline"
                            className="cursor-pointer text-black hover:text-blue-800 hover:bg-blue-200 border-gray-700 transition-all duration-300 flex items-center gap-2"
                        >
                            Graph Analytics
                            <HiChartBar className="text-xl transition-transform duration-300 transform" />
                        </Button>
                    </Link>
                </div>

                {/* Hero Section */}
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#ff6a00] to-[#ff4b7f] tracking-tight leading-tight drop-shadow-lg animate-slide-down">
                        Performance Insights
                    </h1>
                    <p className="mt-2 text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
                        Gain a comprehensive view of your forms&apos; performance. Compare key metrics to uncover trends, evaluate effectiveness, and pinpoint opportunities for optimization.
                    </p>

                </header>

                {/* Form Comparison Table */}
                <section className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden animate-slide-up">
                    <h2 className="text-2xl font-semibold text-[#ff6a00] px-6 py-4 border-b border-[#334155] animate-fade-in">
                        COMPARISON METRICS
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-gray-300 border-collapse">
                            <thead className="text-pink-400 animate-fade-in delay-100">
                                <tr>
                                    <th className="px-6 py-3 text-base font-semibold uppercase tracking-wider">Form Name</th>
                                    <th className="px-6 py-3 text-base font-semibold uppercase tracking-wider">Avg Rating</th>
                                    <th className="px-6 py-3 text-base font-semibold uppercase tracking-wider">Total Responses</th>
                                    <th className="px-6 py-3 text-base font-semibold uppercase tracking-wider">Spam %</th>
                                    <th className="px-6 py-3 text-base font-semibold uppercase tracking-wider">Avg Response Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forms.map((form, index) => (
                                    <tr key={form.id} className={`${index % 2 === 0 ? 'bg-[#283141]' : 'bg-[#1e293b]'} hover:bg-[#374151] transition-colors animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                                        <td className="px-6 py-4 text-sm text-center font-medium text-blue-300">{form.name}</td>
                                        <td className="px-6 py-4 text-sm text-center">{form.avgRating.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm text-center">{form.totalResponses}</td>
                                        <td className="px-6 py-4 text-sm text-center">{form.spamPercentage.toFixed(2)}%</td>
                                        <td className="px-6 py-4 text-sm text-center">{form.avgResponseLength.toFixed(2)} words</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
