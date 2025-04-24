'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Header2 } from '@/components/header2';
import { toast } from 'sonner';
import { MoreVertical, Pen, Brain, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const loadingPhrases = [
  "Loading your dashboard...",
  "Fetching your forms...",
  "Preparing your data...",
  "Setting up your workspace...",
  "Almost ready...",
];

const backgroundColors = ["#0f172a", "#1e293b", "#334155", "#475569", "#64748b"]; // Darker, developer-esque palette

const DashboardLoading = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2200); // Slightly faster phrase cycle

    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundColors.length);
    }, 4500); // Smooth background transition

    return () => {
      clearInterval(phraseTimer);
      clearInterval(bgTimer);
    };
  }, []);

  const backgroundColor = backgroundColors[bgIndex];
  const phrase = loadingPhrases[phraseIndex];

  const pulse = useSpring(1, {
    damping: 15,
    stiffness: 120,
    mass: 0.6,
  });

  const scalePulse = useTransform(pulse, [0.9, 1.1], [1, 1.05]);
  const opacityPulse = useTransform(pulse, [0.8, 1], [0.7, 1]);
  // Removed unused 'glow' variable

  return (
    <motion.div
      className="fixed inset-0 flex flex-col justify-center items-center z-50 overflow-hidden"
      style={{ backgroundColor: isMounted ? backgroundColor : backgroundColors[0] }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Subtle Background Animation - Moving Lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-full h-0.5 bg-blue-500 opacity-10 blur-sm`}
          style={{ top: `${(i + 1) * 20}%` }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 8 + i * 2, ease: "linear" }}
        />
      ))}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className={`absolute w-0.5 h-full bg-purple-400 opacity-10 blur-sm`}
          style={{ left: `${(i + 1) * 30}%` }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 7 + i * 2, ease: "linear" }}
        />
      ))}

      {/* Sleek Loading Icon - Code Snippet Effect */}
      <motion.div
        className="relative w-24 h-16 mb-8 flex items-center justify-center"
        style={{ perspective: 200 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-md bg-cyan-400"
            style={{
              originX: 0,
              originY: 0,
              z: i * 10,
              scale: scalePulse.get(), // Extract value using .get()
              opacity: opacityPulse.get(), // Extract value using .get()
            }}
            animate={{
              rotateX: [0, 90, 0],
              translateX: [0, i * 10 - 10, 0],
              translateY: [0, -5 + i * 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Elegant Loading Text with Subtle Glow */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phrase}
          className="text-lg sm:text-xl text-gray-300 font-mono font-semibold tracking-wide text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ textShadow: "0 0 6px rgba(59, 130, 246, 0.6)" }}
        >
          {phrase}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};



export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  interface Form {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
    questions?: string[];
  }

  const [copied, setCopied] = useState<string | null>(null);
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);
  const [editFormId, setEditFormId] = useState<string | null>(null);
  const [editQuestions, setEditQuestions] = useState<string[]>([]);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

  const handleEditClick = (form: Form) => {
    setEditFormId(form.id);
    setEditQuestions(form.questions || []);
    setEditTitle(form.title || '');
    setEditDescription(form.description || '');
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating form with ID:', editFormId);
      await fetch(`/api/forms/${editFormId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: editQuestions
        }),
      });
      setEditFormId(null); // Close the popup
      window.location.reload(); // Refresh the page to reflect updates
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleAddQuestion = () => {
    setEditQuestions([...editQuestions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    const updated = [...editQuestions];
    updated.splice(index, 1);
    setEditQuestions(updated);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...editQuestions];
    updated[index] = value;
    setEditQuestions(updated);
  };

  const handleDescriptionClick = (description: string) => {
    setSelectedDescription(description);
    setIsExpanded(true);
  };

  const closeModal = () => {
    setIsExpanded(false);
    setSelectedDescription(null);
  };

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchMongoUserId = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setMongoUserId(data.id);
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
    if (!mongoUserId) return;

    const fetchForms = async () => {
      try {
        const response = await fetch(`/api/forms/user/${mongoUserId}`);
        if (response.ok) {
          const data = await response.json();
          setForms(data);
          setFilteredForms(data);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = forms.filter((form) =>
      form.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  const handleDelete = async (formId: string) => {
    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setForms((prev) => prev.filter((form) => form.id !== formId));
        setFilteredForms((prev) => prev.filter((form) => form.id !== formId));
        toast.success('Form deleted successfully!',
          {
            style: {
              color: "red"
            }
          }
        );
      } else {
        toast.error('Failed to delete the form. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting form:', err);
      toast.error('An unexpected error occurred.');
    }
  };

  const handleCopy = (formId: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(formId);


    setTimeout(() => {
      setCopied(null);
    }, 1000);
    toast.success('Link copied to clipboard!', {
      style: {
        color: 'green',
      },

    });
  };

  if (!isLoaded) {
    return <DashboardLoading />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">You must be signed in to view the dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div>
      <Header2 />
      <div className="bg-gradient-to-b from-white via-pink-50 to-purple-100 min-h-screen pt-4 pb-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          {/* Header Section */}
          <div className="relative flex flex-col mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-8">
              Welcome, <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-700">{user.firstName}</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full max-w-8xl gap-3">
              <h2 className="text-2xl font-medium text-gray-800 tracking-tight">
                <span className="text-indigo-700 italic">Your Products</span>
              </h2>
              <div className="flex gap-2">
                <button
                  className="cursor-pointer inline-flex items-center bg-indigo-50 text-indigo-700 text-sm font-medium py-2 px-3 rounded-md shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 border border-indigo-200 transition-colors duration-200"
                  onClick={() => router.push('/analytics')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8zM7 8a1 1 0 011-1h2a1 1 0 011 1v11a1 1 0 01-1 1H8a1 1 0 01-1-1V8zM12 4a1 1 0 011-1h2a1 1 0 011 1v15a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM17 11a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1h-2a1 1 0 01-1-1v-8z" />
                  </svg>
                  Analytics
                </button>
                <button
                  onClick={() => router.push('/create-form')}
                  className="cursor-pointer inline-flex items-center bg-blue-50 text-blue-700 text-sm font-medium py-2 px-3 rounded-md shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border border-blue-200 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create New
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-4 w-full max-w-2xl">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search your forms..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredForms.map((form, index) => {
              const headerColors = [
                'bg-gradient-to-r from-red-300 to-red-500',
                'bg-gradient-to-r from-green-300 to-green-500',
                'bg-gradient-to-r from-blue-300 to-blue-500',
                'bg-gradient-to-r from-yellow-300 to-yellow-500',
                'bg-gradient-to-r from-pink-300 to-pink-500',
                'bg-gradient-to-r from-purple-300 to-purple-500',
                'bg-gradient-to-r from-orange-300 to-orange-500',
                'bg-gradient-to-r from-teal-300 to-teal-500',
                'bg-gradient-to-r from-indigo-300 to-indigo-500',
                'bg-gradient-to-r from-emerald-300 to-emerald-500',
              ];
              const randomColor = headerColors[index % headerColors.length];
              const titleFontClass = 'font-semibold tracking-tight font-serif italic text-gray-700'; // Font styles for the title

              return (
                <div
                  key={form.id}
                  className="relative rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg border border-gray-100 flex flex-col overflow-hidden"
                >
                  {/* Gradient Header */}
                  <div className={`h-6 ${randomColor} rounded-t-lg`} />

                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl ${titleFontClass} line-clamp-1`}>{form.title}</h3> {/* Applied font styles to title */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-gray-100 cursor-pointer rounded-full">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => handleEditClick(form)} className="cursor-pointer">
                            <Pen className="mr-2 h-4 w-4 text-blue-500" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/forms/${form.id}/ai-analysis`)} className="cursor-pointer">
                            <Brain className="mr-2 h-4 w-4 text-purple-500" /> AI Analysis
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(form.id)} className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p
                      onClick={() => handleDescriptionClick(form.description || 'No description provided.')}
                      className="text-sm text-gray-700 mb-4 cursor-pointer transition-all duration-200 line-clamp-2"
                      title="Click to view full description"
                    >
                      {form.description || 'No description provided.'}
                    </p>

                    <div className="flex justify-between items-center mt-auto">
                      <p className="text-xs text-gray-500">
                        Created{' '}
                        {new Date(form.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                      <button
                        onClick={() => router.push(`/forms/${form.id}/responses`)}
                        className="text-sm text-indigo-700 font-medium cursor-pointer hover:text-indigo-900 transition"
                      >
                        View Responses →
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg relative">
                        {/* Close Icon */}
                        <button
                          onClick={closeModal}
                          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                          aria-label="Close"
                        >
                          &times;
                        </button>

                        {/* Modal Heading */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Full Description</h2>
                        {/* Modal Content */}
                        <p className="text-gray-700">{selectedDescription}</p>
                      </div>
                    </div>
                  )}
                  {/* Shareable Link Section - Always at the bottom */}
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-indigo-600 mb-2">Share Link</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={`${window.location.origin}/forms/${form.id}`}
                        readOnly
                        className="flex-grow text-sm text-gray-800 px-3 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleCopy(form.id, `${window.location.origin}/forms/${form.id}`)}
                        className={`text-sm font-medium px-3 py-2 rounded-md transition shadow-sm cursor-pointer ${copied === form.id ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-blue-700 hover:bg-blue-900 text-white'
                          }`}
                      >
                        {copied === form.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer className="bg-pink-50 text-black py-4 text-center">
        <p>&copy; 2025 FideFeed. All rights reserved.</p>
      </footer>
      {editFormId && (
        <div className="fixed inset-0 z-50 bg-opacity-20 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-gradient-to-r from-indigo-100 to-purple-200 rounded-3xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-6 sm:p-8 relative shadow-xl transform transition-all ease-in-out duration-500 max-h-[90vh] overflow-y-auto">

            {/* Close button (cross) */}
            <button
              onClick={() => setEditFormId(null)}
              className="cursor-pointer absolute top-4 right-4 text-4xl text-gray-800 hover:text-gray-600 focus:outline-black transition duration-200"
              aria-label="Close"

            >
              &times;
            </button>

            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center font-sans">Edit Product</h3>

            <label className="block text-base font-medium text-gray-700 mb-3">Title</label>
            <div className="relative mb-8">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 bg-gray-100 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-not-allowed font-mono"
                readOnly
              />
              <span className="absolute right-14 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                [Read Only]
              </span>
            </div>

            <label className="block text-base font-medium text-gray-700 mb-3">Description</label>
            <div className="relative mb-8">
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="w-full px-6 py-4 border border-gray-300 bg-gray-100 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-not-allowed font-mono"
                readOnly
              />
              <span className="absolute right-14 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                [Read Only]
              </span>
            </div>

            <label className="block text-base font-medium text-gray-700 mb-3">Questions</label>
            {editQuestions.map((question, index) => (
              <div key={index} className="flex items-center mb-6 gap-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                />
                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-600 text-sm font-semibold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={handleAddQuestion}
              className="text-sm text-indigo-600 mb-6 hover:underline font-sans cursor-pointer"
            >
              + Add Question
            </button>

            <div className="flex justify-end gap-6 mt-8">
              <button
                onClick={() => setEditFormId(null)}
                className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none transition ease-in-out duration-200 font-sans"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 focus:outline-none transition ease-in-out duration-200 font-sans"
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