const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const osQuiz = {
  title: 'Operating Systems Quiz',
  description: 'Test your knowledge of operating systems concepts',
  category: 'Operating Systems',
  difficulty: 'Hard',
  timeLimit: 20, // 15 minutes for hard
  questions: [
    {
      questionText: 'Which algorithm solves the critical section problem?',
      options: ['Peterson\'s algorithm', 'Banker\'s algorithm', 'Dijkstra\'s algorithm', 'Both A and B'],
      correctAnswer: 'Peterson\'s algorithm',
      explanation: 'Peterson\'s algorithm solves the critical section problem for two processes.'
    },
    {
      questionText: 'What does the Banker\'s algorithm prevent?',
      options: ['Deadlock', 'Starvation', 'Race condition', 'Memory leak'],
      correctAnswer: 'Deadlock',
      explanation: 'Banker\'s algorithm is a deadlock avoidance algorithm.'
    },
    {
      questionText: 'Which page replacement algorithm has the lowest page fault rate?',
      options: ['FIFO', 'LRU', 'Optimal', 'Clock'],
      correctAnswer: 'Optimal',
      explanation: 'Optimal algorithm has the lowest page fault rate but is theoretical.'
    },
    {
      questionText: 'What is Belady\'s anomaly?',
      options: ['More frames cause more faults', 'Less frames cause fewer faults', 'Equal frames cause faults', 'No frames cause faults'],
      correctAnswer: 'More frames cause more faults',
      explanation: 'Belady\'s anomaly occurs when more page frames cause more page faults.'
    },
    {
      questionText: 'Which is not a distributed file system?',
      options: ['NFS', 'AFS', 'NTFS', 'GFS'],
      correctAnswer: 'NTFS',
      explanation: 'NTFS is a local file system, not distributed.'
    },
    {
      questionText: 'What is a microkernel architecture?',
      options: ['Minimal kernel in user space', 'Large kernel in kernel space', 'Hybrid kernel design', 'No kernel design'],
      correctAnswer: 'Minimal kernel in kernel space',
      explanation: 'Microkernel has minimal services in kernel space.'
    },
    {
      questionText: 'Which is not a real-time scheduling algorithm?',
      options: ['EDF', 'RM', 'Rate Monotonic', 'FCFS'],
      correctAnswer: 'FCFS',
      explanation: 'FCFS is not suitable for real-time systems.'
    },
    {
      questionText: 'What is TLB (Translation Lookaside Buffer)?',
      options: ['Cache for page translations', 'Cache for file operations', 'Cache for network operations', 'Cache for CPU instructions'],
      correctAnswer: 'Cache for page translations',
      explanation: 'TLB caches virtual-to-physical address translations.'
    },
    {
      questionText: 'Which is not a security feature in modern OS?',
      options: ['ASLR', 'DEP', 'SMP', 'NX bit'],
      correctAnswer: 'SMP',
      explanation: 'SMP is for multiprocessing, not security.'
    },
    {
      questionText: 'What is a hypervisor?',
      options: ['Virtual machine monitor', 'Process scheduler', 'Memory manager', 'File system'],
      correctAnswer: 'Virtual machine monitor',
      explanation: 'Hypervisor manages virtual machines.'
    },
    {
      questionText: 'Which is not a cloud OS concept?',
      options: ['Containerization', 'Virtualization', 'Single threading', 'Microservices'],
      correctAnswer: 'Single threading',
      explanation: 'Single threading is not a cloud OS concept.'
    },
    {
      questionText: 'What is NUMA (Non-Uniform Memory Access)?',
      options: ['Memory access time varies', 'Uniform memory access', 'No memory access', 'Network memory access'],
      correctAnswer: 'Memory access time varies',
      explanation: 'NUMA has varying memory access times depending on location.'
    },
    {
      questionText: 'Which is not a file system consistency method?',
      options: ['Journaling', 'Caching', 'Checkpoints', 'Write-ahead logging'],
      correctAnswer: 'Caching',
      explanation: 'Caching improves performance but doesn\'t ensure consistency.'
    },
    {
      questionText: 'What is a container?',
      options: ['Virtualized OS environment', 'Virtual machine', 'Physical server', 'Network device'],
      correctAnswer: 'Virtualized OS environment',
      explanation: 'Containers provide isolated OS environments.'
    },
    {
      questionText: 'Which is not a distributed system concept?',
      options: ['CAP theorem', 'Consensus algorithms', 'Process synchronization', 'Load balancing'],
      correctAnswer: 'Process synchronization',
      explanation: 'Process synchronization is a local OS concept.'
    },
    {
      questionText: 'What is a system call trap?',
      options: ['Transition to kernel mode', 'Memory allocation', 'File creation', 'Process creation'],
      correctAnswer: 'Transition to kernel mode',
      explanation: 'System call trap switches from user to kernel mode.'
    },
    {
      questionText: 'Which is not a memory management technique?',
      options: ['Paging', 'Segmentation', 'Compaction', 'Encryption'],
      correctAnswer: 'Encryption',
      explanation: 'Encryption is for security, not memory management.'
    },
    {
      questionText: 'What is a process control block?',
      options: ['Process metadata structure', 'Memory block', 'File block', 'Network block'],
      correctAnswer: 'Process metadata structure',
      explanation: 'PCB contains all information about a process.'
    },
    {
      questionText: 'Which is not a virtualization type?',
      options: ['Full virtualization', 'Para-virtualization', 'Hardware virtualization', 'Linear virtualization'],
      correctAnswer: 'Linear virtualization',
      explanation: 'Linear virtualization is not a recognized type.'
    },
    {
      questionText: 'What is a race detector?',
      options: ['Tool to find race conditions', 'Memory debugger', 'Performance profiler', 'Network analyzer'],
      correctAnswer: 'Tool to find race conditions',
      explanation: 'Race detector identifies concurrent access issues.'
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
    await Quiz.deleteMany({ category: 'Operating Systems', difficulty: 'Hard' });
    console.log('Removed existing Hard Operating Systems quizzes');

    // Add the new OS quiz
    const savedQuiz = await Quiz.create(osQuiz);
    console.log('Added new Hard Operating Systems quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
