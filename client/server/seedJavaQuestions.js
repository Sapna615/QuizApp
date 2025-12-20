const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const javaQuiz = {
  title: 'Java Programming Quiz',
  description: 'Test your knowledge of Java programming language',
  category: 'Java Programming',
  difficulty: 'Medium',
  timeLimit: 15, // 15 minutes
  questions: [
    {
      questionText: 'What is the output of: System.out.println(5 + "10" + 3);',
      options: [
        '18',
        '5103',
        '15',
        'Error'
      ],
      correctAnswer: '5103',
      explanation: 'In Java, the + operator with a String performs string concatenation. The expression is evaluated left to right: 5 + "10" becomes "510", then "510" + 3 becomes "5103"'
    },
    {
      questionText: 'Which of these is not a valid Java identifier?',
      options: [
        '_myVar',
        '$myVar',
        '1myVar',
        'my_var'
      ],
      correctAnswer: '1myVar',
      explanation: 'Java identifiers cannot start with a number'
    },
    {
      questionText: 'What is the size of int data type in Java?',
      options: [
        '1 byte',
        '2 bytes',
        '4 bytes',
        '8 bytes'
      ],
      correctAnswer: '4 bytes',
      explanation: 'In Java, int is always 4 bytes (32 bits) regardless of the platform'
    },
    {
      questionText: 'Which keyword is used for inheritance in Java?',
      options: [
        'extends',
        'implements',
        'inherits',
        'super'
      ],
      correctAnswer: 'extends',
      explanation: 'In Java, the "extends" keyword is used to inherit properties and methods from a class'
    },
    {
      questionText: 'What is the default value of a boolean variable in Java?',
      options: [
        'true',
        'false',
        '0',
        'null'
      ],
      correctAnswer: 'false',
      explanation: 'The default value of a boolean variable in Java is false'
    },
    {
      questionText: 'Which of these is not a primitive data type in Java?',
      options: [
        'int',
        'float',
        'String',
        'boolean'
      ],
      correctAnswer: 'String',
      explanation: 'String is a class in Java, not a primitive data type'
    },
    {
      questionText: 'What is the parent class of all classes in Java?',
      options: [
        'Object',
        'Class',
        'Main',
        'Super'
      ],
      correctAnswer: 'Object',
      explanation: 'The Object class is the root of the class hierarchy in Java'
    },
    {
      questionText: 'Which collection class implements a last-in-first-out (LIFO) data structure?',
      options: [
        'ArrayList',
        'LinkedList',
        'Stack',
        'Queue'
      ],
      correctAnswer: 'Stack',
      explanation: 'Stack is a LIFO (Last-In-First-Out) data structure in Java'
    },
    {
      questionText: 'What is the output of: System.out.println(10 + 20 + "30" + 40);',
      options: [
        '303040',
        '10203040',
        '303040',
        '303040'
      ],
      correctAnswer: '303040',
      explanation: 'First 10 + 20 is calculated (30), then concatenated with "30" ("3030"), then concatenated with 40 ("303040")'
    },
    {
      questionText: 'Which of these interfaces does not extend Collection interface?',
      options: [
        'List',
        'Set',
        'Map',
        'Queue'
      ],
      correctAnswer: 'Map',
      explanation: 'Map is a separate interface and does not extend the Collection interface'
    },
    {
      questionText: 'What is the purpose of the \'final\' keyword in Java?',
      options: [
        'To create a constant variable',
        'To prevent method overriding',
        'To prevent class inheritance',
        'All of the above'
      ],
      correctAnswer: 'All of the above',
      explanation: 'The final keyword can be used to make a variable constant, prevent method overriding, and prevent class inheritance'
    },
    {
      questionText: 'Which of these is not a valid way to create a thread in Java?',
      options: [
        'By extending Thread class',
        'By implementing Runnable interface',
        'By implementing Callable interface',
        'By extending Runnable interface'
      ],
      correctAnswer: 'By extending Runnable interface',
      explanation: 'Runnable is an interface and cannot be extended'
    },
    {
      questionText: 'What is the output of: System.out.println(1 + 2 + "3" + 4 + 5);',
      options: [
        '12345',
        '3345',
        '3345',
        '12345'
      ],
      correctAnswer: '3345',
      explanation: 'First 1 + 2 is calculated (3), then concatenated with "3" ("33"), then concatenated with 4 ("334"), then concatenated with 5 ("3345")'
    },
    {
      questionText: 'Which of these is a marker interface in Java?',
      options: [
        'Runnable',
        'Serializable',
        'Comparable',
        'Comparator'
      ],
      correctAnswer: 'Serializable',
      explanation: 'Serializable is a marker interface as it does not contain any methods'
    },
    {
      questionText: 'What is the default value of a local variable in Java?',
      options: [
        '0',
        'null',
        'Depends on the data type',
        'Local variables must be initialized before use'
      ],
      correctAnswer: 'Local variables must be initialized before use',
      explanation: 'Local variables in Java must be initialized before they are used, they do not have default values'
    },
    {
      questionText: 'Which of these is true about method overloading in Java?',
      options: [
        'Methods must have the same return type',
        'Methods must have different parameter lists',
        'Methods must be in different classes',
        'Methods must be static'
      ],
      correctAnswer: 'Methods must have different parameter lists',
      explanation: 'Method overloading in Java requires methods to have the same name but different parameter lists (different number or types of parameters)'
    },
    {
      questionText: 'What is the output of: System.out.println("Hello".substring(1, 4));',
      options: [
        'Hel',
        'ell',
        'ello',
        'ell'
      ],
      correctAnswer: 'ell',
      explanation: 'The substring method in Java is zero-based and the end index is exclusive. So substring(1,4) returns characters from index 1 to 3'
    },
    {
      questionText: 'Which of these is not a valid Java 8 feature?',
      options: [
        'Lambda expressions',
        'Stream API',
        'var keyword',
        'Default methods in interfaces'
      ],
      correctAnswer: 'var keyword',
      explanation: 'The var keyword for local variable type inference was introduced in Java 10, not Java 8'
    },
    {
      questionText: 'What is the correct way to create an ArrayList that can store only String objects?',
      options: [
        'ArrayList<String> list = new ArrayList<>();',
        'List<String> list = new ArrayList();',
        'Both A and B',
        'None of the above'
      ],
      correctAnswer: 'Both A and B',
      explanation: 'Both syntaxes are correct in Java. The diamond operator (<>) was introduced in Java 7 for type inference'
    },
    {
      questionText: 'Which of these is true about the finally block in exception handling?',
      options: [
        'It is always executed',
        'It is optional',
        'It is executed only if there is no exception',
        'Both A and B'
      ],
      correctAnswer: 'Both A and B',
      explanation: 'The finally block is always executed whether an exception occurs or not, and it is optional in a try-catch-finally construct'
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

    // Remove any existing Java quizzes (including API-fetched ones)
    await Quiz.deleteMany({ category: 'Java Programming', difficulty: 'Medium' });
    console.log('Removed existing Medium Java quizzes');

    // Add the new Java quiz
    const savedQuiz = await Quiz.create(javaQuiz);
    console.log('Added new Java quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
