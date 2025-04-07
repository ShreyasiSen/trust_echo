'use client';

import React from 'react';

export default function FormPage({ params }: { params: { formId: string } }) {
  const {formId}  =params;
  interface Form {
    title: string;
    description?: string;
    questions: string[];
  }

  const [form, setForm] = React.useState<Form | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [responderName, setResponderName] = React.useState('');
  const [responderEmail, setResponderEmail] = React.useState('');
  const [answers, setAnswers] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}`);
        if (response.ok) {
          const data = await response.json();
          setForm(data);
          setAnswers(new Array(data.questions.length).fill('')); // Initialize answers array
        } else {
          setError('Failed to load the form.');
        }
      } catch (err) {
        console.error('Error fetching form:', err);
        setError('An error occurred while loading the form.');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/forms/${formId}/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responderName,
          responderEmail,
          answers,
        }),
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        setResponderName('');
        setResponderEmail('');
        setAnswers(new Array(form?.questions.length).fill(''));
      } else {
        alert('Failed to submit your feedback.');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('An error occurred while submitting your feedback.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading form...</p>
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{form?.title}</h1>
      <p className="text-gray-600 mb-4">{form?.description || 'No description provided.'}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            value={responderName}
            onChange={(e) => setResponderName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Email</label>
          <input
            type="email"
            value={responderEmail}
            onChange={(e) => setResponderEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        {form?.questions.map((question: string, index: number) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">{question}</label>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => {
                const updatedAnswers = [...answers];
                updatedAnswers[index] = e.target.value;
                setAnswers(updatedAnswers);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}