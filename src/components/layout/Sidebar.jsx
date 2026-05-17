'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutDashboard, MessageSquare, Database, Terminal,
  Settings2, History, HelpCircle, X
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useUser(); // Context থেকে লজিক আনা

  const closeSidebar = () => setIsSidebarOpen(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Call insights', icon: <MessageSquare size={20} />, path: '/call-insights' },
    { name: 'Knowledge base', icon: <Database size={20} />, path: '/knowledge-base' },
    { name: 'Prompts', icon: <Terminal size={20} />, path: '/prompts' },
    { name: 'Boxy control', icon: <Settings2 size={20} />, path: '/boxy-control' },
  ];

  const footerItems = [
    { name: 'Feedback-history', icon: <History size={20} />, path: '/Feedback-history' },
    { name: 'feedback', icon: <HelpCircle size={20} />, path: '/feedback' },
  ];

  return (
    <>
      {/* মোবাইলে সাইডবার ওপেন থাকলে বাইরে ক্লিক করলে বন্ধ হওয়ার জন্য Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-brand-black/50 z-40 lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-surface-border flex flex-col h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:block
      `}>
        {/* মোবাইলে বন্ধ করার বাটন (X) */}
        <div className="flex items-center justify-between p-6">
          <h1 className="text-xl font-bold tracking-tight text-brand-text-main">HINTRO</h1>
          <button onClick={closeSidebar} className="lg:hidden text-brand-text-muted">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeSidebar} // ক্লিক করলে মোবাইলে সাইডবার বন্ধ হবে
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.path
                  ? 'bg-primary-light text-primary'
                  : 'text-brand-text-muted hover:bg-surface-alt'
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-4 mt-10 py-4 border-t border-surface-border space-y-1">
          {footerItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.path
                  ? 'bg-primary-light text-primary'
                  : 'text-brand-text-muted hover:bg-surface-alt'
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 mx-4 mb-6 bg-surface-alt rounded-hintro border border-surface-border">
          <p className="text-xs text-brand-text-muted mb-2">Need more minutes?</p>
          <button className="w-full py-2 bg-primary-light hover:bg-primary text-primary hover:text-white text-xs font-semibold rounded-lg transition-colors">
            Upgrade
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;