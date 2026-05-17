'use client';
import { useState, useEffect } from 'react';
// ✅ এখানে Menu আইকনটি যুক্ত করে দেওয়া হয়েছে
import { PlayCircle, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { getUserProfile } from '@/services/api'; 
import LogoutModal from '../shared/LogoutModal';

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 
  const [profile, setProfile] = useState(null); 
  const { setIsSidebarOpen, userId, setUserId } = useUser();

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getUserProfile(userId);
      setProfile(data);
    };
    fetchProfileData();
  }, [userId]);

  return (
    <>
      <header className="h-16 bg-surface border-b border-surface-border flex items-center justify-between px-4 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="lg:hidden p-2 text-brand-text-muted hover:bg-surface-alt rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg lg:text-xl font-semibold text-brand-text-main">Dashboard</h2>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 lg:gap-6">
          
          {/* User Switcher */}
          <div className="flex items-center bg-primary-light rounded-full p-1 scale-90 lg:scale-100">
            <button 
              onClick={() => setUserId('u1')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                userId === 'u1' ? 'bg-surface shadow-sm text-brand-text-muted' : 'text-brand-text-muted'
              }`}
            >
              u1
            </button>
            <button 
              onClick={() => setUserId('u2')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                userId === 'u2' ? 'bg-surface shadow-sm text-brand-text-black' : 'text-brand-text-muted'
              }`}
            >
              u2
            </button>
          </div>

          {/* Tutorial Button */}
          <button className="flex items-center gap-2 text-sm font-medium text-brand-text-muted hover:text-brand-text-black transition-colors cursor-pointer">
            <PlayCircle size={20} className="text-brand-text-muted" />
            <span className="hidden md:inline">How it works</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowLogout(!showLogout)}
              className="flex items-center gap-2 p-1 rounded-lg transition-colors border border-transparent hover:border-surface-border cursor-pointer"
            >
              {/* Profile Image/Letter */}
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-surface font-bold text-sm">
                {profile?.name ? profile.name[0].toUpperCase() : 'S'}
              </div>
              
              <div className="hidden lg:block text-left">
                 <p className="text-xs font-bold text-brand-text-main leading-tight">
                   {profile?.name || 'Loading...'}
                 </p>
                 <p className="text-[10px] text-brand-text-muted italic">
                   {userId === 'u2' ? 'Pro Member' : 'Free User'}
                 </p>
              </div>
              <ChevronDown size={16} className={`text-brand-text-muted transition-transform ${showLogout ? 'rotate-180' : ''}`} />
            </button>

            {/* Logout Menu Dropdown */}
            {showLogout && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-surface-border shadow-2xl rounded-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-2 border-b border-surface-border lg:hidden text-xs font-bold text-brand-text-muted uppercase tracking-widest">
                  Account
                </div>
                <button 
                  onClick={() => {
                    setShowLogout(false); 
                    setIsLogoutModalOpen(true); 
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-status-error hover:bg-status-error-bg transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Shared Headless UI Logout Modal */}
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirmLogout={() => console.log('User logged out, clearing session/tokens...')}
      />
    </>
  );
};

export default Header;