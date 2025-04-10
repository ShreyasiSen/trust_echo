'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Header2 } from '@/components/header2';
import { Trash2, Loader } from 'lucide-react'; 
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, isLoaded } = useUser(); 
  const router = useRouter();

  interface Form {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
  }

  const [copied, setCopied] = useState<string | null>(null);
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

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
    setDeleting(formId); // Set the deleting state to the current form ID
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
              color:"red"
            }
          }
        );
      } else {
        toast.error('Failed to delete the form. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting form:', err);
      toast.error('An unexpected error occurred.');
    } finally {
      setDeleting(null);
    }
  };

  const handleCopy = (formId: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(formId);


    setTimeout(() => {
      setCopied(null);
    }, 400);
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Header2 />
      <div className="bg-gradient-to-b from-white via-pink-50 to-purple-100 min-h-screen">
        <div className="w-full px-4 sm:px-10 mx-auto py-8 sm:py-12 mt-20 sm:mt-18">
          <h1 className="w-full sm:w-auto absolute left-1/2 -translate-x-1/2 text-2xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
            Welcome,
            <span className="italic font-serif bg-gradient-to-l from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent font-display ml-1">
              {user.firstName}
            </span>
            <span className="ml-1">👋</span>
          </h1>

          <div className="flex flex-row gap-14 items-center justify-center mb-2 mt-14">
            <h2 className="text-2xl sm:text-2xl font-bold text-gray-800 font-playfair tracking-wide">
              Your{' '}
              <span className="text-blue-800 italic underline decoration-blue-300 underline-offset-4">
                Products
              </span>
            </h2>

            <div className="sm:ml-auto sm:mt-0">
              <button
                onClick={() => router.push('/create-form')}
                className="px-2 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold bg-gradient-to-br from-blue-400 to-blue-800 text-white rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-100 active:shadow-[0_4px_6px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out"
              >
                + Create New Product
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search spaces by name..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-b-2 border-gray-300 pb-2 tracking-wide w-full mb-6" />
          {filteredForms.length === 0 ? (
            <p className="text-gray-500 italic text-center">No spaces match your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredForms.map((form, index) => {
                const headerColors = [
                  'bg-red-400',
                  'bg-green-400',
                  'bg-blue-400',
                  'bg-yellow-500',
                  'bg-pink-400',
                  'bg-purple-400',
                  'bg-orange-400',
                  'bg-teal-400',
                  'bg-indigo-400',
                  'bg-emerald-400',
                ];
                const randomColor = headerColors[index % headerColors.length];

                return (
                  <div
                    key={form.id}
                    className="relative rounded-2xl bg-white transition-all duration-300 shadow-2xl hover:shadow-gray-300 "
                  >
                    {/* Neon Gradient Tag with Left Cut */}
                    <div className="relative flex flex-row justify-between items-center">
                      <div
                        className={`italic text-center px-4 py-2 text-white text-xl font-bold rounded-tr-2xl rounded-bl-[1.25rem] ${randomColor}`}
                      >
                        {form.title}
                      </div>

                      <button
                        onClick={() => handleDelete(form.id)}
                        className="ml-3 p-2 hover:scale-105 transition"
                        disabled={deleting === form.id} // Disable button while deleting
                      >
                        {deleting === form.id ? (
                          <Loader size={22} className="animate-spin text-red-500" />
                        ) : (
                          <Trash2 size={22} className="text-red-500" />
                        )}
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 text-black">
                      <p className="text-sm opacity-80 mb-3">
                        {form.description || 'No description provided.'}
                      </p>
                      <div className="flex flex-row items-start justify-between h-full">
                        <p className="text-xs font-medium tracking-wider text-blue-800 mb-4">
                          {new Date(form.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        {/* Read Responses Button */}
                        <button
                          onClick={() => router.push(`/forms/${form.id}/responses`)}
                          className="text-sm text-pink-600 font-semibold cursor-pointer hover:text-cyan-700 hover:underline transition"
                        >
                          READ RESPONSES →
                        </button>
                      </div>
                      {/* Shareable Link Section */}
                      <div className="mt-6">
                        <p className="text-sm font-semibold text-indigo-500 mb-2">Shareable Link</p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                          <input
                            type="text"
                            value={`${window.location.origin}/forms/${form.id}`}
                            readOnly
                            className="w-full sm:flex-1 text-sm text-gray-800 px-3 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                          <button
                            onClick={() => handleCopy(form.id, `${window.location.origin}/forms/${form.id}`)}
                            className={`text-sm font-medium px-4 py-2 rounded-md transition shadow-sm ${
                              copied === form.id
                                ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                : 'bg-black hover:bg-gray-700 text-white'
                            }`}
                          >
                            {copied === form.id ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <footer className="w-full text-center bg-purple-100 py-2 px-8 text-lg text-black mt-auto bottom-0">
        <p>© 2024 FideFeed. All rights reserved.</p>
      </footer>
    </div>
  );
}