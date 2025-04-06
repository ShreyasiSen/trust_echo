'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';

export default function Dashboard() {
  const { user, isLoaded } = useUser(); // Ensure user data is fully loaded
  const router = useRouter();

  interface Form {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
  }

  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return; // Wait until user data is loaded

    const fetchMongoUserId = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`); // Fetch MongoDB user ID using Clerk ID
        if (response.ok) {
          const data = await response.json();
          setMongoUserId(data.id); // Set the MongoDB user ID
        } else {
          console.error('Failed to fetch MongoDB user ID');
        }
      } catch (err) {
        console.error('Error fetching MongoDB user ID:', err);
      }
    };

    fetchMongoUserId();
  }, [isLoaded, user]);

  useEffect(() => {
    if (!mongoUserId) return; // Wait until MongoDB user ID is fetched

    const fetchForms = async () => {
      try {
        const response = await fetch(`/api/forms/user/${mongoUserId}`); // Use MongoDB user ID to fetch forms
        if (response.ok) {
          const data = await response.json();
          setForms(data);
        } else {
          console.error('Failed to fetch forms');
        }
      } catch (err) {
        console.error('Error fetching forms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [mongoUserId]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">You must be signed in to view the dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading your forms...</p>
      </div>
    );
  }

  return (
    <div>
      <Header /> {/* Add Header component here */}

      <div className="max-w-4xl mx-auto p-6 mt-60">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Spaces</h2>
          <button
            onClick={() => router.push('/create-form')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Create New Space
          </button>
        </div>

        {forms.length === 0 ? (
          <p className="text-gray-600">You haven't created any forms yet.</p>
        ) : (
          <ul className="space-y-4">
            {forms.map((form) => (
              <li
                key={form.id}
                className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold">{form.title}</h3>
                <p className="text-gray-600">{form.description || 'No description provided.'}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => router.push(`/forms/${form.id}/responses`)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    View Responses
                  </button>
                  <span className="text-sm text-gray-500">
                    Created on{' '}
                    {new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    }).format(new Date(form.createdAt))}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Shareable Link:</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/forms/${form.id}`}
                      readOnly
                      className="w-full px-2 py-1 border rounded-md text-gray-700"
                    />
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(`${window.location.origin}/forms/${form.id}`)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}