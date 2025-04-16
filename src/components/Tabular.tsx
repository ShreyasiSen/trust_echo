import React, { useEffect, useState } from 'react';

export default function FormComparisonPage() {
  interface Form {
    id: string;
    name: string;
    avgRating: number;
    totalResponses: number;
    spamPercentage: number;
    avgResponseLength: number;
  }

  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFormsData = async () => {
      try {
        const response = await fetch(`/api/forms/compare?clerkUserId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch forms data');

        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-950 to-black px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-pink-400 to-amber-300 drop-shadow-[0_4px_30px_rgba(255,255,255,0.25)] tracking-tight leading-tight">
            📊 Form Comparison
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Compare all forms side-by-side based on various metrics.
          </p>
        </div>

        {/* Form Comparison Table */}
        <div className="overflow-x-auto bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
          <h2 className="text-xl font-semibold mb-6 text-blue-300 drop-shadow">All Forms Comparison</h2>
          <table className="min-w-full table-auto text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Form Name</th>
                <th className="px-4 py-2 border-b">Average Rating</th>
                <th className="px-4 py-2 border-b">Total Responses</th>
                <th className="px-4 py-2 border-b">Spam %</th>
                <th className="px-4 py-2 border-b">Avg Response Length (Chars)</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id}>
                  <td className="px-4 py-2 border-b">{form.name}</td>
                  <td className="px-4 py-2 border-b">{form.avgRating}</td>
                  <td className="px-4 py-2 border-b">{form.totalResponses}</td>
                  <td className="px-4 py-2 border-b">{form.spamPercentage}%</td>
                  <td className="px-4 py-2 border-b">{form.avgResponseLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
