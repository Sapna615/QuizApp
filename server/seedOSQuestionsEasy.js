const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const osQuiz = {
  title: 'Operating Systems Quiz',
  description: 'Test your knowledge of operating systems concepts',
  category: 'Operating Systems',
  difficulty: 'Easy',
  timeLimit: 20, // 20 minutes for easy
  questions: [
    {
      questionText: 'Which is the core component of an operating system?',
      options: ['Kernel', 'Shell', 'GUI', 'File System'],
      correctAnswer: 'Kernel',
      explanation: 'The kernel is the core component that manages system resources.'
    },
    {
      questionText: 'Which command lists files in Unix/Linux?',
      options: ['dir', 'list', 'ls', 'show'],
      correctAnswer: 'ls',
      explanation: 'The ls command lists files and directories in Unix/Linux.'
    },
    {
      questionText: 'Which is not an operating system?',
      options: ['Windows', 'Linux', 'Oracle', 'macOS'],
      correctAnswer: 'Oracle',
      explanation: 'Oracle is a database, not an operating system.'
    },
    {
      questionText: 'What does GUI stand for?',
      options: ['Graphical User Interface', 'General User Interface', 'Graphical Utility Interface', 'General Utility Interface'],
      correctAnswer: 'Graphical User Interface',
      explanation: 'GUI stands for Graphical User Interface.'
    },
    {
      questionText: 'Which file system is used by Windows?',
      options: ['EXT4', 'NTFS', 'HFS+', 'APFS'],
      correctAnswer: 'NTFS',
      explanation: 'NTFS is the primary file system used by Windows.'
    },
    {
      questionText: 'Which is a type of operating system?',
      options: ['Batch OS', 'Distributed OS', 'Real-time OS', 'All of the above'],
      correctAnswer: 'All of the above',
      explanation: 'All are types of operating systems.'
    },
    {
      questionText: 'Which command creates a directory in Unix/Linux?',
      options: ['mkdir', 'md', 'create', 'newdir'],
      correctAnswer: 'mkdir',
      explanation: 'mkdir creates a new directory.'
    },
    {
      questionText: 'What is the purpose of an operating system?',
      options: ['Manage hardware', 'Provide user interface', 'Run applications', 'All of the above'],
      correctAnswer: 'All of the above',
      explanation: 'OS manages hardware, provides interface, and runs applications.'
    },
    {
      questionText: 'Which is not a process state?',
      options: ['Ready', 'Running', 'Waiting', 'Starting'],
      correctAnswer: 'Starting',
      explanation: 'Starting is not a standard process state.'
    },
    {
      questionText: 'Which command shows current directory in Unix/Linux?',
      options: ['pwd', 'cd', 'dir', 'where'],
      correctAnswer: 'pwd',
      explanation: 'pwd (print working directory) shows the current directory.'
    },
    {
      questionText: 'What does RAM stand for?',
      options: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Ready Access Memory'],
      correctAnswer: 'Random Access Memory',
      explanation: 'RAM stands for Random Access Memory.'
    },
    {
      questionText: 'Which is a mobile operating system?',
      options: ['Android', 'iOS', 'Both A and B', 'Windows Phone'],
      correctAnswer: 'Both A and B',
      explanation: 'Both Android and iOS are mobile operating systems.'
    },
    {
      questionText: 'Which command copies files in Unix/Linux?',
      options: ['copy', 'cp', 'duplicate', 'dup'],
      correctAnswer: 'cp',
      explanation: 'cp copies files and directories.'
    },
    {
      questionText: 'What is multitasking?',
      options: ['Running multiple programs', 'Multiple users', 'Multiple processors', 'Multiple networks'],
      correctAnswer: 'Running multiple programs',
      explanation: 'Multitasking allows running multiple programs simultaneously.'
    },
    {
      questionText: 'Which file extension indicates executable in Windows?',
      options: ['.exe', '.com', '.bat', 'All of the above'],
      correctAnswer: 'All of the above',
      explanation: 'All these extensions can indicate executable files.'
    },
    {
      questionText: 'Which is a type of user interface?',
      options: ['CLI', 'GUI', 'Both A and B', 'None'],
      correctAnswer: 'Both A and B',
      explanation: 'CLI (Command Line) and GUI are types of user interfaces.'
    },
    {
      questionText: 'What does BIOS stand for?',
      options: ['Basic Input Output System', 'Binary Input Output System', 'Boot Input Output System', 'Basic Internal Output System'],
      correctAnswer: 'Basic Input Output System',
      explanation: 'BIOS stands for Basic Input Output System.'
    },
    {
      questionText: 'Which is not a Linux distribution?',
      options: ['Ubuntu', 'Windows', 'Fedora', 'Debian'],
      correctAnswer: 'Windows',
      explanation: 'Windows is not a Linux distribution.'
    },
    {
      questionText: 'Which command removes files in Unix/Linux?',
      options: ['del', 'rm', 'delete', 'remove'],
      correctAnswer: 'rm',
      explanation: 'rm removes files and directories.'
    },
    {
      questionText: 'What is virtual memory?',
      options: ['Physical memory', 'Disk space used as memory', 'Cache memory', 'Register memory'],
      correctAnswer: 'Disk space used as memory',
      explanation: 'Virtual memory uses disk space to extend physical memory.'
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

    // Remove any existing OS quizzes
    await Quiz.deleteMany({ category: 'Operating Systems', difficulty: 'Easy' });
    console.log('Removed existing Easy Operating Systems quizzes');

    // Add the new OS quiz
    const savedQuiz = await Quiz.create(osQuiz);
    console.log('Added new Easy Operating Systems quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
