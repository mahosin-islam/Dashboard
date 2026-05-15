import { UserProvider } from '@/context/UserContext';

import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-[#F9FAFB]">
        <UserProvider>
          {/* এখন Sidebar এবং Header এই Context এর ডেটা পাবে */}
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}