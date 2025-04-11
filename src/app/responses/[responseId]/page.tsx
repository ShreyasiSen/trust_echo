'use client';

import { useEffect, useState } from 'react';

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
      const code = `<iframe src="${src}" style="width:100%;border:none;overflow:hidden;" frameborder="0" scrolling="no"></iframe>`;
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
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Customize Your Testimonial</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Background Color */}
        <label>
          Background Color:
          <input
            type="color"
            name="backgroundColor"
            value={styles.backgroundColor}
            onChange={handleChange}
            className="ml-2"
          />
        </label>

        {/* Text Color */}
        <label>
          Text Color:
          <input
            type="color"
            name="textColor"
            value={styles.textColor}
            onChange={handleChange}
            className="ml-2"
          />
        </label>

        {/* Padding */}
        <label>
          Padding: {styles.padding}px
          <input
            type="range"
            name="padding"
            min="0"
            max="50"
            value={styles.padding}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        {/* Border Radius */}
        <label>
          Border Radius: {styles.borderRadius}px
          <input
            type="range"
            name="borderRadius"
            min="0"
            max="50"
            value={styles.borderRadius}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        {/* Border Color */}
        <label>
          Border Color:
          <input
            type="color"
            name="borderColor"
            value={styles.borderColor}
            onChange={handleChange}
            className="ml-2"
          />
        </label>

        {/* Border Width */}
        <label>
          Border Width: {styles.borderWidth}px
          <input
            type="range"
            name="borderWidth"
            min="0"
            max="10"
            value={styles.borderWidth}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        {/* Name Font */}
        <label>
          Name Font:
          <select
            name="nameFont"
            value={styles.nameFont}
            onChange={handleChange}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1"
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
        <label>
          Name Font Size: {styles.nameFontSize}px
          <input
            type="range"
            name="nameFontSize"
            min="12"
            max="30"
            value={styles.nameFontSize}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        {/* Email Font */}
        <label>
          Email Font:
          <select
            name="emailFont"
            value={styles.emailFont}
            onChange={handleChange}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1"
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
        <label>
          Email Font Size: {styles.emailFontSize}px
          <input
            type="range"
            name="emailFontSize"
            min="12"
            max="30"
            value={styles.emailFontSize}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        {/* Question Font */}
        <label>
          Question Font:
          <select
            name="questionFont"
            value={styles.questionFont}
            onChange={handleChange}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1"
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
        <label>
          Question Font Size: {styles.questionFontSize}px
          <input
            type="range"
            name="questionFontSize"
            min="12"
            max="30"
            value={styles.questionFontSize}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        {/* Answer Font */}
        <label>
          Answer Font:
          <select
            name="answerFont"
            value={styles.answerFont}
            onChange={handleChange}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1"
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
        <label>
          Answer Font Size: {styles.answerFontSize}px
          <input
            type="range"
            name="answerFontSize"
            min="12"
            max="30"
            value={styles.answerFontSize}
            onChange={handleChange}
            className="w-full"
          />
        </label>
      
      </div>
      <div >
      <h2 className="text-xl font-semibold">Preview</h2>
      {responseId ? (
        <div
          style={{
            backgroundColor: styles.backgroundColor,
            color: styles.textColor,
            padding: `${styles.padding}px`,
            borderRadius: `${styles.borderRadius}px`,
            margin: 0,
            boxSizing: 'border-box',
          }}
        >

          <iframe
            src={`/api/embed/${responseId}?${new URLSearchParams(styles).toString()}`}
            style={{
              width: '100%',
              height: '600px', // or adjust as needed
              border: 'none',
              overflow: 'hidden',
              display: 'block',
            }}
          ></iframe>

        </div>
      ) : (
        <p>Loading preview...</p>
      )}


      <h2 className="text-xl font-semibold">Embed Code</h2>
      <textarea
        readOnly
        value={embedCode}
        className="w-full p-2 border border-gray-300 rounded-md font-mono"
        rows={4}
      ></textarea>
    </div>
        </div>
  );
}