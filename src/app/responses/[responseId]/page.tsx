'use client';

import { useEffect, useState } from 'react';
import { Header2 } from '@/components/header2';
import Link from 'next/link';
import { FiGrid, FiCopy } from 'react-icons/fi';

// Define a type for the testimonial
interface Testimonial {
  responderName: string;
  responderEmail: string;
  answers: string[];
  ratingStars: string; // Rating in star format
}

export default function ResponsePage({ params }: { params: Promise<{ responseId: string }> }) {
  const [responseId, setResponseId] = useState<string | null>(null);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null); // Store testimonial data
  const [copied, setCopied] = useState(false);

  // Customization options
  const [bgColor, setBgColor] = useState('#f9f9f9');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#333');
  const [margin, setMargin] = useState(20);
  const [alignment, setAlignment] = useState<'center' | 'left'>('center'); // Alignment option

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
        });
      } catch (error) {
        console.error('Error resolving responseId or fetching testimonial:', error);
      }
    };
    fetchResponseId();
  }, [params]);

  const embedCode = responseId
    ? `<div class="custom-embed" data-response-id="${responseId}" style="width:100%; background-color: ${bgColor}; font-size: ${fontSize}px; color: ${textColor}; text-align: ${alignment};"></div>
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
    <div>
      <Header2 />
      <div className="min-h-screen font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/3 w-full space-y-10 font-mono text-sm mt-20">
              <div className="w-full mb-6 sm:mb-10 flex justify-between items-center gap-2 flex-wrap">
                <h2 className="text-3xl font-bold text-black tracking-wide">Live Preview</h2>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-lg sm:text-md font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
                >
                  <FiGrid size={25} />
                  Dashboard
                </Link>
              </div>

              {/* Customization Options */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">Customize Preview</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Background Color</label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="mt-1 block w-16 h-8 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Font Size</label>
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="mt-1 block w-20 border border-gray-300 rounded"
                      min={12}
                      max={24}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Text Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="mt-1 block w-16 h-8 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Margin</label>
                    <input
                      type="number"
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="mt-1 block w-20 border border-gray-300 rounded"
                      min={0}
                      max={50}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Alignment</label>
                    <select
                      value={alignment}
                      onChange={(e) => setAlignment(e.target.value as 'center' | 'left')}
                      className="mt-1 block w-full border border-gray-300 rounded"
                    >
                      <option value="center">Center</option>
                      <option value="left">Left</option>
                    </select>
                  </div>
                </div>
              </div>

              {responseId ? (
                <>
                  <div
                    className="custom-embed"
                    data-response-id={responseId}
                    style={{ width: '100%' }}
                  ></div>

                  {/* Show the Testimonial */}
                  {testimonial && (
                    <div
                      className="mt-6 p-4 border border-gray-200 rounded-lg"
                      style={{
                        backgroundColor: bgColor,
                        fontSize: `${fontSize}px`,
                        color: textColor,
                        margin: `${margin}px`,
                        textAlign: alignment,
                      }}
                    >
                      <img
                        src={`https://via.placeholder.com/100?text=Avatar`} // Placeholder for profile picture
                        alt="Profile"
                        style={{
                          borderRadius: '50%',
                          margin: alignment === 'center' ? '0 auto' : '0',
                          display: 'block',
                        }}
                      />
                      <p className="font-bold mt-4">{testimonial.responderName}</p>
                      <p className="text-sm text-gray-500">{testimonial.responderEmail}</p>
                      <p className="italic mt-4">"{testimonial.answers.join(' ')}"</p>
                      <p className="text-yellow-500 mt-4">{testimonial.ratingStars}</p>
                    </div>
                  )}

                  {/* Embed Code */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-6 relative">
                    <h3 className="font-semibold text-lg mb-2">Embed this response:</h3>
                    <pre className="text-xs whitespace-pre-wrap bg-white p-2 rounded overflow-x-auto border border-dashed border-gray-300">
                      {embedCode}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <FiCopy size={18} />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-gray-400 text-lg text-center py-12">
                  <span className="animate-pulse">Loading preview...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-pink-50 text-black py-4 text-center">
        <p>&copy; 2025 FideFeed. All rights reserved.</p>
      </footer>
    </div>
  );
}