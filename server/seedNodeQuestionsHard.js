const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const nodeQuiz = {
  title: 'Node.js Programming Quiz',
  description: 'Test your knowledge of Node.js runtime',
  category: 'Node.js',
  difficulty: 'Hard',
  timeLimit: 20, // 20 minutes
  questions: [
    {
      questionText: 'What is the difference between microtasks and macrotasks in the Node.js event loop?',
      options: [
        'Microtasks have higher priority and run before macrotasks',
        'Macrotasks have higher priority and run before microtasks',
        'They run at the same time',
        'There is no difference'
      ],
      correctAnswer: 'Microtasks have higher priority and run before macrotasks',
      explanation: 'Microtasks (like Promise callbacks) have higher priority and are executed after the current operation completes, before any macrotasks (like timers or I/O).'
    },
    {
      questionText: 'What is the purpose of the V8 engine\'s hidden class optimization?',
      options: [
        'To optimize property access by creating shared object shapes',
        'To hide classes from users',
        'To improve memory usage',
        'To handle inheritance'
      ],
      correctAnswer: 'To optimize property access by creating shared object shapes',
      explanation: 'Hidden classes are V8\'s way of optimizing property access by creating shared object shapes, allowing for faster property lookup and better performance.'
    },
    {
      questionText: 'What is the difference between process.env and process.argv?',
      options: [
        'process.env contains environment variables, process.argv contains command line arguments',
        'process.env contains arguments, process.argv contains environment variables',
        'They are the same',
        'process.env is read-only, process.argv is writable'
      ],
      correctAnswer: 'process.env contains environment variables, process.argv contains command line arguments',
      explanation: 'process.env contains the environment variables as key-value pairs, while process.argv contains the command line arguments passed when the Node.js process was launched.'
    },
    {
      questionText: 'What is the purpose of the worker_threads module?',
      options: [
        'To enable multi-threading in Node.js',
        'To handle web workers',
        'To manage thread pools',
        'To handle asynchronous operations'
      ],
      correctAnswer: 'To enable multi-threading in Node.js',
      explanation: 'The worker_threads module enables the use of threads that execute JavaScript in parallel, allowing for CPU-intensive operations to be offloaded from the main event loop.'
    },
    {
      questionText: 'What is the purpose of the inspector module in Node.js?',
      options: [
        'To provide debugging capabilities',
        'To inspect code quality',
        'To monitor performance',
        'To handle security inspections'
      ],
      correctAnswer: 'To provide debugging capabilities',
      explanation: 'The inspector module provides an API for interacting with the V8 inspector, enabling debugging and profiling capabilities for Node.js applications.'
    },
    {
      questionText: 'What is the difference between setImmediate() and setTimeout() with a 0ms delay?',
      options: [
        'setImmediate() runs in the check phase, setTimeout() runs in the timers phase',
        'setTimeout() runs faster than setImmediate()',
        'They run at the same time',
        'setImmediate() is for I/O, setTimeout() is for timers'
      ],
      correctAnswer: 'setImmediate() runs in the check phase, setTimeout() runs in the timers phase',
      explanation: 'setImmediate() callbacks are invoked in the check phase of the event loop, while setTimeout() callbacks run in the timers phase, which occurs earlier in the event loop cycle.'
    },
    {
      questionText: 'What is the purpose of the async_hooks module?',
      options: [
        'To track asynchronous resource lifecycle',
        'To handle async/await syntax',
        'To manage async functions',
        'To handle asynchronous errors'
      ],
      correctAnswer: 'To track asynchronous resource lifecycle',
      explanation: 'The async_hooks module provides an API to track asynchronous resources in Node.js, allowing you to monitor the lifecycle of async operations.'
    },
    {
      questionText: 'What is the difference between process.hrtime() and Date.now()?',
      options: [
        'process.hrtime() provides high-resolution time, Date.now() provides wall-clock time',
        'process.hrtime() is faster than Date.now()',
        'Date.now() is more accurate',
        'There is no difference'
      ],
      correctAnswer: 'process.hrtime() provides high-resolution time, Date.now() provides wall-clock time',
      explanation: 'process.hrtime() returns high-resolution time that is not affected by system clock adjustments, while Date.now() returns wall-clock time that can be affected by system time changes.'
    },
    {
      questionText: 'What is the purpose of the vm module in Node.js?',
      options: [
        'To compile and run JavaScript code in a sandboxed environment',
        'To handle virtual memory',
        'To manage virtual machines',
        'To handle virtual DOM'
      ],
      correctAnswer: 'To compile and run JavaScript code in a sandboxed environment',
      explanation: 'The vm module provides APIs for compiling and running JavaScript code in a sandboxed environment, allowing for isolated execution contexts.'
    },
    {
      questionText: 'What is the difference between Buffer.alloc() and Buffer.allocUnsafe()?',
      options: [
        'Buffer.alloc() initializes memory with zeros, Buffer.allocUnsafe() may contain old data',
        'Buffer.alloc() is faster, Buffer.allocUnsafe() is safer',
        'Buffer.alloc() is for strings, Buffer.allocUnsafe() is for binary',
        'There is no difference'
      ],
      correctAnswer: 'Buffer.alloc() initializes memory with zeros, Buffer.allocUnsafe() may contain old data',
      explanation: 'Buffer.alloc() creates a buffer with initialized memory (filled with zeros), while Buffer.allocUnsafe() creates a buffer without initializing the memory, which may contain old data.'
    },
    {
      questionText: 'What is the purpose of the perf_hooks module?',
      options: [
        'To measure performance metrics',
        'To handle performance hooks',
        'To monitor performance',
        'To optimize performance'
      ],
      correctAnswer: 'To measure performance metrics',
      explanation: 'The perf_hooks module provides performance measurement APIs, including PerformanceObserver and performance.now() for accurate timing measurements.'
    },
    {
      questionText: 'What is the difference between process.stdin and process.stdout?',
      options: [
        'process.stdin is for input, process.stdout is for output',
        'process.stdin is for errors, process.stdout is for normal output',
        'They are the same',
        'process.stdin is asynchronous, process.stdout is synchronous'
      ],
      correctAnswer: 'process.stdin is for input, process.stdout is for output',
      explanation: 'process.stdin is a readable stream connected to standard input, while process.stdout is a writable stream connected to standard output.'
    },
    {
      questionText: 'What is the purpose of the readline module?',
      options: [
        'To provide an interface for reading streams one line at a time',
        'To read files line by line',
        'To handle command line input',
        'To parse configuration files'
      ],
      correctAnswer: 'To provide an interface for reading streams one line at a time',
      explanation: 'The readline module provides an interface for reading data from a Readable stream one line at a time, commonly used for command-line interfaces.'
    },
    {
      questionText: 'What is the difference between process.exit() and process.abort()?',
      options: [
        'process.exit() performs cleanup, process.abort() terminates immediately',
        'process.exit() is for errors, process.abort() is for success',
        'process.exit() is synchronous, process.abort() is asynchronous',
        'There is no difference'
      ],
      correctAnswer: 'process.exit() performs cleanup, process.abort() terminates immediately',
      explanation: 'process.exit() performs cleanup and exits gracefully, while process.abort() terminates the Node.js process immediately and generates a core file.'
    },
    {
      questionText: 'What is the purpose of the trace_events module?',
      options: [
        'To trace V8 execution and garbage collection',
        'To handle event tracing',
        'To monitor events',
        'To debug events'
      ],
      correctAnswer: 'To trace V8 execution and garbage collection',
      explanation: 'The trace_events module provides a mechanism to trace V8 execution, garbage collection, and other runtime events for performance analysis.'
    },
    {
      questionText: 'What is the purpose of the wasi module in Node.js?',
      options: [
        'To implement WebAssembly System Interface',
        'To handle WebAssembly',
        'To manage WASI modules',
        'To handle system interfaces'
      ],
      correctAnswer: 'To implement WebAssembly System Interface',
      explanation: 'The WASI module provides an implementation of the WebAssembly System Interface specification for Node.js.'
    },
    {
      questionText: 'What is the purpose of the diagnostics_channel module in Node.js?',
      options: [
        'To provide named channels for diagnostics',
        'To handle diagnostics',
        'To monitor diagnostics',
        'To debug diagnostics'
      ],
      correctAnswer: 'To provide named channels for diagnostics',
      explanation: 'The diagnostics_channel module provides an experimental API for creating named channels for diagnostics and logging purposes.'
    },
    {
      questionText: 'What is the purpose of the report module in Node.js?',
      options: [
        'To generate diagnostic reports',
        'To handle reporting',
        'To manage reports',
        'To create reports'
      ],
      correctAnswer: 'To generate diagnostic reports',
      explanation: 'The report module provides a mechanism for generating diagnostic reports on demand, useful for debugging production issues.'
    },
    {
      questionText: 'What is the purpose of the worker_threads module?',
      options: [
        'To enable multi-threading in Node.js',
        'To handle web workers',
        'To manage thread pools',
        'To handle asynchronous operations'
      ],
      correctAnswer: 'To enable multi-threading in Node.js',
      explanation: 'The worker_threads module enables the use of threads that execute JavaScript in parallel, allowing for CPU-intensive operations to be offloaded from the main event loop.'
    },
    {
      questionText: 'What is the purpose of the perf_hooks module in Node.js?',
      options: [
        'To measure performance metrics',
        'To handle performance hooks',
        'To monitor performance',
        'To optimize performance'
      ],
      correctAnswer: 'To measure performance metrics',
      explanation: 'The perf_hooks module provides APIs for measuring performance, including high-resolution timers and performance observation capabilities.'
    }
  ]
};

async function seedQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing Node.js Hard quiz
    await Quiz.deleteMany({ category: 'Node.js', difficulty: 'Hard' });
    console.log('Removed existing Node.js Hard quizzes');

    // Add new Node.js Hard quiz
    const savedQuiz = await Quiz.create(nodeQuiz);
    console.log('Added new Node.js Hard quiz with ID:', savedQuiz._id);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quiz:', error);
    process.exit(1);
  }
}

seedQuiz();
