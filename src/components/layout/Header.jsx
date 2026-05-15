'use client';
import { useState, useEffect } from 'react';
import { PlayCircle, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { getUserProfile } from '@/services/api'; // API ইমপোর্ট

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [profile, setProfile] = useState(null); // প্রোফাইল স্টেট
  const { setIsSidebarOpen, userId, setUserId } = useUser();

 

  // ইউজার প্রোফাইল ফেচ করা
  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getUserProfile(userId);
      setProfile(data);
    };
    fetchProfileData();
  }, [userId]);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
      {/* বাম পাশ */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      {/* ডান পাশ */}
      <div className="flex items-center gap-2 lg:gap-6">
        
        {/* ইউজার সুইচার */}
        <div className="flex items-center bg-gray-100 rounded-full p-1 scale-90 lg:scale-100">
          <button 
            onClick={() => setUserId('u1')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              userId === 'u1' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
            }`}
          >u1</button>
          <button 
            onClick={() => setUserId('u2')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              userId === 'u2' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
            }`}
          >u2</button>
        </div>

        {/* টিউটোরিয়াল */}
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
          <PlayCircle size={20} className="text-gray-400" />
          <span className="hidden md:inline">How it works</span>
        </button>

        {/* প্রোফাইল ড্রপডাউন */}
        <div className="relative">
          <button 
            onClick={() => setShowLogout(!showLogout)}
            className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
          >
            {/* প্রোফাইল ইমেজ/লেটার */}
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {profile?.name ? profile.name[0].toUpperCase() : 'S'}
            </div>
            
            <div className="hidden lg:block text-left">
               <p className="text-xs font-bold text-gray-900 leading-tight">
                 {profile?.name || 'Loading...'}
               </p>
               <p className="text-[10px] text-gray-500 italic">
                 {userId === 'u2' ? 'Pro Member' : 'Free User'}
               </p>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${showLogout ? 'rotate-180' : ''}`} />
          </button>

          {/* লগআউট মেনু */}
          {showLogout && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-2 border-b border-gray-50 lg:hidden text-xs font-bold text-gray-400 uppercase tracking-widest">
                Account
              </div>
              <button 
                onClick={() => alert('Logging out...')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;