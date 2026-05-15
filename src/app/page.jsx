'use client';
import { useState, useEffect } from 'react';
import { useUser } from "@/context/UserContext";
import StatCards from "@/components/dashboard/StatCards";
import EmptyState from '@/components/dashboard/EmptyState';
import { getCallSessions } from '@/services/api';
import CallList from '@/components/dashboard/CallList';

export default function DashboardPage() {
  const { userId } = useUser();
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  // কল লিস্ট ফেচ করার লজিক
  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      try {
        const response = await getCallSessions(userId);
        
        // API response থেকে callSessions অ্যারেটি বের করা
        const actualCalls = response?.callSessions || []; 
        setCalls(actualCalls); 
      } catch (err) {
        console.error("Fetch Error:", err);
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  }, [userId]);

  return (
    <div className="space-y-8 p-4 lg:p-0">
      
      {/* ১. Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hi, {userId === 'u1' ? 'New User' : 'Mahosin'} 👋 Welcome to Hintro
        </h1>
        <p className="text-gray-500 mt-1">Ready to make your next call smarter?</p>
        <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
          Start Call
        </button>
      </div>

      {/* ২. Stats Cards Section */}
      <StatCards />

      {/* ৩. Recent Calls Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent calls</h3>
        
        {loading ? (
          /* লোডিং স্টেট */
          <div className="bg-white p-10 border border-gray-100 rounded-2xl text-center shadow-sm">
            <p className="text-gray-500 animate-pulse">Loading calls...</p>
          </div>
        ) : calls.length > 0 ? (
          /* u2 বা ডাটা থাকলে: কল লিস্ট টেবিল */
          <CallList calls={calls} />
        ) : (
          /* u1 বা ডাটা না থাকলে: এম্পটি স্টেট */
          <EmptyState />
        )}
      </div>

    </div>
  );
}