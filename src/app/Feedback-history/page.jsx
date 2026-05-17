'use client';
import { useEffect, useState } from 'react';
import { MessageSquare, Clock, Trash2 } from 'lucide-react';

export default function FeedbackHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedData = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');
    Promise.resolve().then(() => setHistory(savedData));
  }, []);

  // ডিলিট করার ফাংশন
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      const savedData = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');
      
      // নির্দিষ্ট ID বাদে বাকিগুলো ফিল্টার করা
      const updatedData = savedData.filter(item => item.id !== id);
      
      // লোকাল স্টোরেজে আপডেট করা
      localStorage.setItem('hintro_feedbacks', JSON.stringify(updatedData));

      setHistory(updatedData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
        <MessageSquare className="text-indigo-600" /> Feedback History
      </h1>

      {history.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-gray-500 font-medium">No feedback submitted yet. (User 1 Empty State)</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item.id} className="group bg-white p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed mb-3 italic">&quot;{item.message}&quot;</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={14} />
                    <span>Submitted on: {item.date}</span>
                  </div>
                </div>
                
                {/* ডিলিট বাটন */}
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete feedback"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}