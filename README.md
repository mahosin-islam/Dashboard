# Hintro Frontend Dashboard Task

A clean, responsive, and professional mock-dashboard built with Next.js 14 and Tailwind CSS based on the Hintro Figma design guidelines.

## 🚀 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (With custom central theme config)
- **Icons:** Lucide React
- **State Management:** React Context API (For global user/sidebar states)

## ✨ Core Features Implemented
1. **Multi-User Simulation (u1 vs u2):** - **User 1 (u1):** Triggers empty states across the dashboard and call lists.
   - **User 2 (u2):** Leverages mock APIs to fetch and display dynamic, shifting data flows.
2. **Dynamic Call Insights:** Created a dedicated `/call-insights` route that safely captures and renders deep-dive details from the selected call utilizing browser session state mapping.
3. **Feedback System with LocalStorage:** Fully functional feedback submission engine that stores data locally in the browser and reads it instantly inside a beautiful `Feedback History` view (with an extra interactive delete feature).
4. **Strict Design System:** Followed the Figma color choices globally via `tailwind.config.js` to avoid any hardcoded hex codes in layout components.
5. **Time Formatter:** Converts raw API seconds values directly into standard clean formats (`XXm XXs`).
6. **Graceful Error/UX Handling:** Added custom `loading.js` (Skeleton Loader) and a premium custom `not-found.js` (404 Page).

## ⚙️ Setup & Run Instructions

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>