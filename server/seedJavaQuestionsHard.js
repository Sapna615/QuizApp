const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const javaQuiz = {
  title: 'Java Programming Quiz',
  description: 'Test your knowledge of Java programming language',
  category: 'Java Programming',
  difficulty: 'Hard',
  timeLimit: 20, // 20 minutes for hard
  questions: [
    /// HARD MODE QUESTIONS

{
  questionText: 'Which garbage collection algorithm compacts memory to reduce fragmentation?',
  options: ['Mark-Sweep', 'Copying GC', 'Mark-Compact', 'Reference Counting'],
  correctAnswer: 'Mark-Compact',
  explanation: 'Mark-Compact marks live objects and compacts memory.'
},
{
  questionText: 'Which Java feature enables runtime resolution of method calls?',
  options: ['Static Binding', 'Dynamic Binding', 'Method Hiding', 'Overloading'],
  correctAnswer: 'Dynamic Binding',
  explanation: 'Dynamic binding resolves methods at runtime.'
},
{
  questionText: 'Which keyword is used to create a custom class loader?',
  options: ['ClassLoader', 'new', 'loadClass', 'extends'],
  correctAnswer: 'extends',
  explanation: 'You extend ClassLoader to create a custom loader.'
},
{
  questionText: 'Which of these is NOT a valid functional interface?',
  options: ['Runnable', 'Callable', 'Comparator', 'Serializable'],
  correctAnswer: 'Serializable',
  explanation: 'Serializable is a marker interface, not functional.'
},
{
  questionText: 'What does the volatile keyword guarantee?',
  options: ['Atomicity', 'Visibility', 'Ordering', 'Synchronization'],
  correctAnswer: 'Visibility',
  explanation: 'volatile ensures visibility of updates across threads.'
},
{
  questionText: 'Which design pattern ensures only one instance of a class?',
  options: ['Factory', 'Singleton', 'Builder', 'Adapter'],
  correctAnswer: 'Singleton',
  explanation: 'Singleton restricts instantiation to one instance.'
},
{
  questionText: 'Which data structure does HashMap use internally in Java 8+?',
  options: ['Array of linked lists', 'Binary trees', 'Arrays only', 'Red-Black Tree + LinkedList'],
  correctAnswer: 'Red-Black Tree + LinkedList',
  explanation: 'Java 8+ uses trees for high-collision buckets.'
},
{
  questionText: 'Which concept allows removing type information at runtime?',
  options: ['Reflection', 'Type Erasure', 'Polymorphism', 'Serialization'],
  correctAnswer: 'Type Erasure',
  explanation: 'Generics are erased during compilation.'
},
{
  questionText: 'Which method wakes a waiting thread?',
  options: ['resume()', 'notify()', 'start()', 'wake()'],
  correctAnswer: 'notify()',
  explanation: 'notify() wakes a single waiting thread.'
},
{
  questionText: 'Which algorithm does Collections.sort() use?',
  options: ['QuickSort', 'MergeSort', 'TimSort', 'HeapSort'],
  correctAnswer: 'TimSort',
  explanation: 'Java uses TimSort for sorting objects.'
},
{
  questionText: 'Which annotation prevents null values?',
  options: ['@NotNull', '@NonNull', '@Nullable', 'Both A and B'],
  correctAnswer: 'Both A and B',
  explanation: 'Both @NotNull and @NonNull indicate non-null parameters.'
},
{
  questionText: 'What does the synchronized keyword lock?',
  options: ['Object', 'Thread', 'Method', 'Heap'],
  correctAnswer: 'Object',
  explanation: 'It synchronizes on the object monitor.'
},
{
  questionText: 'Which of these is immutable?',
  options: ['String', 'StringBuilder', 'StringBuffer', 'ArrayList'],
  correctAnswer: 'String',
  explanation: 'String objects cannot be changed after creation.'
},
{
  questionText: 'Which class is used for high-performance atomic operations?',
  options: ['AtomicInteger', 'Integer', 'BigInteger', 'Math'],
  correctAnswer: 'AtomicInteger',
  explanation: 'AtomicInteger supports lock-free atomic updates.'
},
{
  questionText: 'Which interface supports parallel stream execution?',
  options: ['Stream', 'ParallelStream', 'Collection', 'Executor'],
  correctAnswer: 'Stream',
  explanation: 'Stream has parallel() for parallel execution.'
},
{
  questionText: 'Which exception indicates thread deadlock?',
  options: ['DeadlockException', 'IllegalThreadStateException', 'No exception thrown', 'ThreadLockException'],
  correctAnswer: 'No exception thrown',
  explanation: 'Java does not throw exceptions for deadlocks.'
},
{
  questionText: 'Which file contains bytecode instructions?',
  options: ['.exe', '.java', '.class', '.jar'],
  correctAnswer: '.class',
  explanation: '.class files contain JVM bytecode.'
},
{
  questionText: 'Which Java feature allows behavior to be passed as an argument?',
  options: ['Streams', 'Lambdas', 'Inheritance', 'Interfaces'],
  correctAnswer: 'Lambdas',
  explanation: 'Lambdas represent behavior as data.'
},
{
  questionText: 'Which collection is fail-safe?',
  options: ['ArrayList', 'HashMap', 'CopyOnWriteArrayList', 'Vector'],
  correctAnswer: 'CopyOnWriteArrayList',
  explanation: 'It uses a copied array and avoids ConcurrentModificationException.'
},
{
  questionText: 'Which class can create immutable collections?',
  options: ['Collections', 'List', 'ImmutableList', 'Optional'],
  correctAnswer: 'Collections',
  explanation: 'Collections.unmodifiableList() creates immutable collections.'
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
    await Quiz.deleteMany({ category: 'Java Programming', difficulty: 'Hard' });
    console.log('Removed existing Hard Java quizzes');

    // Add the new Java quiz
    const savedQuiz = await Quiz.create(javaQuiz);
    console.log('Added new Hard Java quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
