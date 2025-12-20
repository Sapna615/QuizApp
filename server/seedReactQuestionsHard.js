const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const reactQuiz = {
  title: 'React Programming Quiz',
  description: 'Test your knowledge of React library',
  category: 'React',
  difficulty: 'Hard',
  timeLimit: 20, // 20 minutes
  questions: [
    {
      questionText: 'What is the reconciliation algorithm in React?',
      options: [
        'The process of comparing two trees and determining the minimum set of changes',
        'A sorting algorithm for lists',
        'A styling algorithm',
        'A routing algorithm'
      ],
      correctAnswer: 'The process of comparing two trees and determining the minimum set of changes',
      explanation: 'The reconciliation algorithm (also known as diffing) is how React updates the DOM by comparing the new tree with the previous tree and calculating the minimal set of changes required.'
    },
    {
      questionText: 'What is the purpose of the Fiber architecture?',
      options: [
        'To improve styling performance',
        'To enable incremental rendering and better scheduling of work',
        'To handle routing',
        'To manage state'
      ],
      correctAnswer: 'To enable incremental rendering and better scheduling of work',
      explanation: 'Fiber is a new reconciliation algorithm that enables React to break rendering work into chunks, enabling incremental rendering and better prioritization of updates.'
    },
    {
      questionText: 'What is the difference between useState and useReducer?',
      options: [
        'useState is for primitives, useReducer for objects',
        'useState is simpler, useReducer for complex state logic with actions',
        'useState is faster',
        'There is no difference'
      ],
      correctAnswer: 'useState is simpler, useReducer for complex state logic with actions',
      explanation: 'useState is simpler for independent state variables, while useReducer is better for complex state logic that involves multiple sub-values or when the next state depends on the previous one.'
    },
    {
      questionText: 'What is the purpose of the Profiler API?',
      options: [
        'To profile application performance',
        'To debug errors',
        'To style components',
        'To handle routing'
      ],
      correctAnswer: 'To profile application performance',
      explanation: 'The Profiler API allows you to measure how often a React application renders and what the cost of rendering is, helping identify performance bottlenecks.'
    },
    {
      questionText: 'What is the purpose of the unstable_batchedUpdates API?',
      options: [
        'To batch multiple state updates together',
        'To handle errors',
        'To style components',
        'To manage routing'
      ],
      correctAnswer: 'To batch multiple state updates together',
      explanation: 'unstable_batchedUpdates forces React to batch multiple state updates into a single re-render, improving performance when multiple state updates occur.'
    },
    {
      questionText: 'What is the purpose of the Concurrent Mode in React?',
      options: [
        'To handle multiple components at once',
        'To allow React to interrupt rendering work and prioritize updates',
        'To improve styling',
        'To handle routing'
      ],
      correctAnswer: 'To allow React to interrupt rendering work and prioritize updates',
      explanation: 'Concurrent Mode allows React to prepare multiple versions of the UI simultaneously and interrupt rendering to handle high-priority updates, improving user experience.'
    },
    {
      questionText: 'What is the difference between forwardRef and createRef?',
      options: [
        'forwardRef is for functional components, createRef is for class components',
        'forwardRef passes refs through components, createRef creates refs',
        'forwardRef is faster',
        'There is no difference'
      ],
      correctAnswer: 'forwardRef passes refs through components, createRef creates refs',
      explanation: 'forwardRef lets components receive refs and pass them to child components, while createRef is used to create refs within a component.'
    },
    {
      questionText: 'What is the purpose of the getDerivedStateFromProps lifecycle method?',
      options: [
        'To update state based on props changes',
        'To handle API calls',
        'To style components',
        'To handle routing'
      ],
      correctAnswer: 'To update state based on props changes',
      explanation: 'getDerivedStateFromProps is called right before rendering and allows updating state based on props changes, replacing the old componentWillReceiveProps.'
    },
    {
      questionText: 'What is the purpose of the getSnapshotBeforeUpdate lifecycle method?',
      options: [
        'To capture information from the DOM before it is potentially changed',
        'To update state',
        'To handle API calls',
        'To style components'
      ],
      correctAnswer: 'To capture information from the DOM before it is potentially changed',
      explanation: 'getSnapshotBeforeUpdate is called right before DOM mutations and allows capturing information from the DOM (like scroll position) before it changes.'
    },
    {
      questionText: 'What is the purpose of the Error Boundary?',
      options: [
        'To catch JavaScript errors in child components and display fallback UI',
        'To handle API errors',
        'To validate props',
        'To style components'
      ],
      correctAnswer: 'To catch JavaScript errors in child components and display fallback UI',
      explanation: 'Error boundaries are React components that catch JavaScript errors in their child component tree, log errors, and display a fallback UI instead of the crashed component tree.'
    },
    {
      questionText: 'What is the purpose of the Portal API?',
      options: [
        'To render children into a different DOM subtree',
        'To handle routing',
        'To manage state',
        'To style components'
      ],
      correctAnswer: 'To render children into a different DOM subtree',
      explanation: 'Portals provide a way to render children into a DOM node that exists outside the hierarchy of the parent component, useful for modals and tooltips.'
    },
    {
      questionText: 'What is the purpose of the StrictMode component?',
      options: [
        'To highlight potential problems in an application',
        'To enforce strict typing',
        'To handle routing',
        'To style components'
      ],
      correctAnswer: 'To highlight potential problems in an application',
      explanation: 'StrictMode is a tool for highlighting potential problems in an application by activating additional checks and warnings for its descendants.'
    },
    {
      questionText: 'What is the purpose of the useImperativeHandle hook?',
      options: [
        'To customize the instance value exposed to parent components when using ref',
        'To handle imperative programming',
        'To manage state',
        'To handle API calls'
      ],
      correctAnswer: 'To customize the instance value exposed to parent components when using ref',
      explanation: 'useImperativeHandle customizes the instance value that is exposed to parent components when using ref, allowing you to control which methods are accessible.'
    },
    {
      questionText: 'What is the purpose of the useDebugValue hook?',
      options: [
        'To display custom labels for custom hooks in React DevTools',
        'To debug applications',
        'To handle errors',
        'To style components'
      ],
      correctAnswer: 'To display custom labels for custom hooks in React DevTools',
      explanation: 'useDebugValue can be used to display a custom label for custom hooks in React DevTools, making debugging easier.'
    },
    {
      questionText: 'What is the purpose of the flushSync function?',
      options: [
        'To force React to flush state updates synchronously',
        'To handle API calls',
        'To style components',
        'To manage routing'
      ],
      correctAnswer: 'To force React to flush state updates synchronously',
      explanation: 'flushSync forces React to flush the provided callback synchronously, ensuring that state updates are applied immediately rather than being batched.'
    },
    {
      questionText: 'What is the purpose of the useTransition hook?',
      options: [
        'To mark state updates as non-urgent',
        'To handle page transitions',
        'To transition between components',
        'To handle animations'
      ],
      correctAnswer: 'To mark state updates as non-urgent',
      explanation: 'useTransition lets you mark some state updates as transitions, making them non-urgent and allowing React to keep the UI responsive during large updates.'
    },
    {
      questionText: 'What is the purpose of the useDeferredValue hook?',
      options: [
        'To defer updating a value',
        'To handle deferred loading',
        'To defer component rendering',
        'To handle deferred API calls'
      ],
      correctAnswer: 'To defer updating a value',
      explanation: 'useDeferredValue lets you defer updating a part of the UI until the rest of the UI has finished rendering.'
    },
    {
      questionText: 'What is the purpose of the useSyncExternalStore hook?',
      options: [
        'To subscribe to external stores',
        'To sync external data',
        'To handle external APIs',
        'To sync with external databases'
      ],
      correctAnswer: 'To subscribe to external stores',
      explanation: 'useSyncExternalStore is a hook recommended for reading and subscribing to external data sources.'
    },
    {
      questionText: 'What is the purpose of the useId hook?',
      options: [
        'To generate unique IDs',
        'To identify components',
        'To handle user IDs',
        'To manage session IDs'
      ],
      correctAnswer: 'To generate unique IDs',
      explanation: 'useId is a hook for generating unique IDs that are stable across server and client renders, useful for accessibility attributes.'
    },
    {
      questionText: 'What is the purpose of the startTransition function?',
      options: [
        'To mark state updates as transitions',
        'To start page transitions',
        'To transition between routes',
        'To start animations'
      ],
      correctAnswer: 'To mark state updates as transitions',
      explanation: 'startTransition lets you mark state updates as transitions, allowing React to interrupt rendering when more urgent updates come in.'
    }
  ]
};

async function seedQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing React Hard quiz
    await Quiz.deleteMany({ category: 'React', difficulty: 'Hard' });
    console.log('Removed existing React Hard quizzes');

    // Add new React Hard quiz
    const savedQuiz = await Quiz.create(reactQuiz);
    console.log('Added new React Hard quiz with ID:', savedQuiz._id);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quiz:', error);
    process.exit(1);
  }
}

seedQuiz();
