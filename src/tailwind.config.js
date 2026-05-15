module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // এখানে তোমার থিমের নাম অনুযায়ী কালার দাও
        primary: {
          DEFAULT: '#6366f1', // Indigo-600 (Main theme color)
          light: '#eef2ff',    // Indigo-50
          dark: '#4338ca',     // Indigo-700
        },
        surface: {
          DEFAULT: '#ffffff',  // White (Cards/Tables)
          alt: '#f9fafb',      // Gray-50 (Background/Hover)
          border: '#f3f4f6',   // Gray-100 (Borders)
        },
        status: {
          success: '#15803d',  // Green-700
          successBg: '#f0fdf4',// Green-100
        },
        text: {
          main: '#111827',     // Gray-900
          muted: '#6b7280',    // Gray-500
        }
      },
      borderRadius: {
        'hintro': '1rem',      // consistent 16px radius
      }
    },
  },
  plugins: [],
}