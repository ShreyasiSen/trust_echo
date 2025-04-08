'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icons from react-icons
import { motion } from 'framer-motion'; // Import motion for animations

export default function ResponseForm({ params }: { params: { formId: string } }) {
  const { formId } = params;

  const [responderName, setResponderName] = useState('');
  const [responderEmail, setResponderEmail] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [improvementFeedback, setImprovementFeedback] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
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
          setFormName(data.title || 'Feedback'); // fallback
          setFormTitle(data.description || 'Your input helps us improve. Please take a moment to share your experience with our services. All feedback is appreciated!');
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
      <div className="flex gap-2 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={28}
            className={`transition-colors duration-200 cursor-pointer 
              ${star <= (rating || 0) ? 'text-yellow-400' : 'text-gray-300'} 
              hover:text-yellow-500`}
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
    <div className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
  <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">

    {/* Left Panel */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 14 }}
      className="bg-[#f5f7ff] dark:bg-gray-800 flex flex-col justify-center items-center px-6 py-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 70 }}
        className="text-4xl md:text-5xl font-extrabold mb-4 font-serif text-center tracking-wide drop-shadow-sm text-indigo-700 dark:text-indigo-300"
      >
        {formName}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 70 }}
        className="text-center text-lg md:text-xl font-medium italic max-w-md tracking-wide text-gray-600 dark:text-gray-300"
      >
        “{formTitle}”
      </motion.p>
    </motion.div>

    {/* Form Panel */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 14 }}
      className="col-span-2 bg-gradient-to-tr from-[#e3f2fd] via-[#dbeafe] to-[#f0f9ff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-lg p-8 md:p-10 bg-white dark:bg-gray-950/70 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center font-serif">Feedback Form</h2>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={responderName}
              onChange={(e) => setResponderName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={responderEmail}
              onChange={(e) => setResponderEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {questions.map((question, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold mb-1">
                {question} <span className="text-red-600">*</span>
              </label>
              <textarea
                value={answers[idx] || ""}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[idx] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={3}
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Rate our services <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center space-x-2">{renderStars()}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Ways to Improve (Optional)</label>
            <textarea
              value={improvementFeedback}
              onChange={(e) => setImprovementFeedback(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={2}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-28 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  </div>
</div>
  );
}