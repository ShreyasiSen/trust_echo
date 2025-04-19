'use client';

import React, { useEffect, useState } from 'react';
import { Header2 } from '@/components/header2';
import { FaStar, FaRegStar, FaLink, FaTrash, FaPen } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Link from 'next/link';
import { FiGrid } from 'react-icons/fi';
import { toast } from 'sonner'; // Import toast for notifications
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ResponsesPage({ params }: { params: Promise<{ formId: string }> }) {
  const [formId, setFormId] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [formTitle, setFormTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'spam' | 'text'>('text');
  const [deleting, setDeleting] = useState<string | null>(null); // Track which response is being deleted
  const router = useRouter();
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);

  interface Response {
    id: string;
    responderName?: string;
    responderEmail?: string;
    questions?: string[];
    answers?: string[];
    createdAt?: string;
    rating?: number;
    spam?: boolean;
    imageUrl?: string;
  }

  useEffect(() => {
    const fetchFormId = async () => {
      const resolvedParams = await params;
      setFormId(resolvedParams.formId);
    };
    fetchFormId();
  }, [params]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const responsesResponse = await fetch(`/api/forms/${formId}/responses`);
        const responsesData = await responsesResponse.json();
        const formResponse = await fetch(`/api/forms/${formId}`);
        const formData = await formResponse.json();

        setFormTitle(formData?.title ?? 'Untitled Form');
        console.log("Fetched Responses Data:", responsesData); // Add this line
        setResponses(Array.isArray(responsesData) ? responsesData : []);
      } catch (err) {
        console.error('Error fetching responses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchResponses();
    }
  }, [formId]);

  const handleDeleteResponse = async (responseId: string) => {
    setDeleting(responseId); // Set the deleting state to the current response ID
    try {
      const res = await fetch(`/api/forms/${formId}/responses/${responseId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setResponses((prevResponses) =>
          prevResponses.filter((response) => response.id !== responseId)
        );
        toast.success('Response deleted successfully!', {
          position: 'bottom-right',
          style: {
            color: 'red',
          },
        }); // Show success toast
      } else {
        console.error('Failed to delete response.');
      }
    } catch (err) {
      console.error('Error deleting response:', err);
    } finally {
      setDeleting(null); // Reset the deleting state
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAnswers, setEditingAnswers] = useState<string[]>([]);

  const handleEditClick = (response: Response) => {
    setSelectedResponse(response);
    setEditingAnswers(response.answers || []); // Initialize with current answers
    setShowEditModal(true);
  };

  const handleAnswerChange = (index: number, value: string) => {
    setEditingAnswers((prev) =>
      prev.map((answer, i) => (i === index ? value : answer))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setActiveMenu(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside); // For desktop
    document.addEventListener('touchstart', handleClickOutside); // For mobile
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSaveChanges = async () => {
    if (!selectedResponse) return;

    try {
      const res = await fetch(`/api/forms/${formId}/responses/${selectedResponse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: editingAnswers }),
      });

      if (res.ok) {
        setResponses((prevResponses) =>
          prevResponses.map((response) =>
            response.id === selectedResponse.id
              ? { ...response, answers: editingAnswers }
              : response
          )
        );
      toast.success('Answers updated successfully!', {
        position: 'bottom-right',
        style: {
          color: 'green',
        },
      });
        setShowEditModal(false);
      } else {
        toast.error('Failed to update answers.');
      }
    } catch (err) {
      console.error('Error updating answers:', err);
      toast.error('An error occurred while updating answers.');
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
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 flex flex-col justify-center items-center z-50">
        <motion.div
          className="relative w-20 h-20 rounded-full border-4 border-dashed border-indigo-600"
          variants={{
            start: {
              rotate: 0,
              scale: 1,
            },
            end: {
              rotate: 360,
              scale: 1.2,
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            },
          }}
          animate="end"
        />
        <motion.p
          className="text-xl text-indigo-700 font-semibold mt-6"
          variants={{
            initial: { y: 20, opacity: 0 },
            animate: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.2,
                ease: 'easeOut',
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          Fetching responses...
        </motion.p>
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
        <div className="w-full lg:w-1/5 px-4 sm:px-6 py-6 sm:py-10 bg-fuchsia-50 backdrop-blur-lg shadow-xl border-b lg:border-b-0 lg:border-r border-gray-200 mt-20">
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
              className="inline-flex items-center gap-2 text-lg sm:text-md font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
            >
              <FiGrid size={25} />
              Dashboard
            </Link>
          </div>

          {/* Responses */}
          <div className="w-full flex flex-wrap justify-center">
            {filteredResponses.map((response) => (
              <div
                key={response?.id}
                className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 mb-10 border border-gray-200 relative hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out"
              >
                {/* Options Menu (Three Dots) */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleMenu(response.id)}
                    className="text-gray-500 hover:text-indigo-700 p-2 cursor-pointer rounded-full transition"
                    title="Options"
                  >
                    <HiOutlineDotsVertical size={20} />
                  </button>
                  {activeMenu === response.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fade-in">
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer"
                        onClick={() => handleEditClick(response)}
                      >
                        <FaPen className="mr-2 h-4 w-4 text-blue-500" /> Edit
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer"
                        onClick={() => {
                          setSelectedResponse(response);
                          setShowEmbedModal(true);
                        }}
                      >
                        <FaLink className="mr-2" /> Embed
                      </button>
                      <button
                        onClick={() => handleDeleteResponse(response.id)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full cursor-pointer"
                      >
                        {deleting === response.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-red-500"></div>
                        ) : (
                          <>
                            <FaTrash className="mr-2 text-red-600" /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Name, Email, Time */}
                  <div className="space-y-2 flex items-center">
                    {/* Image Preview */}
                    {response.imageUrl ? (
                      <img
                        src={response.imageUrl}
                        alt={response?.responderName ?? 'Anonymous'}
                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        👤
                      </div>
                    )}

                    {/* Text Details */}
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {response?.responderName ?? 'Anonymous'}
                      </h3>
                      <p className="text-gray-600">
                        📧 {response?.responderEmail ?? 'No Email Provided'}
                      </p>
                      <p className="text-sm text-gray-400">
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
                    </div>
                  </div>

                  {/* Right Column: Rating + Q&A + Spam */}
                  <div className="space-y-6">
                    {/* Rating */}
                    {response?.rating !== undefined && (
                      <div className="flex items-center text-sm text-gray-700 font-medium">
                        Rating:&nbsp;
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

                    {/* Questions and Answers */}
                    <div className="space-y-4">
                      {response.questions?.map((question, idx) => (
                        <div key={idx}>
                          <p className="text-base font-semibold text-gray-800">
                            Q{idx + 1}: <span className="italic">{question}</span>
                          </p>
                          <p className="text-base text-gray-700 ml-2 mt-1">
                            A: {response?.answers?.[idx] ?? 'N/A'}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Spam Info */}
                    {response?.spam !== undefined && (
                      <p className="text-sm text-red-500 italic">
                        {response?.spam ? '🚫 Spam' : '✅ Not Spam'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-pink-200 text-black py-4 text-center">
        <p>&copy; 2025 FideFeed. All rights reserved.</p>
      </footer>
      {showEmbedModal && selectedResponse && (
        <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-sm px-4">
          <div className="bg-gradient-to-br from-blue-50 via-blue-200 to-blue-400 text-white rounded-2xl p-6 sm:p-8 w-full max-w-5xl shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto max-h-[95vh]">
            <h2 className="text-2xl sm:text-4xl font-mono text-black font-semibold mb-6 sm:mb-8 text-center tracking-tight">
              Choose Embed Layout
            </h2>

            {/* Layout Options */}
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 justify-center items-center">
              {/* Layout 1 */}
              <div
                onClick={() => {
                  router.push(`/responses/${selectedResponse.id}?layout=1`);
                  setShowEmbedModal(false);
                }}
                className="cursor-pointer border-2 border-gray-300 rounded-2xl p-6 bg-white text-center w-full md:w-96 h-[320px] transition-transform transform hover:scale-105 hover:ring-2 hover:ring-blue-600 shadow-xl hover:bg-gray-100 flex flex-col justify-between"
              >

                <div className="flex justify-center mb-4">
                  <img
                    src="https://i.pravatar.cc/100?img=32"
                    alt="Reviewer Avatar"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Liam Young</h3>
                <p className="text-xs text-gray-500 mb-2">ReviewCollector / CEO</p>
                <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                <p className="text-sm text-gray-700 mb-4">“Visit this .....”</p>
                <div className="text-xs text-gray-400 mt-4 italic">Layout 1 – Classic Review Card</div>
              </div>

              {/* Layout 2 */}
              <div
                onClick={() => {
                  router.push(`/responses/${selectedResponse.id}?layout=2`);
                  setShowEmbedModal(false);
                }}
                className="cursor-pointer border-2 border-gray-300 rounded-2xl p-6 bg-white text-center w-full md:w-96 h-[320px] transition-transform transform hover:scale-105 hover:ring-2 hover:ring-blue-600 shadow-xl hover:bg-gray-100 flex flex-col justify-between"
              >

                <p className="text-sm text-gray-700 mb-6 px-2 sm:px-4">
                  “Elementor is a great tool. When you build a WordPress site for a client, he or she usually wants to edit the site.”
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src="https://i.pravatar.cc/100?img=47"
                    alt="Reviewer Avatar"
                    className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <p className="text-sm font-medium text-gray-800 mt-2">Julia Day</p>
                  <p className="text-xs text-blue-600 font-semibold">Manager</p>
                </div>
                <div className="text-xs text-gray-400 mt-4 italic">Layout 2 – Minimalistic Testimonial</div>
              </div>

              {/* Layout 3 */}
              <div
                onClick={() => {
                  router.push(`/responses/${selectedResponse.id}?layout=3`);
                  setShowEmbedModal(false);
                }}
                className="cursor-pointer border-2 border-gray-300 rounded-2xl p-6 bg-white text-left w-full md:w-96 h-[320px] transition-transform transform hover:scale-105 hover:ring-2 hover:ring-blue-600 shadow-xl hover:bg-gray-100 flex flex-col justify-between"
              >

                <p className="text-sm text-gray-700">
                  &quot;Shadcn UI Kit for Figma has completely transformed our design process. It&apos;s incredibly intuitive and saves us so much time.&quot;
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://i.pravatar.cc/100?img=56"
                    alt="Reviewer Avatar"
                    className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Lando Norris</p>
                    <p className="text-xs text-gray-500">Founder at Acme Inc.</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-4 italic">Layout 3 – Left-Aligned Testimonial</div>
              </div>
            </div>

            {/* Close Modal Button */}
            <div className="flex justify-center sm:justify-end mt-8">
              <button
                onClick={() => setShowEmbedModal(false)}
                className="cursor-pointer text-sm sm:text-md bg-black text-white hover:text-gray-300 border border-gray-600 rounded-lg px-5 py-2 sm:px-6 sm:py-3 hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedResponse && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-3xl shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto max-h-[95vh]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
              Edit Answers
            </h2>

            <div className="space-y-4">
              {selectedResponse.questions?.map((question, index) => (
                <div key={index}>
                  <p className="text-base font-semibold text-gray-800">
                    Q{index + 1}: <span className="">{question}</span>
                  </p>
                  <textarea
                    value={editingAnswers[index] || ''} // Display the current answer
                    onChange={(e) => handleAnswerChange(index, e.target.value)} // Update the answer
                    className="w-full mt-2 p-3 text-blue-900 font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}