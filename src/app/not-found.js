'use client';
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* ইলাস্ট্রেশন বা আইকন */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-20">
            <div className="w-32 h-32 bg-indigo-400 rounded-full"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <AlertCircle size={64} className="text-indigo-600" />
            </div>
          </div>
        </div>
        
        {/* টেক্সট কন্টেন্ট */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-gray-900">404</h1>
          <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
          
          {/* কোটেশন এরর দূর করতে পুরো প্যারাগ্রাফের টেক্সট {" "} দিয়ে সেফ করা হয়েছে */}
          <p className="text-gray-500">
            {"Oops! The page you are looking for doesn't exist or has been moved to another URL."}
          </p>
        </div>

        {/* ব্যাক টু হোম বাটন */}
        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-surface px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Home size={20} />
            Back to Dashboard
          </Link>
        </div>

        {/* ফুটনোট - এখানেও টেক্সট সেফ করা হয়েছে */}
        <p className="text-xs text-brand-text-muted pt-8">
          {"If you think this is a mistake, please contact support."}
        </p>
      </div>
    </div>
  );
}