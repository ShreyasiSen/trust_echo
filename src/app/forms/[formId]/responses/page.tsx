'use client';

import React, { useEffect, useState } from 'react';

export default function ResponsesPage({ params }: { params: { formId: string } }) {
  const { formId } = params;

  interface Response {
    id: string;
    responderName: string;
    responderEmail: string;
    answers: string[];
    createdAt: string; // Assuming createdAt is part of the response data
  }

  const [responses, setResponses] = useState<Response[]>([]);
  const [formTitle, setFormTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormAndResponses = async () => {
      try {
        // Fetch form details
        const formResponse = await fetch(`/api/forms/${formId}`);
        if (formResponse.ok) {
          const formData = await formResponse.json();
          setFormTitle(formData.title);
        } else {
          setError('Failed to load form details.');
          return;
        }

        // Fetch responses
        const responsesResponse = await fetch(`/api/forms/${formId}/responses`);
        if (responsesResponse.ok) {
          const responsesData = await responsesResponse.json();
          setResponses(responsesData);
        } else {
          setError('Failed to load responses.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormAndResponses();
  }, [formId]);

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Responses for {formTitle}</h1>

      {responses.length === 0 ? (
        <p className="text-gray-600">No responses have been submitted for this form yet.</p>
      ) : (
        <ul className="space-y-4">
          {responses.map((response, index) => (
            <li
              key={response.id}
              className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold">Response from {response.responderName}</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> {response.responderEmail}
              </p>
              <p className="text-gray-600">
                <strong>Submitted At:</strong>{' '}
                {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }).format(new Date(response.createdAt))}
              </p>
              <div className="mt-4">
                <h4 className="text-lg font-medium">Answers:</h4>
                <ul className="list-disc list-inside">
                  {response.answers.map((answer: string, idx: number) => (
                    <li key={idx} className="text-gray-600">
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}