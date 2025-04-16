'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { BarGraph } from '@/components/BarGraph';
import { PieChart } from '@/components/PieChart';
import { RatingsLineChart } from '@/components/RatingsLineChart';
import Link from 'next/link';
import { HiArrowLeft, HiChartBar } from 'react-icons/hi';

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
        <div className="text-lg animate-pulse">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-950 to-black text-white px-6 py-10">
      {/* Top-Left Button */}
      <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-lg text-blue-300 font-semibold hover:underline transition duration-300"
        >
          <HiArrowLeft className="text-xl" /> {/* Added icon */}
          Dashboard
        </Link>
        <Link
          href="/analytics/table"
          className="inline-flex items-center gap-2 text-lg text-blue-300 font-semibold hover:underline transition duration-300"
        >
          Tabular Analytics
          <HiChartBar className="text-xl" /> {/* Added icon */}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-pink-400 to-amber-300 drop-shadow-[0_4px_30px_rgba(255,255,255,0.25)] tracking-tight leading-tight">
            📊 Analytics Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Dive into rich visual insights of your forms with interactive charts and stunning visuals.
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4 text-pink-300 drop-shadow">⭐ Average Ratings</h2>
            <div className="h-64">
              {loading ? (
                <div className="w-full h-full bg-white/20 animate-pulse rounded-xl" />
              ) : (
                <BarGraph data={averageRatings} />
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-300 drop-shadow">📈 Submission Distribution</h2>
            <div className="h-64">
              {loading ? (
                <div className="w-full h-full bg-white/20 animate-pulse rounded-xl" />
              ) : (
                <PieChart data={submissionCounts} />
              )}
            </div>
          </div>
        </div>

        {/* Ratings Line Chart */}
        <div className="mt-16 bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
          <h2 className="text-xl font-semibold mb-6 text-blue-300 drop-shadow">📅 Ratings Over Time</h2>
          {loading ? (
            <div className="h-64 w-full bg-white/20 animate-pulse rounded-xl" />
          ) : (
            <RatingsLineChart data={ratingsOverTime} />
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
