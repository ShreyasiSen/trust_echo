'use client';

import React, { useEffect, useState } from 'react';
import { Header2 } from '@/components/header2';
import { FaStar, FaRegStar, FaLink, FaShareAlt, FaDownload, FaTrash } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Link from 'next/link';
import { FiGrid } from 'react-icons/fi';

export default function ResponsesPage({ params }: { params: Promise<{ formId: string }> }) {
  const [formId, setFormId] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [formTitle, setFormTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'spam' | 'text'>('text');

  interface Response {
    id: string;
    responderName?: string;
    responderEmail?: string;
    answers?: string[];
    createdAt?: string;
    rating?: number;
    spam?: boolean;
  }

  useEffect(() => {
    const fetchFormId = async () => {
      const resolvedParams = await params;
      setFormId(resolvedParams.formId);
    };
    fetchFormId();
  }, [params]);

  useEffect(() => {
    const fetchFormAndResponses = async () => {
      try {
        const [formResponse, responsesResponse] = await Promise.all([
          fetch(`/api/forms/${formId}`),
          fetch(`/api/forms/${formId}/responses`),
        ]);

        const formData = await formResponse.json();
        const responsesData = await responsesResponse.json();

        setFormTitle(formData?.title ?? 'Untitled Form');
        setQuestions(formData?.questions ?? []);
        setResponses(Array.isArray(responsesData) ? responsesData : []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchFormAndResponses();
    }
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
 
  const toggleMenu = (id: string | null) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const filteredResponses = Array.isArray(responses)
    ? responses.filter((response) => (filter === 'spam' ? response?.spam : !response?.spam))
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <Header2 />

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 px-4 sm:px-6 py-6 sm:py-10 bg-fuchsia-50 backdrop-blur-lg shadow-xl border-b lg:border-b-0 lg:border-r border-gray-200 mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
            🎛️ Filters
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => setFilter('text')}
              className={`w-full cursor-pointer px-4 py-2 sm:px-5 sm:py-3 rounded-xl text-sm sm:text-md font-semibold tracking-wide transition-all duration-300 shadow-md ${filter === 'text'
                ? 'bg-gradient-to-r from-blue-400 to-indigo-600 text-white scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-500 hover:scale-105'
                }`}
            >
              ✍️ Text Testimonials
            </button>

            <button
              onClick={() => setFilter('spam')}
              className={`w-full cursor-pointer px-4 py-2 sm:px-5 sm:py-3 rounded-xl text-sm sm:text-md font-semibold tracking-wide transition-all duration-300 shadow-md ${filter === 'spam'
                ? 'bg-gradient-to-r from-pink-600 to-red-500 text-white scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
            >
              🚫 Spam
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full lg:w-3/4 px-4 sm:px-10 py-6 sm:py-10 mt-10 lg:mt-20">
          <div className="w-full mb-6 sm:mb-10 flex justify-between items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 border-b border-gray-500 pb-3 sm:pb-4">
              <span className="italic">{formTitle}</span> – Responses
            </h1>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm sm:text-md font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
            >
              <FiGrid size={20} />
              Dashboard
            </Link>
          </div>

          {/* Responses */}
          <div className="w-full flex flex-wrap justify-center gap-6">
            {filteredResponses.map((response) => (
              <div
                key={response?.id}
                className="w-full sm:w-[48%] max-w-xl bg-white/50 backdrop-blur-lg border border-gray-200 rounded-2xl px-6 py-5 shadow-xl transition-transform transform hover:scale-[1.01] hover:shadow-2xl duration-[800ms] relative group animate-fade-in-slow"
              >
                {/* Gradient Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-blue-300 opacity-20 -z-10"></div>

                {/* Header Info */}
                <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
                      👤 {response?.responderName ?? 'Anonymous'}
                    </h3>
                    <p className="text-md text-gray-600 italic">
                      📧 {response?.responderEmail ?? 'No Email Provided'}
                    </p>
                  </div>

                  {/* Options Menu */}
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(response.id)}
                      className="text-gray-500 hover:text-indigo-700 p-2 cursor-pointer rounded-full transition"
                      title="Options"
                    >
                      <HiOutlineDotsVertical size={20} />
                    </button>
                    {activeMenu === response.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fade-in">
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <FaLink className="mr-2" /> Copy Link
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <FaShareAlt className="mr-2" /> Share
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <FaDownload className="mr-2" /> Download
                        </button>
                        <button
                          onClick={() => handleDeleteResponse(response.id)}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-gray-400 mb-4">
                  🕒{' '}
                  {response?.createdAt
                    ? new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }).format(new Date(response.createdAt))
                    : 'Unknown'}
                </p>

                {/* Questions and Answers */}
                <div className="space-y-4 mb-6">
                  {questions.map((question, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-semibold text-gray-800 mb-1">
                        Q{idx + 1}: <span className="italic">{question}</span>
                      </p>
                      <p className="text-sm text-gray-700 bg-gray-100 rounded-md px-3 py-2 border-l-4 border-indigo-400">
                        A: {response?.answers?.[idx] ?? 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Rating */}
                {response?.rating !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium mb-2">
                    <span>⭐ Rating:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < (response.rating ?? 0) ? (
                          <FaStar key={i} className="text-yellow-400" />
                        ) : (
                          <FaRegStar key={i} className="text-yellow-400" />
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Spam Classification */}
                {response?.spam !== undefined && (
                  <p className="text-sm italic text-red-400 mt-2">
                    Classification: {response?.spam ? '🚫 Spam' : '✅ Not Spam'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}