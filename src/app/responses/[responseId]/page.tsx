'use client';

import { useEffect, useState } from 'react';
import { Header2 } from '@/components/header2';
import Link from 'next/link';
import { FiGrid, FiCopy } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';

// Define a type for the testimonial
interface Testimonial {
  responderName: string;
  responderEmail: string;
  answers: string[];
  ratingStars: string;
  imageUrl?: string; // Rating in star format
  responderRole?: string; // Optional role
}

export default function ResponsePage({ params }: { params: Promise<{ responseId: string }> }) {
  const [responseId, setResponseId] = useState<string | null>(null);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null); // Store testimonial data
  const [copied, setCopied] = useState(false);

  // Customization options
  const [bgColor, setBgColor] = useState('#f9f9f9');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#333');
  // const [margin, setMargin] = useState(20);
  // const [alignment, setAlignment] = useState<'center' | 'left'>('center'); // Alignment option
  const searchParams = useSearchParams();
  const layout = searchParams.get('layout') || '1'; // Default to layout 1

  useEffect(() => {
    const fetchResponseId = async () => {
      try {
        const resolvedParams = await params; // Await the Promise
        setResponseId(resolvedParams.responseId);

        // Fetching the testimonial for the responseId from your API
        const response = await fetch(`/api/responses/${resolvedParams.responseId}`);
        const data = await response.json();
        console.log('Fetched testimonial:', data); // Log the fetched testimonial data

        // Format the rating as stars
        const ratingStars = '★'.repeat(data.rating || 0) + '☆'.repeat(5 - (data.rating || 0));

        setTestimonial({
          responderName: data.responderName,
          responderEmail: data.responderEmail,
          answers: data.answers,
          ratingStars,
          imageUrl: data.imageUrl,
          responderRole: data.responderRole,

        });
      } catch (error) {
        console.error('Error resolving responseId or fetching testimonial:', error);
      }
    };
    fetchResponseId();
  }, [params]);

  const embedCode = responseId
    ? `<div class="custom-embed"
     data-response-id="${responseId}"
      data-layout="${layout}" style="width:100%; background-color: ${bgColor}; font-size: ${fontSize}px; color: ${textColor}; "></div>
<script src="${process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000'}/utils/customEmbed.js" defer></script>`
    : '';

  const handleCopy = async () => {
    if (embedCode) {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen  flex flex-col font-sans">
      <Header2 />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900"> Live Preview</h2>
            <Link
              href="/dashboard"
              className="cursor-pointer inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
            >
              <FiGrid size={18} />
              Go to Dashboard
            </Link>
          </div>

          {/* Configuration Panel */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"> Customize Your Embed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Background Color</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-14 h-8 border border-gray-300 rounded shadow"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Font Size</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded px-2 py-1 shadow-sm"
                  min={12}
                  max={23}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Text Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-14 h-8 border border-gray-300 rounded shadow"
                />
              </div>
            </div>
          </div>

          {/* Live Preview */}
          {responseId ? (
            <>
              <div
                className="custom-embed animate-fade-in"
                data-response-id={responseId}
                style={{ width: '100%' }}
              ></div>

              {testimonial && (
                <div className="mt-8">
                  {layout === '1' && (
                    <div
                      className="p-6 bg-white rounded-xl shadow-md text-center mx-auto
                       w-full max-w-md transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: `${bgColor}`, fontSize: `${fontSize}px`, color: `${textColor}` }}
                    >
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          className="mx-auto w-20 h-20 rounded-full border object-cover mb-3"
                          alt="Avatar"
                        />
                      ) : (
                        <div className="mx-auto w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl border mb-3">
                          {testimonial.responderName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <h3 className=" font-semibold">{testimonial.responderName}</h3>
                      <p className="text-sm text-gray-700">{testimonial.responderRole}</p>
                      <div className="my-2 text-yellow-500 text-lg">{testimonial.ratingStars}</div>
                      <p className="italic">“{testimonial.answers.join(' ')}”</p>
                    </div>
                  )}

                  {layout === '2' && (
                    <div
                      className="px-6 py-8 bg-white rounded-xl shadow-md text-center
                      mx-auto
                       w-full max-w-md transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: `${bgColor}`, fontSize: `${fontSize}px`, color: `${textColor}` }}
                    >
                      <p className="italic mb-6">“{testimonial.answers.join(' ')}”</p>
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          className="mx-auto w-20 h-20 rounded-full border object-cover mb-3"
                          alt="Avatar"
                        />
                      ) : (
                        <div className="mx-auto w-20 h-20 rounded-full bg-blue-600  flex items-center justify-center text-white font-bold text-xl border mb-3">
                          {testimonial.responderName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <p className="font-semibold">{testimonial.responderName}</p>
                      <p className="text-xs ">{testimonial.responderRole || 'Reviewer'}</p>
                    </div>
                  )}

                  {layout === '3' && (
                    <div
                      className="p-6 bg-white rounded-xl shadow-md text-left mx-auto
                      w-full max-w-md transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: `${bgColor}`, fontSize: `${fontSize}px`, color: `${textColor}` }}
                    >
                      <p className="leading-relaxed mb-4">“{testimonial.answers.join(' ')}”</p>
                      <div className="flex items-center gap-4">
                        {testimonial.imageUrl ? (
                          <img
                            src={testimonial.imageUrl}
                            className=" w-20 h-20 rounded-full border object-cover mb-3"
                            alt="Avatar"
                          />
                        ) : (
                          <div className=" w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl border mb-3">
                            {testimonial.responderName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className=" font-semibold">{testimonial.responderName}</p>
                          <p className="text-xs text-gray-500">{testimonial.responderRole || 'Reviewer'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Embed Code Box */}
              <div className="mt-10 bg-[#0f1117] border border-gray-800 rounded-xl p-5 relative shadow-md">
                <h4 className="font-semibold text-green-400 text-sm mb-3 tracking-wide uppercase flex items-center gap-2">
                  <span>🧩</span> Embed Snippet
                </h4>

                <div className="bg-[#1a1c23] text-green-300 text-sm rounded-md px-4 py-3 font-mono overflow-x-auto border border-gray-700">
                  <pre className="whitespace-pre-wrap">{embedCode}</pre>
                </div>

                <button
                  onClick={handleCopy}
                  className="cursor-pointer absolute top-5 right-5 bg-[#1a1c23] border border-gray-600 text-green-400 hover:bg-green-600 hover:text-white transition-all px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1"
                >
                  <FiCopy size={14} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

            </>
          ) : (
            <div className="text-center text-gray-500 py-20 text-2xl">
              <span className="animate-pulse">Loading preview...</span>
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-pink-50 text-black py-4 text-center">
        <p>&copy; 2025 FideFeed. All rights reserved.</p>
      </footer>
    </div>


  );
}