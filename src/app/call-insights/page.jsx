'use client';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { ArrowLeft, MessageSquare, Zap, } from 'lucide-react';

const CallInsights = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // ইউআরএল থেকে ডেটা নেওয়া
  const callId = searchParams.get('id') || 'N/A';
  const callName = searchParams.get('name') || 'Inbound Call';
  const durationRaw = searchParams.get('duration');

  // টাইম ফরম্যাট ফাংশন
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0m 0s";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Recent Calls</span>
      </button>

      {/* Header Section - এখন এটি ডাইনামিক */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{callName} Analysis</h1>
          <p className="text-gray-500 text-sm">Call ID: #{callId} | May 08, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Completed</span>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
            {formatTime(durationRaw)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-amber-500" />
              <h3 className="font-bold text-gray-900">AI Summary</h3>
            </div>
            {/* এখানে ডাটা অনুযায়ী ছোট লজিক দিতে পারো */}
            <p className="text-gray-600 leading-relaxed">
              This is a dynamic analysis for <strong>{callName}</strong>. 
              The conversation lasted {formatTime(durationRaw)}. AI has analyzed the transcript 
              and generated the following insights based on the user's interaction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={20} className="text-blue-500" />
              <h3 className="font-bold text-gray-900">Key Takeaways</h3>
            </div>
            <ul className="space-y-3">
              {[`Review session for ${callName}`, 'Check engagement metrics', 'Identify improvement areas'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Sentiment (Randomize for feel) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Call Sentiment</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-gray-600">Positive</span>
                <span className="text-xl font-bold text-green-600">
                  {Math.floor(Math.random() * (95 - 70) + 70)}% 
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[80%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallInsights;