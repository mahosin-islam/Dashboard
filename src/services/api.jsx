import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://mock-backend-hintro.vercel.app',
});

// ১. ড্যাশবোর্ড স্ট্যাটস (কার্ডের ডাটা: Total calls, Duration)
export const getDashboardStats = async (userId) => {
  try {
    const response = await API.get('/api/call-sessions/stats', {
      headers: { 'x-user-id': userId },
    });
    return response.data;
  } catch (error) {
    console.error("Stats Error:", error);
    return null;
  }
};

// ২. কল সেশন লিস্ট (নিচের টেবিলের ডাটা)
export const getCallSessions = async (userId) => {
  try {
    const response = await API.get('/api/call-sessions', {
      headers: { 'x-user-id': userId }
    });
    return response.data || []; 
  } catch (error) {
    console.error("Sessions Error:", error);
    return [];
  }
};

// ৩. ইউজার প্রোফাইল (হেডারে নাম এবং ছবি দেখানোর জন্য)
export const getUserProfile = async (userId) => {
  try {
    const response = await API.get('/api/auth/profile', {
      headers: { 'x-user-id': userId }
    });
    return response.data;
  } catch (error) {
    console.error("Profile Error:", error);
    return null;
  }
};

// ৪. ড্যাশবোর্ড অথেনটিকেশন (Context-এ ড্যাশবোর্ড স্ট্যাটাস চেক করতে)
export const getDashboardAuth = async (userId) => {
  try {
    const response = await API.get('/api/auth/dashboard', {
      headers: { 'x-user-id': userId }
    });
    return response.data;
  } catch (error) {
    console.error("Dashboard Auth Error:", error);
    return null;
  }
};