'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icons from react-icons
import { motion } from 'framer-motion'; // Import motion for animations
import { z } from 'zod';
import { useRouter } from 'next/navigation';
const responseSchema = z.object({
  responderName: z.string().min(1, 'Name is required'),
  responderEmail: z.string().email('Invalid email address'),
  answers: z.array(z.string().min(1, 'Answer is required')),
  rating: z.number().min(1, 'Rating is required'),
  image: z.union([z.instanceof(File), z.null()]).optional(),  
  responderRole: z.string().optional(), 
});

export default function ResponseForm({ params }: { params: Promise<{ formId: string }> }) {
  const [formId, setFormId] = useState<string | null>(null);
  const [responderName, setResponderName] = useState('');
  const [responderEmail, setResponderEmail] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [improvementFeedback, setImprovementFeedback] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null); // State for the image
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [responderRole, setResponderRole] = useState<string | null>('Customer');
  const router = useRouter();
  useEffect(() => {
    const fetchFormId = async () => {
      const resolvedParams = await params;
      setFormId(resolvedParams.formId);
    };
    fetchFormId();
  }, [params]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}`);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions || []);
          setFormName(data.title || 'Feedback');
          setFormTitle(
            data.description ||
            'Your input helps us improve. Please take a moment to share your experience with our services. All feedback is appreciated!'
          );
        } else {
          console.error('Failed to load form questions.');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchQuestions();
    }
  }, [formId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      responseSchema.parse({
        responderName,
        responderEmail,
        answers,
        rating,
        image,
        responderRole
      });

      setSubmitting(true);
      const formData = new FormData();
      formData.append('responderName', responderName);
      formData.append('responderEmail', responderEmail);
      formData.append('questions', JSON.stringify(questions));
      formData.append('answers', JSON.stringify(answers));
      formData.append('rating', String(rating));
      formData.append('improvements', improvementFeedback);
      formData.append('responderRole', responderRole || 'Customer'); // Append the responder role
      if (image) {
        formData.append('image', image); // Append the image file
      }

      const response = await fetch(`/api/forms/${formId}/response`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/thankYou');
      }
      else {
        console.log("Error in response:", response.statusText);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Unexpected error:', err);
      }
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }



  return (
    <div className="min-h-screen font-sans bg-white  text-gray-800 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          className="bg-[#f5f7ff]  flex flex-col justify-center items-center px-6 py-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 70 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 font-serif text-center tracking-wide drop-shadow-sm text-indigo-700 "
          >
            {formName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 70 }}
            className="text-center text-lg md:text-xl font-medium italic max-w-md tracking-wide text-gray-600 "
          >
            “{formTitle}”
          </motion.p>
        </motion.div>

        {/* Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          className="col-span-2 bg-gradient-to-tr from-[#e3f2fd] via-[#dbeafe] to-[#f0f9ff]  flex items-center justify-center px-4 py-12"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-lg p-8 md:p-10 bg-white  shadow-xl rounded-3xl border border-gray-200  backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 text-center font-serif">Feedback Form</h2>

            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={responderName}
                  onChange={(e) => setResponderName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300  rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.responderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.responderName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={responderEmail}
                  onChange={(e) => setResponderEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300  rounded-lg shadow-sm bg-white  focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.responderEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.responderEmail}</p>
                )}
              </div>

              {questions.map((question, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold mb-1">
                    {question} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={answers[idx] || ''}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[idx] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    className="w-full px-4 py-2 border border-gray-300  rounded-lg shadow-sm bg-white  focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows={3}
                    required
                  />
                  {errors.answers && (
                    <p className="text-red-500 text-sm mt-1">{errors.answers}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Rate our services <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center space-x-2">{renderStars()}</div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 ">
                  Upload Your Image (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover shadow-md border border-gray-300 "
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200  flex items-center justify-center text-gray-500  font-semibold text-lg shadow-md">
                      <span>+</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-600  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mention the role in your organization (Eg:- Product Designer,Zeta)
                </label>
                <input
                  type="text"
                  onChange={(e) => setResponderRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300  rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.responderRole && (
                  <p className="text-red-500 text-sm mt-1">{errors.responderRole}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Ways to Improve (Optional)</label>
                <textarea
                  value={improvementFeedback}
                  onChange={(e) => setImprovementFeedback(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300  rounded-lg shadow-sm bg-white  focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={2}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-28 font-semibold py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer ${submitting
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}