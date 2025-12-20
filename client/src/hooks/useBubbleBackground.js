import { useLocation } from 'react-router-dom';

// Pages that should show bubble background
const BUBBLE_PAGES = [
  '/',           // Home
  '/login',      // Login
  '/register',   // Signup/Register
  '/about',      // About
  '/contact',    // Contact (if exists)
  '/admin',      // Admin
  '/quizzes',    // Quiz List page
  '/leaderboard' // Leaderboard
];

// Pages that should NOT show bubble background
const NO_BUBBLE_PAGES = [
  '/quiz-start', // Quiz Start Page
  '/quiz/'       // Quiz Question and Results Pages (dynamic route)
];

export const useBubbleBackground = () => {
  const location = useLocation();
  
  // Check if current path should show bubbles
  const shouldShowBubbles = BUBBLE_PAGES.some(path => 
    location.pathname === path || location.pathname.startsWith(path)
  ) && !NO_BUBBLE_PAGES.some(path => 
    location.pathname.startsWith(path)
  );

  return shouldShowBubbles;
};
