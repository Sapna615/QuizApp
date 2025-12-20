const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const pythonQuiz = {
  title: 'Python Programming Quiz',
  description: 'Test your knowledge of Python programming language',
  category: 'Python Programming',
  difficulty: 'Easy',
  timeLimit: 20, // 20 minutes for easy
  questions: [
    {
      questionText: 'Which keyword is used to create a function in Python?',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 'def',
      explanation: 'The "def" keyword is used to define functions in Python.'
    },
    {
      questionText: 'Which data type is used to store whole numbers?',
      options: ['float', 'str', 'int', 'bool'],
      correctAnswer: 'int',
      explanation: 'int stores integer (whole number) values.'
    },
    {
      questionText: 'Which symbol ends a Python statement?',
      options: [';', ',', '.', 'None'],
      correctAnswer: 'None',
      explanation: 'Python statements end with a newline, not a semicolon.'
    },
    {
      questionText: 'Which of the following is NOT a primitive data type in Python?',
      options: ['int', 'float', 'String', 'bool'],
      correctAnswer: 'String',
      explanation: 'String is a class, not a primitive type.'
    },
    {
      questionText: 'Which keyword creates an object?',
      options: ['create', 'object', 'new', 'class()'],
      correctAnswer: 'class()',
      explanation: 'Objects are created by calling the class name like a function.'
    },
    {
      questionText: 'Which operator is used for addition?',
      options: ['+', '-', '*', '/'],
      correctAnswer: '+',
      explanation: 'The + operator performs addition.'
    },
    {
      questionText: 'Python is a ___ language.',
      options: ['low-level', 'machine-level', 'high-level', 'binary'],
      correctAnswer: 'high-level',
      explanation: 'Python is a high-level programming language.'
    },
    {
      questionText: 'Which keyword is used to stop a loop?',
      options: ['stop', 'exit', 'break', 'quit'],
      correctAnswer: 'break',
      explanation: 'break exits the loop immediately.'
    },
    {
      questionText: 'Which function prints output to the console?',
      options: ['print()', 'console()', 'out.print()', 'display()'],
      correctAnswer: 'print()',
      explanation: 'Python uses print() to output data.'
    },
    {
      questionText: 'Which keyword declares a constant?',
      options: ['constant', 'final', 'static', 'Python has no constant keyword'],
      correctAnswer: 'Python has no constant keyword',
      explanation: 'Python does not have a built-in constant keyword.'
    },
    {
      questionText: 'Which of the following stores true/false?',
      options: ['int', 'boolean', 'float', 'bool'],
      correctAnswer: 'bool',
      explanation: 'bool stores only True or False values.'
    },
    {
      questionText: 'Which loop executes at least once?',
      options: ['for', 'while', 'do-while', 'foreach'],
      correctAnswer: 'while',
      explanation: 'Python does not have do-while loops.'
    },
    {
      questionText: 'What does PEP stand for?',
      options: ['Python Enhancement Proposal', 'Python Execution Plan', 'Python Error Protocol', 'Python Extension Package'],
      correctAnswer: 'Python Enhancement Proposal',
      explanation: 'PEP stands for Python Enhancement Proposal.'
    },
    {
      questionText: 'Which keyword is used to inherit a class?',
      options: ['extends', 'inherits', 'parent', 'class name in parentheses'],
      correctAnswer: 'class name in parentheses',
      explanation: 'Python uses class name in parentheses for inheritance.'
    },
    {
      questionText: 'Which of the following is used for comments?',
      options: ['#', '//', '<!-- -->', '**'],
      correctAnswer: '#',
      explanation: 'Single-line comments start with #.'
    },
    {
      questionText: 'Which Python collection does not allow duplicates?',
      options: ['list', 'set', 'tuple', 'dict'],
      correctAnswer: 'set',
      explanation: 'set collections do not allow duplicate elements.'
    },
    {
      questionText: 'Which file extension is used for Python files?',
      options: ['.py', '.python', '.pyth', '.pt'],
      correctAnswer: '.py',
      explanation: 'Python source code is saved in .py files.'
    },
    {
      questionText: 'Which operator compares two values?',
      options: ['=', '==', '===', '!='],
      correctAnswer: '==',
      explanation: '== checks if two values are equal.'
    },
    {
      questionText: 'Which keyword is used to import modules?',
      options: ['import', 'include', 'require', 'load'],
      correctAnswer: 'import',
      explanation: 'import is used to bring in modules.'
    },
    {
      questionText: 'Which function returns the type of a variable?',
      options: ['type()', 'typeof()', 'gettype()', 'class()'],
      correctAnswer: 'type()',
      explanation: 'type() returns the data type of a variable.'
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
    await Quiz.deleteMany({ category: 'Python Programming', difficulty: 'Easy' });
    console.log('Removed existing Easy Python quizzes');

    // Add the new Python quiz
    const savedQuiz = await Quiz.create(pythonQuiz);
    console.log('Added new Easy Python quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
