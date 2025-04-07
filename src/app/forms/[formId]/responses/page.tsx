'use client';

import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa'; 

export default function ResponsesPage({ params }: { params: { formId: string } }) {
  const { formId } = params;

  interface Response {
    id: string;
    responderName?: string; // Nullable
    responderEmail?: string; // Nullable
    answers?: string[]; // Nullable
    createdAt?: string; // Nullable
    rating?: number; // Rating provided by the responder
    spam?: boolean; // Nullable
  }

  const [responses, setResponses] = useState<Response[]>([]);
  const [questions, setQuestions] = useState<string[]>([]); // Store form questions
  const [formTitle, setFormTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'spam' | 'text'>('text'); // Filter state

  useEffect(() => {
    const fetchFormAndResponses = async () => {
      try {
        // Fetch form details and responses simultaneously
        const [formResponse, responsesResponse] = await Promise.all([
          fetch(`/api/forms/${formId}`),
          fetch(`/api/forms/${formId}/responses`),
        ]);

        if (!formResponse.ok) {
          setError('Failed to load form details.');
          return;
        }

        if (!responsesResponse.ok) {
          setError('Failed to load responses.');
          return;
        }

        const formData = await formResponse.json();
        const responsesData: Response[] = await responsesResponse.json();

        setFormTitle(formData?.title ?? 'Untitled Form');
        setQuestions(formData?.questions ?? []); // Fetch questions from the form
        setResponses(responsesData); // Set responses directly
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormAndResponses();
  }, [formId]);

  const handleDeleteResponse = async (responseId: string) => {
    try {
      const res = await fetch(`/api/forms/${formId}/responses/${responseId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setResponses((prevResponses) =>
          prevResponses.filter((response) => response.id !== responseId)
        );
      } else {
        console.error('Failed to delete response.');
      }
    } catch (err) {
      console.error('Error deleting response:', err);
    }
  };

  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-400" />
        )
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  const filteredResponses = responses?.filter((response) =>
    filter === 'spam' ? response?.spam : !response?.spam
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading responses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Filter Responses</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setFilter('text')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                filter === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Text Testimonials
            </button>
          </li>
          <li>
            <button
              onClick={() => setFilter('spam')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                filter === 'spam' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Spam
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6">Responses for {formTitle}</h1>

        {filteredResponses?.length === 0 ? (
          <p className="text-gray-600">
            {filter === 'spam'
              ? 'No spam responses found.'
              : 'No text testimonials found.'}
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredResponses?.map((response) => (
              <li
                key={response?.id}
                className={`p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow ${
                  response?.spam ? 'bg-red-100' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    Response from {response?.responderName ?? 'Anonymous'}
                  </h3>
                  <button
                    onClick={() => handleDeleteResponse(response.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Response"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-gray-600">
                  <strong>Email:</strong> {response?.responderEmail ?? 'N/A'}
                </p>
                <p className="text-gray-600">
                  <strong>Submitted At:</strong>{' '}
                  {response?.createdAt
                    ? new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                      }).format(new Date(response.createdAt))
                    : 'Unknown'}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Questions and Answers:</h4>
                  <ul className="list-disc list-inside">
                    {questions.map((question, idx) => (
                      <li key={idx} className="text-gray-600">
                        <strong>Q:</strong> {question}
                        <br />
                        <strong>A:</strong> {response?.answers?.[idx] ?? 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
                {response?.spam !== undefined && (
                  <p className="mt-2 text-sm text-gray-800">
                    Classification: {response?.spam ? 'Spam' : 'Not Spam'}
                  </p>
                )}
                {response?.rating !== undefined && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-800">Rating:</span>
                    {renderStars(response?.rating)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}