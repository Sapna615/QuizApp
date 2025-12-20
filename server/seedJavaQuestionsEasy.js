const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const javaQuiz = {
  title: 'Java Programming Quiz',
  description: 'Test your knowledge of Java programming language',
  category: 'Java Programming',
  difficulty: 'Easy',
  timeLimit: 20, // 20 minutes for easy
  questions: [
    // Add your Java questions here following this format:
{
  questionText: 'Which keyword is used to create a class in Java?',
  options: ['class', 'struct', 'define', 'object'],
  correctAnswer: 'class',
  explanation: 'The "class" keyword is used to declare a class in Java.'
},
{
  questionText: 'Which method is the entry point of a Java program?',
  options: ['start()', 'main()', 'run()', 'execute()'],
  correctAnswer: 'main()',
  explanation: 'Java programs start execution from the main() method.'
},
{
  questionText: 'Which data type is used to store whole numbers?',
  options: ['int', 'double', 'char', 'boolean'],
  correctAnswer: 'int',
  explanation: 'int stores integer (whole number) values.'
},
{
  questionText: 'What is the correct file extension for Java files?',
  options: ['.jav', '.jv', '.java', '.class'],
  correctAnswer: '.java',
  explanation: 'Source code is saved in .java files.'
},
{
  questionText: 'Which symbol ends a Java statement?',
  options: ['.', ',', ';', ':'],
  correctAnswer: ';',
  explanation: 'Every Java statement ends with a semicolon.'
},
{
  questionText: 'Which of the following is NOT a primitive data type?',
  options: ['int', 'double', 'String', 'char'],
  correctAnswer: 'String',
  explanation: 'String is a class, not a primitive type.'
},
{
  questionText: 'Which keyword creates an object?',
  options: ['create', 'object', 'new', 'construct'],
  correctAnswer: 'new',
  explanation: 'The new keyword allocates memory for objects.'
},
{
  questionText: 'Which operator is used for addition?',
  options: ['+', '-', '*', '/'],
  correctAnswer: '+',
  explanation: 'The + operator performs addition.'
},
{
  questionText: 'Java is a ___ language.',
  options: ['low-level', 'machine-level', 'high-level', 'binary'],
  correctAnswer: 'high-level',
  explanation: 'Java is a high-level programming language.'
},
{
  questionText: 'Which keyword is used to stop a loop?',
  options: ['stop', 'exit', 'break', 'quit'],
  correctAnswer: 'break',
  explanation: 'break exits the loop immediately.'
},
{
  questionText: 'Which function prints output to the console?',
  options: ['print()', 'System.out.print()', 'console()', 'out.print()'],
  correctAnswer: 'System.out.print()',
  explanation: 'Java uses System.out to output data.'
},
{
  questionText: 'Which keyword declares a constant?',
  options: ['constant', 'final', 'static', 'const'],
  correctAnswer: 'final',
  explanation: 'final makes a variable constant.'
},
{
  questionText: 'Which of the following stores true/false?',
  options: ['int', 'boolean', 'float', 'char'],
  correctAnswer: 'boolean',
  explanation: 'boolean stores only true or false values.'
},
{
  questionText: 'Which loop executes at least once?',
  options: ['for', 'while', 'do-while', 'foreach'],
  correctAnswer: 'do-while',
  explanation: 'do-while executes the loop body before checking the condition.'
},
{
  questionText: 'What does JVM stand for?',
  options: ['Java Variable Machine', 'Java Virtual Machine', 'Java Visual Mode', 'Just Virtual Memory'],
  correctAnswer: 'Java Virtual Machine',
  explanation: 'JVM runs Java bytecode.'
},
{
  questionText: 'Which keyword is used to inherit a class?',
  options: ['extends', 'inherits', 'parent', 'super'],
  correctAnswer: 'extends',
  explanation: 'extends is used for inheritance.'
},
{
  questionText: 'Which of the following is used for comments?',
  options: ['#', '//', '<!-- -->', '**'],
  correctAnswer: '//',
  explanation: 'Single-line comments start with //.'
},
{
  questionText: 'Which Java collection does not allow duplicates?',
  options: ['List', 'Set', 'ArrayList', 'Queue'],
  correctAnswer: 'Set',
  explanation: 'Set collections do not allow duplicate elements.'
},
{
  questionText: 'Where are Java classes stored after compilation?',
  options: ['.java files', '.exe files', '.class files', '.bin files'],
  correctAnswer: '.class files',
  explanation: 'Java compiler generates .class bytecode files.'
},
{
  questionText: 'Which operator compares two values?',
  options: ['=', '==', '===', '!='],
  correctAnswer: '==',
  explanation: '== checks if two values are equal.'
},
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Remove any existing Java quizzes
    await Quiz.deleteMany({ category: 'Java Programming', difficulty: 'Easy' });
    console.log('Removed existing Easy Java quizzes');

    // Add the new Java quiz
    const savedQuiz = await Quiz.create(javaQuiz);
    console.log('Added new Easy Java quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
