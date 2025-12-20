const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const reactQuiz = {
  title: 'React Programming Quiz',
  description: 'Test your knowledge of React library',
  category: 'React',
  difficulty: 'Medium',
  timeLimit: 20, // 20 minutes
  questions: [
    {
      questionText: 'What is the difference between controlled and uncontrolled components?',
      options: [
        'Controlled components use state, uncontrolled use refs',
        'Uncontrolled components use state, controlled use refs',
        'There is no difference',
        'Controlled components are faster'
      ],
      correctAnswer: 'Controlled components use state, uncontrolled use refs',
      explanation: 'Controlled components have their form data handled by React state, while uncontrolled components use refs to get form values directly from the DOM.'
    },
    {
      questionText: 'What is React.memo used for?',
      options: [
        'To memoize functions',
        'To memoize components and prevent unnecessary re-renders',
        'To store state',
        'To handle API calls'
      ],
      correctAnswer: 'To memoize components and prevent unnecessary re-renders',
      explanation: 'React.memo is a higher-order component that memoizes the rendered output of a component to prevent unnecessary re-renders.'
    },
    {
      questionText: 'What is the purpose of useCallback hook?',
      options: [
        'To memoize functions',
        'To memoize components',
        'To handle side effects',
        'To manage context'
      ],
      correctAnswer: 'To memoize functions',
      explanation: 'useCallback returns a memoized callback function that only changes if dependencies change, preventing unnecessary re-creations of functions.'
    },
    {
      questionText: 'What is the difference between useEffect and useLayoutEffect?',
      options: [
        'useEffect runs synchronously, useLayoutEffect runs asynchronously',
        'useLayoutEffect runs synchronously after DOM mutations, useEffect runs asynchronously',
        'There is no difference',
        'useEffect is for components, useLayoutEffect is for hooks'
      ],
      correctAnswer: 'useLayoutEffect runs synchronously after DOM mutations, useEffect runs asynchronously',
      explanation: 'useLayoutEffect fires synchronously after all DOM mutations, while useEffect fires asynchronously after the paint.'
    },
    {
      questionText: 'What is the purpose of the dependency array in useEffect?',
      options: [
        'To style the component',
        'To determine when the effect should re-run',
        'To pass props',
        'To handle errors'
      ],
      correctAnswer: 'To determine when the effect should re-run',
      explanation: 'The dependency array tells React when to re-run the effect - only when the dependencies have changed.'
    },
    {
      questionText: 'What is React Context used for?',
      options: [
        'To style components',
        'To pass data through the component tree without prop drilling',
        'To handle routing',
        'To manage forms'
      ],
      correctAnswer: 'To pass data through the component tree without prop drilling',
      explanation: 'React Context provides a way to pass data through the component tree without having to pass props down manually at every level.'
    },
    {
      questionText: 'What is the purpose of useReducer hook?',
      options: [
        'To handle API calls',
        'To manage complex state logic',
        'To style components',
        'To handle routing'
      ],
      correctAnswer: 'To manage complex state logic',
      explanation: 'useReducer is an alternative to useState for more complex state logic, especially when state depends on previous state.'
    },
    {
      questionText: 'What is lazy loading in React?',
      options: [
        'Loading data slowly',
        'Delaying loading of components until they are needed',
        'Loading images slowly',
        'A debugging technique'
      ],
      correctAnswer: 'Delaying loading of components until they are needed',
      explanation: 'Lazy loading allows you to defer loading of components until they are actually needed, improving initial load performance.'
    },
    {
      questionText: 'What is the purpose of Suspense in React?',
      options: [
        'To handle errors',
        'To display fallback content while waiting for components to load',
        'To manage state',
        'To handle routing'
      ],
      correctAnswer: 'To display fallback content while waiting for components to load',
      explanation: 'Suspense lets your components wait for something before rendering, showing fallback content in the meantime.'
    },
    {
      questionText: 'What is the difference between props and state?',
      options: [
        'Props are mutable, state is immutable',
        'Props are passed from parent, state is managed within component',
        'State is passed from parent, props are managed within component',
        'There is no difference'
      ],
      correctAnswer: 'Props are passed from parent, state is managed within component',
      explanation: 'Props are read-only values passed from parent components, while state is mutable data managed within the component itself.'
    },
    {
      questionText: 'What is the purpose of the key prop in lists?',
      options: [
        'To style list items',
        'To help React identify which items have changed',
        'To sort the list',
        'To handle click events'
      ],
      correctAnswer: 'To help React identify which items have changed',
      explanation: 'Keys help React identify which items in a list have changed, been added, or been removed, enabling efficient updates.'
    },
    {
      questionText: 'What is a higher-order component (HOC)?',
      options: [
        'A component with more props',
        'A function that takes a component and returns a new component',
        'A component with state',
        'A styled component'
      ],
      correctAnswer: 'A function that takes a component and returns a new component',
      explanation: 'A higher-order component is a function that takes a component as an argument and returns a new component with additional props or behavior.'
    },
    {
      questionText: 'What is the purpose of useRef hook?',
      options: [
        'To manage state',
        'To access DOM elements directly',
        'To handle API calls',
        'To style components'
      ],
      correctAnswer: 'To access DOM elements directly',
      explanation: 'useRef returns a mutable ref object whose .current property persists for the full lifetime of the component, commonly used to access DOM elements.'
    },
    {
      questionText: 'What is the difference between createElement and JSX?',
      options: [
        'createElement is for classes, JSX is for functions',
        'JSX is syntactic sugar for createElement',
        'createElement is faster',
        'There is no difference'
      ],
      correctAnswer: 'JSX is syntactic sugar for createElement',
      explanation: 'JSX gets compiled to React.createElement() calls, so JSX is essentially syntactic sugar for the createElement API.'
    },
    {
      questionText: 'What is the purpose of shouldComponentUpdate?',
      options: [
        'To update state',
        'To control whether a component should re-render',
        'To handle props',
        'To style components'
      ],
      correctAnswer: 'To control whether a component should re-render',
      explanation: 'shouldComponentUpdate is a lifecycle method that lets you control whether a component should re-render when receiving new props or state.'
    },
    {
      questionText: 'What is the difference between useMemo and useCallback?',
      options: [
        'useMemo memoizes values, useCallback memoizes functions',
        'useMemo memoizes functions, useCallback memoizes values',
        'They are the same',
        'useMemo is for components, useCallback is for hooks'
      ],
      correctAnswer: 'useMemo memoizes values, useCallback memoizes functions',
      explanation: 'useMemo returns a memoized value, while useCallback returns a memoized callback function.'
    },
    {
      questionText: 'What is the purpose of the useRef hook?',
      options: [
        'To manage state',
        'To access DOM elements directly',
        'To handle API calls',
        'To style components'
      ],
      correctAnswer: 'To access DOM elements directly',
      explanation: 'useRef returns a mutable ref object whose .current property persists for the full lifetime of the component, commonly used to access DOM elements.'
    },
    {
      questionText: 'What is the purpose of the useContext hook?',
      options: [
        'To consume context values',
        'To create context',
        'To update context',
        'To style context'
      ],
      correctAnswer: 'To consume context values',
      explanation: 'useContext accepts a context object and returns the current context value for that context.'
    },
    {
      questionText: 'What is the difference between useEffect and useLayoutEffect?',
      options: [
        'useEffect runs asynchronously, useLayoutEffect runs synchronously',
        'useLayoutEffect runs asynchronously, useEffect runs synchronously',
        'They run at the same time',
        'useEffect is for components, useLayoutEffect is for hooks'
      ],
      correctAnswer: 'useEffect runs asynchronously, useLayoutEffect runs synchronously',
      explanation: 'useLayoutEffect fires synchronously after all DOM mutations, while useEffect fires asynchronously after the paint.'
    },
    {
      questionText: 'What is the purpose of the useMemo hook?',
      options: [
        'To memoize expensive calculations',
        'To memoize functions',
        'To handle side effects',
        'To manage state'
      ],
      correctAnswer: 'To memoize expensive calculations',
      explanation: 'useMemo returns a memoized value, only recalculating when dependencies change, useful for expensive calculations.'
    }
  ]
};

async function seedQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing React Medium quiz
    await Quiz.deleteMany({ category: 'React', difficulty: 'Medium' });
    console.log('Removed existing React Medium quizzes');

    // Add new React Medium quiz
    const savedQuiz = await Quiz.create(reactQuiz);
    console.log('Added new React Medium quiz with ID:', savedQuiz._id);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quiz:', error);
    process.exit(1);
  }
}

seedQuiz();
