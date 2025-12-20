const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/users/login`,
    REGISTER: `${API_BASE_URL}/api/users/register`,
  },
  QUIZZES: {
    BASE: `${API_BASE_URL}/api/quizzes`,
    CATEGORIES: `${API_BASE_URL}/api/categories`,
    EXTERNAL: `${API_BASE_URL}/api/external-quizzes`,
  },
  SCORES: `${API_BASE_URL}/api/scores`,
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard/public/global`,
};

export default API_ENDPOINTS;
