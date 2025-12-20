const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const osQuiz = {
  title: 'Operating Systems Quiz',
  description: 'Test your knowledge of operating systems concepts',
  category: 'Operating Systems',
  difficulty: 'Medium',
  timeLimit: 20, // 20 minutes for medium
  questions: [
    {
      questionText: 'Which scheduling algorithm gives equal time to each process?',
      options: ['FCFS', 'SJF', 'Round Robin', 'Priority'],
      correctAnswer: 'Round Robin',
      explanation: 'Round Robin gives each process an equal time slice.'
    },
    {
      questionText: 'What is a deadlock?',
      options: ['Process crash', 'Resource starvation', 'Circular wait condition', 'Memory leak'],
      correctAnswer: 'Circular wait condition',
      explanation: 'Deadlock occurs when processes wait for each other in a circular chain.'
    },
    {
      questionText: 'Which memory management technique uses paging?',
      options: ['Segmentation', 'Paging', 'Fragmentation', 'Compaction'],
      correctAnswer: 'Paging',
      explanation: 'Paging divides memory into fixed-size pages.'
    },
    {
      questionText: 'What is context switching?',
      options: ['Process creation', 'Process termination', 'Saving/restoring process state', 'Memory allocation'],
      correctAnswer: 'Saving/restoring process state',
      explanation: 'Context switching saves current process state and loads next process state.'
    },
    {
      questionText: 'Which is not a deadlock condition?',
      options: ['Mutual exclusion', 'Hold and wait', 'Preemption', 'Circular wait'],
      correctAnswer: 'Preemption',
      explanation: 'Preemption can prevent deadlock, it\'s not a condition for it.'
    },
    {
      questionText: 'Which file system uses inodes?',
      options: ['NTFS', 'EXT4', 'FAT32', 'HFS+'],
      correctAnswer: 'EXT4',
      explanation: 'Unix-like file systems use inodes to store file metadata.'
    },
    {
      questionText: 'What is thrashing?',
      options: ['High CPU usage', 'Excessive paging', 'Network congestion', 'Disk failure'],
      correctAnswer: 'Excessive paging',
      explanation: 'Thrashing occurs when system spends more time paging than executing.'
    },
    {
      questionText: 'Which IPC mechanism uses shared memory?',
      options: ['Pipes', 'Message queues', 'Shared memory', 'Sockets'],
      correctAnswer: 'Shared memory',
      explanation: 'Shared memory allows processes to communicate via common memory space.'
    },
    {
      questionText: 'What is a semaphore?',
      options: ['Synchronization primitive', 'Memory allocator', 'File descriptor', 'Process identifier'],
      correctAnswer: 'Synchronization primitive',
      explanation: 'Semaphore is used for process synchronization.'
    },
    {
      questionText: 'Which algorithm prevents starvation?',
      options: ['FCFS', 'SJF', 'Round Robin', 'Priority'],
      correctAnswer: 'Round Robin',
      explanation: 'Round Robin prevents starvation by giving equal time to all processes.'
    },
    {
      questionText: 'What is virtualization?',
      options: ['Multiple OS on one hardware', 'Single OS on multiple hardware', 'Network virtualization', 'File virtualization'],
      correctAnswer: 'Multiple OS on one hardware',
      explanation: 'Virtualization allows running multiple operating systems on single hardware.'
    },
    {
      questionText: 'Which is not a file system type?',
      options: ['Journaling', 'Distributed', 'Encrypted', 'Linear'],
      correctAnswer: 'Linear',
      explanation: 'Linear is not a recognized file system type.'
    },
    {
      questionText: 'What is a page fault?',
      options: ['Memory error', 'Page not found in memory', 'Disk error', 'Network error'],
      correctAnswer: 'Page not found in memory',
      explanation: 'Page fault occurs when required page is not in physical memory.'
    },
    {
      questionText: 'Which command shows running processes in Unix/Linux?',
      options: ['ps', 'top', 'jobs', 'All of the above'],
      correctAnswer: 'All of the above',
      explanation: 'All these commands can show running processes.'
    },
    {
      questionText: 'What is a race condition?',
      options: ['Memory leak', 'Concurrent access conflict', 'Process crash', 'Network timeout'],
      correctAnswer: 'Concurrent access conflict',
      explanation: 'Race condition occurs when processes access shared data concurrently.'
    },
    {
      questionText: 'Which is not a scheduling criteria?',
      options: ['CPU utilization', 'Throughput', 'Turnaround time', 'Network bandwidth'],
      correctAnswer: 'Network bandwidth',
      explanation: 'Network bandwidth is not a CPU scheduling criteria.'
    },
    {
      questionText: 'What is a system call?',
      options: ['User program function', 'OS kernel interface', 'Network call', 'File operation'],
      correctAnswer: 'OS kernel interface',
      explanation: 'System call is the interface between user program and OS kernel.'
    },
    {
      questionText: 'Which is not a memory allocation algorithm?',
      options: ['First Fit', 'Best Fit', 'Worst Fit', 'Perfect Fit'],
      correctAnswer: 'Perfect Fit',
      explanation: 'Perfect Fit is not a standard memory allocation algorithm.'
    },
    {
      questionText: 'What is a pipe in Unix?',
      options: ['IPC mechanism', 'File descriptor', 'Network connection', 'Memory segment'],
      correctAnswer: 'IPC mechanism',
      explanation: 'Pipe is an IPC mechanism for one-way communication.'
    },
    {
      questionText: 'Which is not a process synchronization tool?',
      options: ['Mutex', 'Semaphore', 'Monitor', 'Router'],
      correctAnswer: 'Router',
      explanation: 'Router is a network device, not a synchronization tool.'
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
    await Quiz.deleteMany({ category: 'Operating Systems', difficulty: 'Medium' });
    console.log('Removed existing Medium Operating Systems quizzes');

    // Add the new OS quiz
    const savedQuiz = await Quiz.create(osQuiz);
    console.log('Added new Medium Operating Systems quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
