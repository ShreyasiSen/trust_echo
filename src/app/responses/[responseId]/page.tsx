'use client';

import { useEffect, useState } from 'react';
import { Header2 } from '@/components/header2';
import Link   from 'next/link';
import { FiGrid } from 'react-icons/fi';

export default function ResponsePage({ params }: { params: Promise<{ responseId: string }> }) {
  const [embedCode, setEmbedCode] = useState('');
  const [styles, setStyles] = useState({
    backgroundColor: '#ffffff',
    textColor: '#333333',
    padding: '20',
    borderRadius: '10',
    borderColor: '#cccccc',
    borderWidth: '1',
    nameFont: 'Arial',
    nameFontSize: '20',
    emailFont: 'Arial',
    emailFontSize: '16',
    questionFont: 'Arial',
    questionFontSize: '18',
    answerFont: 'Arial',
    answerFontSize: '16',
    ratingColor: '#ffcc00', // default yellow
    starColor: '#ffcc00',

  });
  const [responseId, setResponseId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };
  // Fetch and resolve the responseId from params
  useEffect(() => {
    const fetchResponseId = async () => {
      try {
        const resolvedParams = await params;
        setResponseId(resolvedParams.responseId);
      } catch (error) {
        console.error('Error resolving responseId:', error);
      }
    };
    fetchResponseId();
  }, [params]);

  // Generate the embed code whenever responseId or styles change
  useEffect(() => {
    if (!responseId) return;

    const createEmbedCode = () => {
      const queryParams = new URLSearchParams(styles).toString();
      const src = `${window.location.origin}/api/embed/${responseId}?${queryParams}`;
      const code = `<iframe src="${src}" style="width:100%;height:100%;border:none;overflow:hidden;" frameborder="0" scrolling="no"></iframe>`;
      setEmbedCode(code);
    };

    createEmbedCode();
  }, [responseId, styles]);

  // Handle style changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStyles((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Header2 />
      <div className="min-h-screen font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Left Part: Preview and Embed */}
            <div className="lg:w-2/3 w-full space-y-10 animate-fadeIn font-mono text-sm mt-20">
            <div className="w-full mb-6 sm:mb-10 flex justify-between items-center gap-2 flex-wrap">
              {/* Live Preview Header */}
              <h2 className="text-3xl font-bold text-black tracking-wide">Live Preview</h2>
              <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-lg sm:text-md font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
            >
              <FiGrid size={25} />
              Dashboard
            </Link>
            </div>
              {/* Iframe Preview */}
              <div className="rounded-xl p-4">
                {responseId ? (
                  <iframe
                    src={`/api/embed/${responseId}?${new URLSearchParams(styles).toString()}`}
                    className="w-full h-[300px] rounded-md"
                  ></iframe>
                ) : (
                  <div className="text-gray-400 text-lg text-center py-12">
                    <span className="animate-pulse">Loading preview...</span>
                  </div>
                )}
              </div>

              {/* Embed Code Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Embed Code</h2>

                <div className="relative bg-[#1e293b] border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-6 text-sm px-3 py-1 bg-white text-black rounded hover:bg-blue-50 cursor-pointer transition-all"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>

                  <textarea
                    readOnly
                    value={embedCode}
                    className="w-full h-40 resize-none bg-transparent text-green-400 p-4 pt-6 focus:outline-none font-mono tracking-wide"
                  />
                </div>
              </div>

            </div>


            {/* Right Part: Controls */}
            <div className="lg:w-1/4 w-full lg:fixed mt-20 right-0 top-0 bottom-0 h-screen bg-[#0a0f1c] text-[#cbd5e1] border-l border-[#334155] px-6 py-8 overflow-y-auto space-y-8 z-10 animate-slideInRight font-mono">

              <h2 className="text-3xl font-bold tracking-wide text-[#0ff1ce] mb-8 text-center leading-tight">
                Customize Your Preview
              </h2>

              <div className="space-y-6 text-sm">

                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Background Color:</span>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={styles.backgroundColor}
                    onChange={handleChange}
                    className="ml-3 w-10 h-6 p-0 rounded-md border border-[#334155] bg-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Text Color:</span>
                  <input
                    type="color"
                    name="textColor"
                    value={styles.textColor}
                    onChange={handleChange}
                    className="ml-3 w-10 h-6 p-0 rounded-md border border-[#334155] bg-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Padding: <span className="text-[#0ff1ce]">{styles.padding}px</span></span>
                  <input
                    type="range"
                    name="padding"
                    min="0"
                    max="50"
                    value={styles.padding}
                    onChange={handleChange}
                    className="w-full accent-[#0ff1ce]"
                  />
                </label>

                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Border Radius: <span className="text-[#0ff1ce]">{styles.borderRadius}px</span></span>
                  <input
                    type="range"
                    name="borderRadius"
                    min="0"
                    max="50"
                    value={styles.borderRadius}
                    onChange={handleChange}
                    className="w-full accent-[#38bdf8]"
                  />
                </label>

                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Border Color:</span>
                  <input
                    type="color"
                    name="borderColor"
                    value={styles.borderColor}
                    onChange={handleChange}
                    className="ml-3 w-10 h-6 p-0 rounded-md border border-[#334155] bg-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Border Width: <span className="text-[#0ff1ce]">{styles.borderWidth}px</span></span>
                  <input
                    type="range"
                    name="borderWidth"
                    min="0"
                    max="10"
                    value={styles.borderWidth}
                    onChange={handleChange}
                    className="w-full accent-[#4ade80]"
                  />
                </label>

                {/* Name Font */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Name Font:</span>
                  <select
                    name="nameFont"
                    value={styles.nameFont}
                    onChange={handleChange}
                    className="ml-2 border border-[#334155] rounded-md px-2 py-1 bg-[#1e293b] text-white"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Lucida Console">Lucida Console</option>
                  </select>
                </label>

                {/* Name Font Size */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Name Font Size: <span className="text-[#0ff1ce]">{styles.nameFontSize}px</span></span>
                  <input
                    type="range"
                    name="nameFontSize"
                    min="12"
                    max="30"
                    value={styles.nameFontSize}
                    onChange={handleChange}
                    className="w-full accent-[#0ff1ce]"
                  />
                </label>

                {/* Email Font */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Email Font:</span>
                  <select
                    name="emailFont"
                    value={styles.emailFont}
                    onChange={handleChange}
                    className="ml-2 border border-[#334155] rounded-md px-2 py-1 bg-[#1e293b] text-white"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Lucida Console">Lucida Console</option>
                  </select>
                </label>

                {/* Email Font Size */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Email Font Size: <span className="text-[#0ff1ce]">{styles.emailFontSize}px</span></span>
                  <input
                    type="range"
                    name="emailFontSize"
                    min="12"
                    max="30"
                    value={styles.emailFontSize}
                    onChange={handleChange}
                    className="w-full accent-[#0ff1ce]"
                  />
                </label>

                {/* Question Font */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Question Font:</span>
                  <select
                    name="questionFont"
                    value={styles.questionFont}
                    onChange={handleChange}
                    className="ml-2 border border-[#334155] rounded-md px-2 py-1 bg-[#1e293b] text-white"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Lucida Console">Lucida Console</option>
                  </select>
                </label>

                {/* Question Font Size */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Question Font Size: <span className="text-[#0ff1ce]">{styles.questionFontSize}px</span></span>
                  <input
                    type="range"
                    name="questionFontSize"
                    min="12"
                    max="30"
                    value={styles.questionFontSize}
                    onChange={handleChange}
                    className="w-full accent-[#0ff1ce]"
                  />
                </label>

                {/* Answer Font */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Answer Font:</span>
                  <select
                    name="answerFont"
                    value={styles.answerFont}
                    onChange={handleChange}
                    className="ml-2 border border-[#334155] rounded-md px-2 py-1 bg-[#1e293b] text-white"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Lucida Console">Lucida Console</option>
                  </select>
                </label>

                {/* Answer Font Size */}
                <label className="block">
                  <span className="text-base text-[#7dd3fc]">Answer Font Size: <span className="text-[#0ff1ce]">{styles.answerFontSize}px</span></span>
                  <input
                    type="range"
                    name="answerFontSize"
                    min="12"
                    max="30"
                    value={styles.answerFontSize}
                    onChange={handleChange}
                    className="w-full accent-[#0ff1ce]"
                  />
                </label>
              </div>
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