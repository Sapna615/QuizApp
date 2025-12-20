const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const pythonQuiz = {
  title: 'Python Programming Quiz',
  description: 'Test your knowledge of Python programming language',
  category: 'Python Programming',
  difficulty: 'Medium',
  timeLimit: 20, // 20 minutes for medium
  questions: [
    {
      questionText: 'Which Python feature enables functions to accept variable number of arguments?',
      options: ['*args', '**kwargs', 'Both A and B', 'varargs'],
      correctAnswer: 'Both A and B',
      explanation: '*args for positional arguments, **kwargs for keyword arguments.'
    },
    {
      questionText: 'Which collection provides key-value pairs?',
      options: ['list', 'set', 'dict', 'tuple'],
      correctAnswer: 'dict',
      explanation: 'dict stores data in key-value format.'
    },
    {
      questionText: 'What is the default value of an uninitialized variable in Python?',
      options: ['0', 'null', 'undefined', 'Variables must be initialized'],
      correctAnswer: 'Variables must be initialized',
      explanation: 'Python requires variables to be initialized before use.'
    },
    {
      questionText: 'Which exception is thrown when dividing by zero?',
      options: ['ValueError', 'ArithmeticError', 'ZeroDivisionError', 'RuntimeError'],
      correctAnswer: 'ZeroDivisionError',
      explanation: 'ZeroDivisionError is raised for division by zero.'
    },
    {
      questionText: 'Which keyword prevents method overriding?',
      options: ['@staticmethod', '@classmethod', '@final', 'Python has no final keyword'],
      correctAnswer: 'Python has no final keyword',
      explanation: 'Python does not have a built-in way to prevent method overriding.'
    },
    {
      questionText: 'Which class is the parent of all classes in Python?',
      options: ['System', 'Object', 'Base', 'object'],
      correctAnswer: 'object',
      explanation: 'Every class in Python inherits from object.'
    },
    {
      questionText: 'Which statement is used to handle exceptions?',
      options: ['try-except', 'if-else', 'error-check', 'throw-catch'],
      correctAnswer: 'try-except',
      explanation: 'try-except handles runtime exceptions.'
    },
    {
      questionText: 'Which method is called when an object is created?',
      options: ['__init__', '__new__', '__create__', '__constructor__'],
      correctAnswer: '__init__',
      explanation: '__init__ is called after object creation to initialize it.'
    },
    {
      questionText: 'Which access modifier allows access within the same module?',
      options: ['private', 'protected', 'public', 'Python uses naming conventions'],
      correctAnswer: 'Python uses naming conventions',
      explanation: 'Python uses underscore prefixes for access control.'
    },
    {
      questionText: 'Which keyword is used to call the parent class method?',
      options: ['this', 'super', 'parent', 'base'],
      correctAnswer: 'super',
      explanation: 'super() calls the parent class method.'
    },
    {
      questionText: 'Which of the following is not a built-in data structure?',
      options: ['list', 'set', 'tree', 'dict'],
      correctAnswer: 'tree',
      explanation: 'tree is not a built-in Python data structure.'
    },
    {
      questionText: 'Which loop is best when the number of iterations is known?',
      options: ['while', 'for', 'foreach', 'do-while'],
      correctAnswer: 'for',
      explanation: 'for loops suit fixed iteration counts.'
    },
    {
      questionText: 'Which module contains mathematical functions?',
      options: ['math', 'cmath', 'numpy', 'statistics'],
      correctAnswer: 'math',
      explanation: 'math module contains basic mathematical functions.'
    },
    {
      questionText: 'Which method converts strings to numbers?',
      options: ['int()', 'float()', 'str()', 'convert()'],
      correctAnswer: 'int()',
      explanation: 'int() converts a String to integer.'
    },
    {
      questionText: 'Which keyword is used to create abstract classes?',
      options: ['abstract', 'ABC', '@abstractmethod', 'Both B and C'],
      correctAnswer: 'Both B and C',
      explanation: 'ABC and @abstractmethod are used for abstract classes.'
    },
    {
      questionText: 'What will happen if a method has a return type annotation but no return statement?',
      options: ['It will compile', 'Returns None', 'Raises TypeError', 'Compiler ignores it'],
      correctAnswer: 'Returns None',
      explanation: 'Python functions without return statement return None.'
    },
    {
      questionText: 'Which is NOT a valid access modifier in Python?',
      options: ['public', 'private', 'protected', 'All are valid'],
      correctAnswer: 'All are valid',
      explanation: 'Python uses naming conventions rather than access modifiers.'
    },
    {
      questionText: 'Which statement releases system resources?',
      options: ['close()', 'del', 'with', 'Both A and C'],
      correctAnswer: 'Both A and C',
      explanation: 'close() and with statement help manage resources.'
    },
    {
      questionText: 'Which operator is used for short-circuit AND?',
      options: ['&', '&&', 'and', '&'],
      correctAnswer: 'and',
      explanation: 'and is the logical AND operator in Python.'
    },
    {
      questionText: 'Which collection maintains insertion order?',
      options: ['set', 'frozenset', 'dict', 'OrderedDict'],
      correctAnswer: 'dict',
      explanation: 'Python 3.7+ dictionaries maintain insertion order.'
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
    await Quiz.deleteMany({ category: 'Python Programming', difficulty: 'Medium' });
    console.log('Removed existing Medium Python quizzes');

    // Add the new Python quiz
    const savedQuiz = await Quiz.create(pythonQuiz);
    console.log('Added new Medium Python quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
