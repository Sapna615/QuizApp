const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const javaQuiz = {
  title: 'Java Programming Quiz',
  description: 'Test your knowledge of Java programming language',
  category: 'Java Programming',
  difficulty: 'Medium',
  timeLimit: 20, // 20 minutes
  questions: [
    // MEDIUM MODE QUESTIONS
{
  questionText: 'Which OOP concept allows methods to have the same name but different parameters?',
  options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
  correctAnswer: 'Polymorphism',
  explanation: 'Method overloading is a type of polymorphism.'
},
{
  questionText: 'Which collection provides key-value pairs?',
  options: ['List', 'Set', 'Map', 'Queue'],
  correctAnswer: 'Map',
  explanation: 'Map stores data in key-value format.'
},
{
  questionText: 'What is the default value of an uninitialized int variable?',
  options: ['0', 'null', 'undefined', 'not assigned'],
  correctAnswer: '0',
  explanation: 'Instance variables of primitive types get default values.'
},
{
  questionText: 'Which exception is thrown when dividing by zero?',
  options: ['NullPointerException', 'ArithmeticException', 'IOException', 'RuntimeException'],
  correctAnswer: 'ArithmeticException',
  explanation: 'Dividing by zero triggers ArithmeticException.'
},
{
  questionText: 'Which keyword prevents method overriding?',
  options: ['static', 'final', 'private', 'protected'],
  correctAnswer: 'final',
  explanation: 'final methods cannot be overridden.'
},
{
  questionText: 'Which class is the parent of all classes in Java?',
  options: ['System', 'Object', 'Class', 'Base'],
  correctAnswer: 'Object',
  explanation: 'Every class in Java inherits from Object.'
},
{
  questionText: 'Which statement is used to handle exceptions?',
  options: ['try-catch', 'if-else', 'error-check', 'throw-catch'],
  correctAnswer: 'try-catch',
  explanation: 'try-catch handles runtime exceptions.'
},
{
  questionText: 'Which method is called automatically during garbage collection?',
  options: ['cleanup()', 'dispose()', 'finalize()', 'destroy()'],
  correctAnswer: 'finalize()',
  explanation: 'finalize() is invoked before object removal.'
},
{
  questionText: 'Which access modifier allows access within the same package?',
  options: ['private', 'protected', 'default', 'public'],
  correctAnswer: 'default',
  explanation: 'Default access applies within the same package.'
},
{
  questionText: 'Which keyword is used to call the parent class constructor?',
  options: ['this', 'super', 'parent', 'base'],
  correctAnswer: 'super',
  explanation: 'super() calls the parent class constructor.'
},
{
  questionText: 'Which of the following is not an interface in Java?',
  options: ['Runnable', 'Serializable', 'Cloneable', 'String'],
  correctAnswer: 'String',
  explanation: 'String is a class, not an interface.'
},
{
  questionText: 'Which loop is best when the number of iterations is known?',
  options: ['while', 'do-while', 'for', 'foreach'],
  correctAnswer: 'for',
  explanation: 'for loops suit fixed iteration counts.'
},
{
  questionText: 'Which package contains ArrayList?',
  options: ['java.util', 'java.io', 'java.lang', 'java.data'],
  correctAnswer: 'java.util',
  explanation: 'ArrayList is inside java.util.'
},
{
  questionText: 'Which method converts strings to numbers?',
  options: ['valueOf()', 'parseInt()', 'toInt()', 'convert()'],
  correctAnswer: 'parseInt()',
  explanation: 'Integer.parseInt() converts a String to int.'
},
{
  questionText: 'Which keyword is used to declare an interface?',
  options: ['interface', 'class', 'abstract', 'implements'],
  correctAnswer: 'interface',
  explanation: 'interface declares an interface.'
},
{
  questionText: 'What will happen if a constructor has a return type?',
  options: ['It will compile', 'It becomes a method', 'Constructor overloads', 'Compiler ignores it'],
  correctAnswer: 'It becomes a method',
  explanation: 'Constructors cannot have return types.'
},
{
  questionText: 'Which is NOT a valid access modifier?',
  options: ['public', 'protected', 'private', 'friendly'],
  correctAnswer: 'friendly',
  explanation: 'There is no "friendly" keyword in Java.'
},
{
  questionText: 'Which statement releases system resources?',
  options: ['close()', 'end()', 'stop()', 'quit()'],
  correctAnswer: 'close()',
  explanation: 'Streams and readers release resources with close().'
},
{
  questionText: 'Which operator is used for short-circuit AND?',
  options: ['&', '&&', '|', '||'],
  correctAnswer: '&&',
  explanation: '&& evaluates second operand only if needed.'
},
{
  questionText: 'Which collection maintains insertion order?',
  options: ['HashSet', 'TreeSet', 'LinkedHashSet', 'PriorityQueue'],
  correctAnswer: 'LinkedHashSet',
  explanation: 'LinkedHashSet maintains insertion order.'
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
    await Quiz.deleteMany({ category: 'Java Programming', difficulty: 'Medium' });
    console.log('Removed existing Medium Java quizzes');

    // Add the new Java quiz
    const savedQuiz = await Quiz.create(javaQuiz);
    console.log('Added new Medium Java quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
