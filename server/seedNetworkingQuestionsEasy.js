const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const networkingQuiz = {
  title: 'Networking Quiz',
  description: 'Test your knowledge of computer networking concepts',
  category: 'Networking',
  difficulty: 'Easy',
  timeLimit: 20, // 20 minutes for easy
  questions: [
    {
      questionText: 'Which layer of OSI model handles routing?',
      options: ['Physical', 'Data Link', 'Network', 'Transport'],
      correctAnswer: 'Network',
      explanation: 'Network layer (Layer 3) handles routing between networks.'
    },
    {
      questionText: 'What is the default port for HTTP?',
      options: ['21', '22', '80', '443'],
      correctAnswer: '80',
      explanation: 'HTTP uses port 80 by default.'
    },
    {
      questionText: 'Which is not a network topology?',
      options: ['Star', 'Bus', 'Ring', 'Linear'],
      correctAnswer: 'Linear',
      explanation: 'Linear is not a standard network topology.'
    },
    {
      questionText: 'What does DNS stand for?',
      options: ['Domain Name System', 'Dynamic Name System', 'Digital Network System', 'Domain Network Service'],
      correctAnswer: 'Domain Name System',
      explanation: 'DNS translates domain names to IP addresses.'
    },
    {
      questionText: 'Which protocol is used for secure web browsing?',
      options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
      correctAnswer: 'HTTPS',
      explanation: 'HTTPS provides secure encrypted web browsing.'
    },
    {
      questionText: 'What is an IP address?',
      options: ['Physical address', 'Logical address', 'MAC address', 'Network name'],
      correctAnswer: 'Logical address',
      explanation: 'IP address is a logical address for network identification.'
    },
    {
      questionText: 'Which is not a type of network?',
      options: ['LAN', 'WAN', 'MAN', 'PAN'],
      correctAnswer: 'PAN',
      explanation: 'PAN (Personal Area Network) is less common than others.'
    },
    {
      questionText: 'What is a router?',
      options: ['Connects networks', 'Stores data', 'Displays content', 'Processes programs'],
      correctAnswer: 'Connects networks',
      explanation: 'Router connects different networks and routes traffic between them.'
    },
    {
      questionText: 'Which cable type uses twisted pairs?',
      options: ['Coaxial', 'Fiber optic', 'Twisted pair', 'None'],
      correctAnswer: 'Twisted pair',
      explanation: 'Twisted pair cables have pairs of twisted copper wires.'
    },
    {
      questionText: 'What is a MAC address?',
      options: ['Physical address', 'Logical address', 'Network address', 'Virtual address'],
      correctAnswer: 'Physical address',
      explanation: 'MAC address is the physical hardware address of network interface.'
    },
    {
      questionText: 'Which protocol is used for email?',
      options: ['HTTP', 'FTP', 'SMTP', 'Telnet'],
      correctAnswer: 'SMTP',
      explanation: 'SMTP (Simple Mail Transfer Protocol) is used for email.'
    },
    {
      questionText: 'What is bandwidth?',
      options: ['Data transfer rate', 'Storage capacity', 'Processing speed', 'Memory size'],
      correctAnswer: 'Data transfer rate',
      explanation: 'Bandwidth is the maximum data transfer rate of a network.'
    },
    {
      questionText: 'Which is not a network device?',
      options: ['Switch', 'Router', 'Hub', 'Processor'],
      correctAnswer: 'Processor',
      explanation: 'Processor is a computer component, not a network device.'
    },
    {
      questionText: 'What is a firewall?',
      options: ['Network security device', 'Data storage', 'Network cable', 'Network protocol'],
      correctAnswer: 'Network security device',
      explanation: 'Firewall protects network from unauthorized access.'
    },
    {
      questionText: 'Which layer handles data frames?',
      options: ['Physical', 'Data Link', 'Network', 'Transport'],
      correctAnswer: 'Data Link',
      explanation: 'Data Link layer (Layer 2) handles data frames.'
    },
    {
      questionText: 'What is a subnet?',
      options: ['Network subdivision', 'Network protocol', 'Network device', 'Network cable'],
      correctAnswer: 'Network subdivision',
      explanation: 'Subnet divides a larger network into smaller segments.'
    },
    {
      questionText: 'Which protocol is used for file transfer?',
      options: ['HTTP', 'FTP', 'SMTP', 'POP3'],
      correctAnswer: 'FTP',
      explanation: 'FTP (File Transfer Protocol) is used for transferring files.'
    },
    {
      questionText: 'What is latency?',
      options: ['Network delay', 'Network speed', 'Network size', 'Network security'],
      correctAnswer: 'Network delay',
      explanation: 'Latency is the delay in data transmission over a network.'
    },
    {
      questionText: 'Which is not a wireless technology?',
      options: ['WiFi', 'Bluetooth', 'Ethernet', '4G'],
      correctAnswer: 'Ethernet',
      explanation: 'Ethernet is a wired networking technology.'
    },
    {
      questionText: 'What is a gateway?',
      options: ['Network exit point', 'Network entry point', 'Network center', 'Network device'],
      correctAnswer: 'Network exit point',
      explanation: 'Gateway connects a network to external networks.'
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

    // Remove any existing Networking quizzes
    await Quiz.deleteMany({ category: 'Networking', difficulty: 'Easy' });
    console.log('Removed existing Easy Networking quizzes');

    // Add the new Networking quiz
    const savedQuiz = await Quiz.create(networkingQuiz);
    console.log('Added new Easy Networking quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
