// src/context/UserContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // যদি API সরাসরি axios হয়, তবে axios অথবা তোমার তৈরি করা instance

// API instance তৈরি (যদি আগে না করা থাকে)
const API = axios.create({
  baseURL: 'https://api.test.com', // তোমার দেওয়া বেস URL টি এখানে বসাবে
});

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('u1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashStatus, setDashStatus] = useState(null);

  // /api/auth/dashboard কল করা
  useEffect(() => {
    const checkDashboardAuth = async () => {
      try {
        const response = await API.get('/api/auth/dashboard', {
          headers: { 'x-user-id': userId }
        });
        setDashStatus(response.data);
        console.log("Auth Dashboard Data:", response.data);
      } catch (error) {
        console.error("Dashboard Auth Error:", error);
      }
    };
    checkDashboardAuth();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, isSidebarOpen, setIsSidebarOpen, dashStatus }}>
      {children}
    </UserContext.Provider>
  );
};

// এই হুকটি অবশ্যই থাকতে হবে যাতে অন্য ফাইলে useUser() ব্যবহার করা যায়
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};