const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const nodeQuiz = {
  title: 'Node.js Programming Quiz',
  description: 'Test your knowledge of Node.js runtime',
  category: 'Node.js',
  difficulty: 'Easy',
  timeLimit: 20, // 20 minutes
  questions: [
    {
      questionText: 'What is Node.js?',
      options: [
        'A JavaScript framework',
        'A JavaScript runtime built on Chrome\'s V8 engine',
        'A database system',
        'A CSS framework'
      ],
      correctAnswer: 'A JavaScript runtime built on Chrome\'s V8 engine',
      explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine that allows running JavaScript on the server side.'
    },
    {
      questionText: 'Which of the following is true about Node.js?',
      options: [
        'Node.js is multi-threaded',
        'Node.js runs in a single thread',
        'Node.js only works on Windows',
        'Node.js is a compiled language'
      ],
      correctAnswer: 'Node.js runs in a single thread',
      explanation: 'Node.js uses a single-threaded event loop model, which makes it efficient for I/O operations.'
    },
    {
      questionText: 'What is npm?',
      options: [
        'Node.js Package Manager',
        'New Programming Method',
        'Node Performance Monitor',
        'Network Protocol Manager'
      ],
      correctAnswer: 'Node.js Package Manager',
      explanation: 'npm is the Node.js Package Manager, used to install and manage JavaScript packages and dependencies.'
    },
    {
      questionText: 'Which method is used to start a Node.js server?',
      options: [
        'server.start()',
        'listen()',
        'run()',
        'execute()'
      ],
      correctAnswer: 'listen()',
      explanation: 'The listen() method is used to start a Node.js server and begin accepting connections on a specified port.'
    },
    {
      questionText: 'What is the default port for Node.js applications?',
      options: ['3000', '8080', '8000', 'There is no default port'],
      correctAnswer: 'There is no default port',
      explanation: 'Node.js does not have a default port. Developers must specify which port to use, commonly 3000 for development.'
    },
    {
      questionText: 'Which module is used to create a web server in Node.js?',
      options: ['http', 'fs', 'path', 'url'],
      correctAnswer: 'http',
      explanation: 'The built-in http module is used to create HTTP servers and clients in Node.js.'
    },
    {
      questionText: 'What is a callback function in Node.js?',
      options: [
        'A function passed as an argument to another function',
        'A function that calls itself',
        'A function that returns a value',
        'A function that handles errors'
      ],
      correctAnswer: 'A function passed as an argument to another function',
      explanation: 'A callback function is passed as an argument to another function and is executed after the completion of that function.'
    },
    {
      questionText: 'Which method is used to read a file in Node.js?',
      options: [
        'fs.readFile()',
        'file.read()',
        'readFile()',
        'fs.getFile()'
      ],
      correctAnswer: 'fs.readFile()',
      explanation: 'fs.readFile() is a method from the File System module used to read the contents of a file asynchronously.'
    },
    {
      questionText: 'What is the purpose of package.json?',
      options: [
        'To store project metadata and dependencies',
        'To compile JavaScript code',
        'To run tests',
        'To style the application'
      ],
      correctAnswer: 'To store project metadata and dependencies',
      explanation: 'package.json contains metadata about the project and lists the dependencies required for the application to run.'
    },
    {
      questionText: 'Which command is used to install packages in Node.js?',
      options: ['npm install', 'npm add', 'npm get', 'npm load'],
      correctAnswer: 'npm install',
      explanation: 'npm install is used to install packages listed in package.json or specific packages.'
    },
    {
      questionText: 'What is Node.js REPL?',
      options: [
        'Read-Eval-Print-Loop interactive shell',
        'A testing framework',
        'A database system',
        'A styling tool'
      ],
      correctAnswer: 'Read-Eval-Print-Loop interactive shell',
      explanation: 'REPL (Read-Eval-Print-Loop) is an interactive command-line shell for Node.js that allows you to execute JavaScript code.'
    },
    {
      questionText: 'Which module is used for handling file paths in Node.js?',
      options: ['path', 'fs', 'url', 'os'],
      correctAnswer: 'path',
      explanation: 'The path module provides utilities for working with file and directory paths in a cross-platform manner.'
    },
    {
      questionText: 'What is the purpose of process.exit() in Node.js?',
      options: [
        'To terminate the Node.js process',
        'To restart the application',
        'To log errors',
        'To handle requests'
      ],
      correctAnswer: 'To terminate the Node.js process',
      explanation: 'process.exit() is used to immediately terminate the current Node.js process.'
    },
    {
      questionText: 'Which object contains information about the current Node.js process?',
      options: ['process', 'system', 'app', 'node'],
      correctAnswer: 'process',
      explanation: 'The process object is a global object that provides information about the current Node.js process.'
    },
    {
      questionText: 'What is the purpose of module.exports in Node.js?',
      options: [
        'To export functions and objects from a module',
        'To import modules',
        'To compile code',
        'To handle errors'
      ],
      correctAnswer: 'To export functions and objects from a module',
      explanation: 'module.exports is used to export functions, objects, or values from a module so they can be used in other files.'
    },
    {
      questionText: 'What is the purpose of the console module in Node.js?',
      options: [
        'To print output to stdout and stderr',
        'To handle console applications',
        'To manage console UI',
        'To handle debugging'
      ],
      correctAnswer: 'To print output to stdout and stderr',
      explanation: 'The console module provides a simple debugging console that is similar to the JavaScript console mechanism provided by web browsers.'
    },
    {
      questionText: 'What is the purpose of the events module in Node.js?',
      options: [
        'To handle event-driven programming',
        'To handle DOM events',
        'To handle browser events',
        'To handle user events'
      ],
      correctAnswer: 'To handle event-driven programming',
      explanation: 'The events module provides the EventEmitter class which is central to Node.js asynchronous event-driven architecture.'
    },
    {
      questionText: 'What is the purpose of the url module in Node.js?',
      options: [
        'To parse and format URLs',
        'To handle routing',
        'To manage web URLs',
        'To handle API endpoints'
      ],
      correctAnswer: 'To parse and format URLs',
      explanation: 'The url module provides utilities for URL resolution and parsing, useful for working with query strings and URL components.'
    },
    {
      questionText: 'What is the purpose of the querystring module in Node.js?',
      options: [
        'To parse and format query strings',
        'To handle database queries',
        'To handle search queries',
        'To handle API queries'
      ],
      correctAnswer: 'To parse and format query strings',
      explanation: 'The querystring module provides utilities for parsing and formatting URL query strings, commonly used for handling HTTP request parameters.'
    },
    {
      questionText: 'What is the purpose of the path module in Node.js?',
      options: [
        'To handle and transform file paths',
        'To manage directory paths',
        'To handle URL paths',
        'To resolve file paths'
      ],
      correctAnswer: 'To handle and transform file paths',
      explanation: 'The path module provides utilities for working with file and directory paths across different operating systems.'
    }
  ]
};

async function seedQuiz() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing Node.js Easy quiz
    await Quiz.deleteMany({ category: 'Node.js', difficulty: 'Easy' });
    console.log('Removed existing Node.js Easy quizzes');

    // Add new Node.js Easy quiz
    const savedQuiz = await Quiz.create(nodeQuiz);
    console.log('Added new Node.js Easy quiz with ID:', savedQuiz._id);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding quiz:', error);
    process.exit(1);
  }
}

seedQuiz();
