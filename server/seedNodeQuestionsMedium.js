const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const nodeQuiz = {
  title: 'Node.js Programming Quiz',
  description: 'Test your knowledge of Node.js runtime',
  category: 'Node.js',
  difficulty: 'Medium',
  timeLimit: 20, // 20 minutes
  questions: [
    {
      questionText: 'What is the event loop in Node.js?',
      options: [
        'A mechanism that handles asynchronous operations',
        'A loop that runs forever',
        'A debugging tool',
        'A testing framework'
      ],
      correctAnswer: 'A mechanism that handles asynchronous operations',
      explanation: 'The event loop is a core concept in Node.js that allows handling of asynchronous operations in a non-blocking way.'
    },
    {
      questionText: 'What is the difference between require() and import?',
      options: [
        'require() is synchronous, import is asynchronous',
        'require() is CommonJS, import is ES6 modules',
        'require() is for Node.js, import is for browsers',
        'There is no difference'
      ],
      correctAnswer: 'require() is CommonJS, import is ES6 modules',
      explanation: 'require() is the CommonJS module system used in Node.js, while import is the ES6 module syntax that provides static module structure.'
    },
    {
      questionText: 'What is middleware in Express.js?',
      options: [
        'Functions that have access to request and response objects',
        'Database connections',
        'UI components',
        'Testing utilities'
      ],
      correctAnswer: 'Functions that have access to request and response objects',
      explanation: 'Middleware functions are functions that have access to the request object (req), response object (res), and the next function in the application\'s request-response cycle.'
    },
    {
      questionText: 'What is the purpose of the buffer module in Node.js?',
      options: [
        'To handle binary data',
        'To store strings',
        'To manage memory',
        'To handle HTTP requests'
      ],
      correctAnswer: 'To handle binary data',
      explanation: 'The Buffer class in Node.js is used to handle raw binary data, which is useful when working with TCP streams or file system operations.'
    },
    {
      questionText: 'What is the difference between fs.readFile() and fs.readFileSync()?',
      options: [
        'One is asynchronous, the other is synchronous',
        'One reads text files, the other reads binary files',
        'One is faster',
        'There is no difference'
      ],
      correctAnswer: 'One is asynchronous, the other is synchronous',
      explanation: 'fs.readFile() is asynchronous and doesn\'t block the event loop, while fs.readFileSync() is synchronous and blocks execution until the file is read.'
    },
    {
      questionText: 'What is the purpose of the EventEmitter class in Node.js?',
      options: [
        'To handle and trigger custom events',
        'To emit HTTP requests',
        'To manage file operations',
        'To handle database connections'
      ],
      correctAnswer: 'To handle and trigger custom events',
      explanation: 'EventEmitter is a class that facilitates communication between objects in Node.js by emitting and listening to events.'
    },
    {
      questionText: 'What is the purpose of the cluster module in Node.js?',
      options: [
        'To create child processes to utilize multiple CPU cores',
        'To cluster database connections',
        'To group similar modules',
        'To handle clustering of servers'
      ],
      correctAnswer: 'To create child processes to utilize multiple CPU cores',
      explanation: 'The cluster module allows you to create child processes that share server ports, enabling Node.js to take advantage of multi-core systems.'
    },
    {
      questionText: 'What is the difference between process.nextTick() and setImmediate()?',
      options: [
        'process.nextTick() runs before setImmediate()',
        'setImmediate() runs before process.nextTick()',
        'They run at the same time',
        'There is no difference'
      ],
      correctAnswer: 'process.nextTick() runs before setImmediate()',
      explanation: 'process.nextTick() callbacks are executed before the I/O events in the event loop, while setImmediate() callbacks are executed after I/O events.'
    },
    {
      questionText: 'What is the purpose of the stream module in Node.js?',
      options: [
        'To handle streaming data',
        'To handle video streaming',
        'To handle file streaming only',
        'To handle network streaming only'
      ],
      correctAnswer: 'To handle streaming data',
      explanation: 'Streams are objects that let you read data from a source or write data to a destination in a continuous fashion, useful for handling large amounts of data.'
    },
    {
      questionText: 'What is the purpose of the child_process module?',
      options: [
        'To spawn child processes',
        'To handle child components',
        'To manage child windows',
        'To handle child threads'
      ],
      correctAnswer: 'To spawn child processes',
      explanation: 'The child_process module allows you to spawn subprocesses in a similar manner to system calls, enabling you to run external commands.'
    },
    {
      questionText: 'What is the difference between spawn() and exec() in child_process?',
      options: [
        'spawn() returns a stream, exec() buffers the output',
        'spawn() is synchronous, exec() is asynchronous',
        'spawn() is for Windows, exec() is for Unix',
        'There is no difference'
      ],
      correctAnswer: 'spawn() returns a stream, exec() buffers the output',
      explanation: 'spawn() spawns a new process and returns a stream, while exec() spawns a shell and buffers the command output.'
    },
    {
      questionText: 'What is the purpose of the util module in Node.js?',
      options: [
        'To provide utility functions',
        'To handle utilities for databases',
        'To manage utility bills',
        'To handle utility testing'
      ],
      correctAnswer: 'To provide utility functions',
      explanation: 'The util module provides utility functions that are primarily designed for the needs of Node.js internal APIs.'
    },
    {
      questionText: 'What is the purpose of the crypto module in Node.js?',
      options: [
        'To provide cryptographic functionality',
        'To handle cryptocurrency',
        'To encrypt files only',
        'To handle secure connections only'
      ],
      correctAnswer: 'To provide cryptographic functionality',
      explanation: 'The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL\'s hash, HMAC, cipher, decipher, sign, and verify functions.'
    },
    {
      questionText: 'What is the purpose of the os module in Node.js?',
      options: [
        'To provide operating system related utility methods',
        'To handle operating system installation',
        'To manage OS updates',
        'To handle OS security'
      ],
      correctAnswer: 'To provide operating system related utility methods',
      explanation: 'The os module provides operating system-related utility methods and properties, allowing you to interact with the underlying operating system.'
    },
    {
      questionText: 'What is the difference between global and globalThis in Node.js?',
      options: [
        'globalThis is the standardized way to access the global object',
        'global is newer than globalThis',
        'global is for browsers, globalThis is for Node.js',
        'There is no difference'
      ],
      correctAnswer: 'globalThis is the standardized way to access the global object',
      explanation: 'globalThis is the standardized way to access the global this value across different JavaScript environments, while global is Node.js-specific.'
    },
    {
      questionText: 'What is the purpose of the timers module in Node.js?',
      options: [
        'To schedule functions to be executed in the future',
        'To measure time',
        'To handle timeouts',
        'To manage delays'
      ],
      correctAnswer: 'To schedule functions to be executed in the future',
      explanation: 'The timers module provides functions like setTimeout, setInterval, and setImmediate for scheduling function execution.'
    },
    {
      questionText: 'What is the purpose of the assert module in Node.js?',
      options: [
        'To write tests and assertions',
        'To assert conditions',
        'To validate input',
        'To handle errors'
      ],
      correctAnswer: 'To write tests and assertions',
      explanation: 'The assert module provides a simple set of assertion tests that can be used for unit testing and invariants.'
    },
    {
      questionText: 'What is the purpose of the v8 module in Node.js?',
      options: [
        'To get information about V8 engine',
        'To compile JavaScript',
        'To optimize performance',
        'To handle memory'
      ],
      correctAnswer: 'To get information about V8 engine',
      explanation: 'The v8 module exposes APIs that are specific to the version of V8 built into the Node.js binary, providing information about heap and statistics.'
    },
    {
      questionText: 'What is the purpose of the dns module in Node.js?',
      options: [
        'To perform DNS lookups',
        'To manage DNS servers',
        'To handle domain names',
        'To resolve IP addresses'
      ],
      correctAnswer: 'To perform DNS lookups',
      explanation: 'The dns module enables name resolution and provides functions for looking up DNS records and domain names.'
    },
    {
      questionText: 'What is the purpose of the inspector module in Node.js?',
      options: [
        'To enable V8 inspector integration',
        'To handle code inspection',
        'To debug applications',
        'To inspect modules'
      ],
      correctAnswer: 'To enable V8 inspector integration',
      explanation: 'The inspector module provides an API for interacting with the V8 inspector, enabling debugging and profiling capabilities.'
    }
  ]
};

async function seedQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing Node.js Medium quiz
    await Quiz.deleteMany({ category: 'Node.js', difficulty: 'Medium' });
    console.log('Removed existing Node.js Medium quizzes');

    // Add new Node.js Medium quiz
    const savedQuiz = await Quiz.create(nodeQuiz);
    console.log('Added new Node.js Medium quiz with ID:', savedQuiz._id);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quiz:', error);
    process.exit(1);
  }
}

seedQuiz();
