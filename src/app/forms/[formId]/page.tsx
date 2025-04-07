'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icons from react-icons

export default function ResponseForm({ params }: { params: { formId: string } }) {
  const { formId } = params;

  const [responderName, setResponderName] = useState('');
  const [responderEmail, setResponderEmail] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [improvementFeedback, setImprovementFeedback] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!formId) {
      setError('Form ID is missing.');
      return;
    }

    // Fetch form questions from the backend
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}`);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions || []);
        } else {
          setError('Failed to load form questions.');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('An error occurred while loading the form.');
      }
    };

    fetchQuestions();
  }, [formId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    if (!responderName || !responderEmail || answers.length !== questions.length || answers.some((a) => !a)) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!rating) {
      setError('Please provide a star rating.');
      return;
    }

    setError(null);

    try {
      const response = await fetch(`/api/forms/${formId}/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responderName,
          responderEmail,
          answers,
          rating,
          improvements: improvementFeedback,
        }),
      });

      if (response.ok) {
        setSuccess('Thank you for your response!');
      } else {
        setError('Failed to submit the response.');
      }
    } catch (err) {
      console.error('Error submitting response:', err);
      setError('An error occurred while submitting the response.');
    }
  };

  const renderStars = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer ${star <= (rating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    );
  };

  if (!formId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">Form ID is missing.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md text-center">
        <h1 className="text-2xl font-bold mb-4">{success}</h1>
        <p className="text-gray-600">We appreciate your feedback!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Submit Your Response</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            value={responderName}
            onChange={(e) => setResponderName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            value={responderEmail}
            onChange={(e) => setResponderEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {questions.map((question, idx) => (
          <div key={idx} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {question} *
            </label>
            <textarea
              value={answers[idx] || ''}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Star Rating *</label>
          {renderStars()}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ways to Improve (Optional)</label>
          <textarea
            value={improvementFeedback}
            onChange={(e) => setImprovementFeedback(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}