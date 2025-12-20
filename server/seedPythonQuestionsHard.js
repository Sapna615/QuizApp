const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const pythonQuiz = {
  title: 'Python Programming Quiz',
  description: 'Test your knowledge of Python programming language',
  category: 'Python Programming',
  difficulty: 'Hard',
  timeLimit: 20, // 20 minutes for hard
  questions: [
    {
      questionText: 'Which garbage collection algorithm does Python primarily use?',
      options: ['Mark-Sweep', 'Reference Counting', 'Copying GC', 'Mark-Compact'],
      correctAnswer: 'Reference Counting',
      explanation: 'Python primarily uses reference counting with cyclic GC.'
    },
    {
      questionText: 'Which Python feature enables runtime resolution of method calls?',
      options: ['Static Binding', 'Dynamic Binding', 'Method Hiding', 'Overloading'],
      correctAnswer: 'Dynamic Binding',
      explanation: 'Python uses dynamic binding for method resolution.'
    },
    {
      questionText: 'Which class is used to create custom metaclasses?',
      options: ['MetaClass', 'type', 'Metaclass', 'ClassType'],
      correctAnswer: 'type',
      explanation: 'type is the default metaclass in Python.'
    },
    {
      questionText: 'Which of these is NOT a valid decorator?',
      options: ['@property', '@staticmethod', '@final', '@classmethod'],
      correctAnswer: '@final',
      explanation: '@final is not a built-in Python decorator.'
    },
    {
      questionText: 'What does the GIL (Global Interpreter Lock) guarantee?',
      options: ['Thread safety', 'Atomicity', 'Single thread execution', 'Memory safety'],
      correctAnswer: 'Single thread execution',
      explanation: 'GIL ensures only one thread executes Python bytecode at a time.'
    },
    {
      questionText: 'Which design pattern ensures only one instance of a class?',
      options: ['Factory', 'Singleton', 'Builder', 'Adapter'],
      correctAnswer: 'Singleton',
      explanation: 'Singleton restricts instantiation to one instance.'
    },
    {
      questionText: 'Which data structure does dict use internally in Python 3.7+?',
      options: ['Array of linked lists', 'Hash table with probing', 'Red-Black Tree', 'Skip list'],
      correctAnswer: 'Hash table with probing',
      explanation: 'Python dictionaries use hash tables with open addressing.'
    },
    {
      questionText: 'Which concept allows removing type information at runtime?',
      options: ['Reflection', 'Type Erasure', 'Polymorphism', 'Duck typing'],
      correctAnswer: 'Duck typing',
      explanation: 'Python uses duck typing - type is determined at runtime.'
    },
    {
      questionText: 'Which method wakes a waiting thread?',
      options: ['resume()', 'notify()', 'start()', 'wake()'],
      correctAnswer: 'notify()',
      explanation: 'notify() wakes a single waiting thread (in threading module).'
    },
    {
      questionText: 'Which algorithm does sorted() use?',
      options: ['QuickSort', 'MergeSort', 'Timsort', 'HeapSort'],
      correctAnswer: 'Timsort',
      explanation: 'Python uses Timsort for sorting.'
    },
    {
      questionText: 'Which annotation indicates type hints?',
      options: ['@type', '@hint', 'No annotation needed', '@Typed'],
      correctAnswer: 'No annotation needed',
      explanation: 'Type hints use colon syntax, not decorators.'
    },
    {
      questionText: 'What does the with keyword lock?',
      options: ['Object', 'Thread', 'Context manager', 'Heap'],
      correctAnswer: 'Context manager',
      explanation: 'with statement works with context managers.'
    },
    {
      questionText: 'Which of these is immutable?',
      options: ['list', 'dict', 'str', 'set'],
      correctAnswer: 'str',
      explanation: 'String objects cannot be changed after creation.'
    },
    {
      questionText: 'Which module is used for high-performance atomic operations?',
      options: ['atomic', 'threading', 'multiprocessing', 'asyncio'],
      correctAnswer: 'threading',
      explanation: 'threading module provides atomic operations through locks.'
    },
    {
      questionText: 'Which interface supports parallel execution?',
      options: ['concurrent.futures', 'asyncio', 'multiprocessing', 'All of the above'],
      correctAnswer: 'All of the above',
      explanation: 'Python provides multiple ways for parallel execution.'
    },
    {
      questionText: 'Which exception indicates deadlock?',
      options: ['DeadlockError', 'RuntimeError', 'No exception thrown', 'ThreadLockError'],
      correctAnswer: 'No exception thrown',
      explanation: 'Python does not throw exceptions for deadlocks.'
    },
    {
      questionText: 'Which file contains bytecode instructions?',
      options: ['.exe', '.py', '.pyc', '.jar'],
      correctAnswer: '.pyc',
      explanation: '.pyc files contain compiled Python bytecode.'
    },
    {
      questionText: 'Which Python feature allows behavior to be passed as an argument?',
      options: ['Generators', 'Lambdas', 'Inheritance', 'Interfaces'],
      correctAnswer: 'Lambdas',
      explanation: 'Lambdas represent behavior as data.'
    },
    {
      questionText: 'Which collection is thread-safe?',
      options: ['list', 'dict', 'queue.Queue', 'set'],
      correctAnswer: 'queue.Queue',
      explanation: 'queue.Queue is designed for thread-safe operations.'
    },
    {
      questionText: 'Which class can create immutable collections?',
      options: ['frozenset', 'tuple', 'Both A and B', 'Immutable'],
      correctAnswer: 'Both A and B',
      explanation: 'frozenset and tuple are built-in immutable collections.'
    }
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Remove any existing Python quizzes
    await Quiz.deleteMany({ category: 'Python Programming', difficulty: 'Hard' });
    console.log('Removed existing Hard Python quizzes');

    // Add the new Python quiz
    const savedQuiz = await Quiz.create(pythonQuiz);
    console.log('Added new Hard Python quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
