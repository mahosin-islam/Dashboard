'use client';
import { useState } from 'react';

export default function FeedbackPage() {
  const [feedbackText, setFeedbackText] = useState(''); // টেক্সট রাখার জন্য স্টেট
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ১. নতুন ফিডব্যাক অবজেক্ট তৈরি
    const newFeedback = {
      id: Date.now(),
      message: feedbackText,
      date: new Date().toLocaleString(),
    };

    // ২. লোকাল স্টোরেজ থেকে আগের ডেটা আনা (না থাকলে খালি অ্যারে)
    const existingFeedbacks = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');

    // ৩. নতুন ফিডব্যাকটি অ্যারের শুরুতে যোগ করা
    const updatedFeedbacks = [newFeedback, ...existingFeedbacks];

    // ৪. লোকাল স্টোরেজে সেভ করা
    localStorage.setItem('hintro_feedbacks', JSON.stringify(updatedFeedbacks));

    // ৫. ফর্ম ক্লিয়ার এবং সাকসেস মেসেজ
    setSubmitted(true);
    setFeedbackText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Give your feedback</h1>
      
      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg animate-bounce">
          Thank you! Your feedback has been saved to LocalStorage.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea 
          required
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)} // ভ্যালু আপডেট
          className="w-full p-4 border border-gray-200 rounded-xl mb-4 h-32 focus:outline-none focus:ring-1 focus:ring-black text-gray-800"
          placeholder="How can we improve Hintro?"
        />
        <button type="submit" className="cursor-pointer bg-black text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}