const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const reactQuiz = {
  title: 'React Programming Quiz',
  description: 'Test your knowledge of React library',
  category: 'React',
  difficulty: 'Easy',
  timeLimit: 20, // 20 minutes
  questions: [
    {
      questionText: 'What is React?',
      options: ['A database', 'A JavaScript library for building UIs', 'A CSS framework', 'A programming language'],
      correctAnswer: 'A JavaScript library for building UIs',
      explanation: 'React is a JavaScript library for building user interfaces, particularly web applications.'
    },
    {
      questionText: 'Which company created React?',
      options: ['Google', 'Microsoft', 'Facebook (Meta)', 'Amazon'],
      correctAnswer: 'Facebook (Meta)',
      explanation: 'React was created by Facebook (now Meta) and is maintained by them and the community.'
    },
    {
      questionText: 'What is the primary purpose of React components?',
      options: ['To store data', 'To break down UI into reusable pieces', 'To style applications', 'To handle routing'],
      correctAnswer: 'To break down UI into reusable pieces',
      explanation: 'React components allow you to break down the UI into independent, reusable pieces.'
    },
    {
      questionText: 'What is JSX?',
      options: ['JavaScript XML', 'A styling language', 'A database query language', 'A testing framework'],
      correctAnswer: 'JavaScript XML',
      explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
    },
    {
      questionText: 'Which method is used to update state in a class component?',
      options: ['updateState()', 'setState()', 'modifyState()', 'changeState()'],
      correctAnswer: 'setState()',
      explanation: 'setState() is the method used to update state in React class components.'
    },
    {
      questionText: 'What is a React Hook?',
      options: ['A debugging tool', 'A function that lets you use state and other React features', 'A styling method', 'A routing mechanism'],
      correctAnswer: 'A function that lets you use state and other React features',
      explanation: 'Hooks are functions that let you use state and other React features in functional components.'
    },
    {
      questionText: 'Which hook is used for side effects?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 'useEffect',
      explanation: 'useEffect is the hook used for performing side effects in functional components.'
    },
    {
      questionText: 'What is the virtual DOM?',
      options: ['A real DOM element', 'A JavaScript representation of the real DOM', 'A CSS framework', 'A database'],
      correctAnswer: 'A JavaScript representation of the real DOM',
      explanation: 'The virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates.'
    },
    {
      questionText: 'How do you pass data from parent to child component?',
      options: ['Using state', 'Using props', 'Using context', 'Using hooks'],
      correctAnswer: 'Using props',
      explanation: 'Props are used to pass data from parent components to child components in React.'
    },
    {
      questionText: 'What is the purpose of the key prop in React?',
      options: ['To style components', 'To uniquely identify elements in a list', 'To manage state', 'To handle events'],
      correctAnswer: 'To uniquely identify elements in a list',
      explanation: 'The key prop helps React identify which items have changed, been added, or been removed in a list.'
    },
    {
      questionText: 'Which method is called when a component is first created?',
      options: ['componentDidMount', 'componentDidUpdate', 'constructor', 'render'],
      correctAnswer: 'constructor',
      explanation: 'The constructor is called first when a component is created, before it mounts.'
    },
    {
      questionText: 'What is props short for?',
      options: ['Properties', 'Proposals', 'Prototypes', 'Procedures'],
      correctAnswer: 'Properties',
      explanation: 'Props is short for properties and are used to pass data to components.'
    },
    {
      questionText: 'What is the purpose of React Router?',
      options: ['To style components', 'To handle routing in React applications', 'To manage state', 'To fetch data'],
      correctAnswer: 'To handle routing in React applications',
      explanation: 'React Router is used for handling navigation and routing in React applications.'
    },
    {
      questionText: 'Which command creates a new React app?',
      options: ['npm create react-app', 'npx create-react-app', 'npm init react', 'react create'],
      correctAnswer: 'npx create-react-app',
      explanation: 'npx create-react-app is the command used to create a new React application.'
    },
    {
      questionText: 'What is the purpose of the return statement in a React component?',
      options: ['To end the function', 'To return JSX that will be rendered', 'To update state', 'To handle events'],
      correctAnswer: 'To return JSX that will be rendered',
      explanation: 'The return statement in a React component returns JSX that React will render to the DOM.'
    },
    {
      questionText: 'What is the difference between props and state?',
      options: ['Props are mutable, state is immutable', 'Props are read-only, state is mutable', 'Props are for styling, state is for data', 'There is no difference'],
      correctAnswer: 'Props are read-only, state is mutable',
      explanation: 'Props are read-only values passed from parent components, while state is mutable data managed within the component itself.'
    },
    {
      questionText: 'What is the purpose of the render method in a class component?',
      options: ['To initialize the component', 'To return JSX', 'To handle events', 'To update state'],
      correctAnswer: 'To return JSX',
      explanation: 'The render method returns the JSX that should be rendered to the DOM.'
    },
    {
      questionText: 'What is the purpose of the constructor in a React class component?',
      options: ['To initialize state and bind methods', 'To render JSX', 'To handle props', 'To mount the component'],
      correctAnswer: 'To initialize state and bind methods',
      explanation: 'The constructor is used to initialize the component state and bind methods to the component instance.'
    },
    {
      questionText: 'What is the purpose of the componentDidMount lifecycle method?',
      options: ['To run code after the component mounts', 'To run code before the component mounts', 'To run code when props change', 'To run code when state changes'],
      correctAnswer: 'To run code after the component mounts',
      explanation: 'componentDidMount is called immediately after the component is added to the DOM, making it ideal for API calls and subscriptions.'
    },
    {
      questionText: 'What is the purpose of the componentWillUnmount lifecycle method?',
      options: ['To clean up before component unmounts', 'To run code after component unmounts', 'To run code when props change', 'To run code when state changes'],
      correctAnswer: 'To clean up before component unmounts',
      explanation: 'componentWillUnmount is called immediately before the component is destroyed, allowing for cleanup of timers, subscriptions, or other operations.'
    }
  ]
};

async function seedQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing React Easy quiz
    await Quiz.deleteMany({ category: 'React', difficulty: 'Easy' });
    console.log('Removed existing React Easy quizzes');

    // Add new React Easy quiz
    const savedQuiz = await Quiz.create(reactQuiz);
    console.log('Added new React Easy quiz with ID:', savedQuiz._id);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quiz:', error);
    process.exit(1);
  }
}

seedQuiz();
