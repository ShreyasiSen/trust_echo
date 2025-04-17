'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { BarGraph } from '@/components/BarGraph';
import { PieChart } from '@/components/PieChart';
import { RatingsLineChart } from '@/components/RatingsLineChart';
import Link from 'next/link';
import { HiArrowLeft, HiChartBar, HiArrowRight } from 'react-icons/hi';

export default function AnalyticsPage() {
  const { user, isLoaded } = useUser();
  const [averageRatings, setAverageRatings] = useState([]);
  const [submissionCounts, setSubmissionCounts] = useState([]);
  const [ratingsOverTime, setRatingsOverTime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(`/api/analytics?clerkUserId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch analytics data');

        const data = await response.json();
        setAverageRatings(data.averageRatings);
        setSubmissionCounts(data.submissionCounts);

        const ratingsResponse = await fetch(`/api/analytics/overtime?clerkUserId=${user.id}`);
        if (!ratingsResponse.ok) throw new Error('Failed to fetch ratings over time data');

        const ratingsData = await ratingsResponse.json();
        setRatingsOverTime(ratingsData.ratingsOverTime);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [isLoaded, user]);

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        <div className="text-lg animate-pulse mb-6">Loading user data...</div>
        {/* More sophisticated loading animation */}
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-400 animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-green-400 animate-ping delay-100"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-yellow-400 animate-pulse delay-200"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-500 animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-fuchsia-100 to-pink-200 text-gray-200 px-6 py-8 font-mono animate-background-pan">
      {/* <style jsx global>
        {`
          @keyframes background-pan {
            from { background-position: 0% center; }
            to { background-position: -200% center; }
          }

          .animate-background-pan {
            background-size: 300% 100%;
            animation: background-pan 15s linear infinite;
          }
        `}
      </style> */}
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3a3f4b] bg-[#1c1e22] hover:bg-[#24262b] text-gray-300 hover:text-blue-300 transition-colors duration-200"
          >
            <HiArrowLeft className="text-base animate-bounce-right group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm tracking-wide">Dashboard</span>
          </Link>

          <Link
            href="/analytics/table"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3a3f4b] bg-[#1c1e22] hover:bg-[#24262b] text-gray-300 hover:text-purple-300 transition-colors duration-200"
          >
            <span className="text-sm tracking-wide">Tabular View</span>
            <HiChartBar className="text-base group-hover:translate-x-1 transition-transform duration-200" />
            <HiArrowRight className="text-base animate-bounce-left group-hover:-translate-x-1 transition-transform duration-200" />
          </Link>
        </div>


        {/* Page Title */}
        <header className="text-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8e3b46] via-[#b83280] to-[#4b0082] tracking-tight leading-tight animate-gradient-pulse">
              Developer Insights Hub
            </h1>
            <p className="mt-3 text-lg text-gray-700 max-w-xl mx-auto animate-fade-in">
              Dive into precise, interactive analytics built for dev teams. Clear metrics. Real results.
            </p>
          </div>

        </header>

        {/* Chart Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="bg-gradient-to-bl from-pink-100 via-amber-100 to-amber-300 border border-[#d1d5db] p-6 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 tracking-wide flex items-center gap-2 drop-shadow-sm">
              <span>📊</span> Average Ratings
            </h2>

            <div className="relative h-72 pt-4 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] shadow-inner hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl animate-pulse">
                  <svg className="animate-spin h-8 w-8 text-pink-400 mb-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10s4.477 10 10 10v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  <p className="text-sm text-pink-700 font-medium">Fetching data...</p>
                </div>
              ) : (
                <BarGraph data={averageRatings} />
              )}
            </div>
          </div>


          {/* Pie Chart */}
          <div className="bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
              <span>📈</span> Submission Distribution
            </h2>
            <div className="relative h-72">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1c1c1c]/30 rounded-xl animate-pulse">
                  <svg className="animate-spin h-10 w-10 text-yellow-300" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523
              0-10 4.477-10 10s4.477 10 10
              10v-4a8 8 0 01-8-8z" />
                  </svg>
                  <p className="text-sm text-emerald-800 font-medium">Fetching data...</p>
                </div>
              ) : (
                <PieChart data={submissionCounts} />
              )}
            </div>
          </div>
        </section>

        {/* Line Chart */}
        <section className="mt-16 bg-gradient-to-bl from-blue-100 via-blue-200 to-blue-300 relative overflow-hidden rounded-2xl  shadow-[0_10px_30px_rgba(0,0,0,0.5)] group min-h-[600px] transition-all duration-500">
          <div className="relative z-10 p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 tracking-tight animate-slide-in-down flex items-center gap-2">
              Ratings Over Time
            </h2>

            <div className="relative h-[400px] bg-[#0f172a] border border-[#334155] rounded-xl shadow-inner hover:shadow-lg transition duration-300 animate-slide-in-up">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1f2937]/40 rounded-xl animate-pulse">
                  <svg className="animate-spin h-10 w-10 text-[#60a5fa]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10s4.477 10 10 10v-4a8 8 0 01-8-8z" />
                  </svg>
                  <p className="text-sm text-blue-800 font-medium">Fetching data...</p>
                </div>
              ) : (
                <RatingsLineChart data={ratingsOverTime} />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>

  );
}