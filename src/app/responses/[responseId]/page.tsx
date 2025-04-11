'use client';

import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';


export default function ResponsePage({ params }: {  params: Promise<{ responseId: string }> }) {
  const [response, setResponse] = useState<Response | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
 const[responseId, setResponseId] = useState<string | null>(null);
  useEffect(() => {
    const fetchResponseId = async () => {
      const { responseId } = await params;
      setResponseId(responseId);
    };

    fetchResponseId();
  }
  , [params]);

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
    if(!responseId) return; 
    const fetchResponse = async () => {
      try {
        console.log('Fetching response with ID:', responseId);
        const responseRes = await fetch(`/api/responses/${responseId}`);
        if (responseRes.ok) {
          const responseData = await responseRes.json();
          setResponse(responseData.response);
          setQuestions(responseData.questions || []);
        } else {
         console.log("Error fetching response:");
        }
      } catch (err) {
        console.error('Error fetching response:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!response) {

    const fetchResponse = async () => {
      try {
        console.log('Fetching response with ID:', responseId);
        const responseRes = await fetch(`/api/responses/${responseId}`);
        if (responseRes.ok) {
          const responseData = await responseRes.json();
          setResponse(responseData.response);
          setQuestions(responseData.questions || []);
        } else {
         console.log("Error fetching response:");
        }
      } catch (err) {
        console.error('Error fetching response:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
    return <div>Error: Response not found</div>;
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 text-gray-800 px-4">
        <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl border border-gray-300 rounded-2xl px-8 py-6 shadow-2xl transition-all duration-300">
          {/* Header Info */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              👤 {response.responderName ?? 'Anonymous'}
            </h1>
            <p className="text-md text-gray-600 italic">
              📧 {response.responderEmail ?? 'No Email Provided'}
            </p>
          </div>
    
          {/* Timestamp */}
          <p className="text-xs text-gray-500 mb-6 text-center">
            🕒{' '}
            {response.createdAt
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
          <div className="space-y-5 mb-6">
            {questions.map((question, idx) => (
              <div key={idx}>
                <p className="text-base font-semibold text-gray-800 mb-1">
                  Q{idx + 1}: <span className="italic">{question}</span>
                </p>
                <div className="bg-gray-100 border-l-4 border-indigo-500 rounded-md px-4 py-3 text-gray-700 text-sm transition hover:bg-gray-200">
                  A: {response.answers?.[idx] ?? 'N/A'}
                </div>
              </div>
            ))}
          </div>
    
          {/* Rating */}
          {response.rating !== undefined && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium mb-3">
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
          {response.spam !== undefined && (
            <p
              className={`text-sm italic text-center mt-4 ${
                response.spam ? 'text-red-500' : 'text-green-600'
              }`}
            >
              Classification: {response.spam ? '🚫 Spam' : '✅ Not Spam'}
            </p>
          )}
        </div>
      </div>
    );
  }