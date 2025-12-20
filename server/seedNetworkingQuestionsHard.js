const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const networkingQuiz = {
  title: 'Networking Quiz',
  description: 'Test your knowledge of computer networking concepts',
  category: 'Networking',
  difficulty: 'Hard',
  timeLimit: 20, // 20 minutes for hard
  questions: [
    {
      questionText: 'Which algorithm is used in TCP congestion control?',
      options: ['AIMD', 'Dijkstra', 'RSA', 'AES'],
      correctAnswer: 'AIMD',
      explanation: 'TCP uses Additive Increase/Multiplicative Decrease for congestion control.'
    },
    {
      questionText: 'What is BGP (Border Gateway Protocol)?',
      options: ['Exterior routing protocol', 'Interior routing protocol', 'Transport protocol', 'Application protocol'],
      correctAnswer: 'Exterior routing protocol',
      explanation: 'BGP routes traffic between autonomous systems.'
    },
    {
      questionText: 'Which is not a TCP/IP layer?',
      options: ['Link', 'Internet', 'Transport', 'Session'],
      correctAnswer: 'Session',
      explanation: 'TCP/IP model doesn\'t have a Session layer.'
    },
    {
      questionText: 'What is MPLS (Multi-Protocol Label Switching)?',
      options: ['Label-based forwarding', 'Protocol switching', 'Multi-protocol routing', 'Label switching protocol'],
      correctAnswer: 'Label-based forwarding',
      explanation: 'MPLS uses labels for high-speed packet forwarding.'
    },
    {
      questionText: 'Which is not a VPN type?',
      options: ['Site-to-site', 'Remote access', 'Transport mode', 'Tunnel mode'],
      correctAnswer: 'Transport mode',
      explanation: 'Transport mode is an IPsec mode, not a VPN type.'
    },
    {
      questionText: 'What is SDN (Software Defined Networking)?',
      options: ['Programmable network', 'Software network', 'Defined network', 'Network software'],
      correctAnswer: 'Programmable network',
      explanation: 'SDN allows programmatic control of network behavior.'
    },
    {
      questionText: 'Which is not a network security threat?',
      options: ['DDoS', 'Phishing', 'Firewall', 'Man-in-the-middle'],
      correctAnswer: 'Firewall',
      explanation: 'Firewall is a security measure, not a threat.'
    },
    {
      questionText: 'What is a network slice?',
      options: ['Virtual network partition', 'Physical network segment', 'Network cable', 'Network device'],
      correctAnswer: 'Virtual network partition',
      explanation: 'Network slicing creates virtual networks for different services.'
    },
    {
      questionText: 'Which protocol is used for VoIP?',
      options: ['SIP', 'HTTP', 'FTP', 'SMTP'],
      correctAnswer: 'SIP',
      explanation: 'SIP (Session Initiation Protocol) is used for VoIP sessions.'
    },
    {
      questionText: 'What is a zero-trust network?',
      options: ['Never trust always verify', 'Always trust', 'No security', 'Minimal security'],
      correctAnswer: 'Never trust always verify',
      explanation: 'Zero-trust requires verification for all access requests.'
    },
    {
      questionText: 'Which is not a cloud networking concept?',
      options: ['Virtualization', 'Container networking', 'Physical cables', 'Software defined networking'],
      correctAnswer: 'Physical cables',
      explanation: 'Physical cables are not specific to cloud networking.'
    },
    {
      questionText: 'What is network function virtualization?',
      options: ['Virtual network functions', 'Physical network functions', 'Network protocols', 'Network devices'],
      correctAnswer: 'Virtual network functions',
      explanation: 'NFV virtualizes network functions as software.'
    },
    {
      questionText: 'Which is not a 5G network component?',
      options: ['eNodeB', 'gNodeB', 'Core network', 'Radio access network'],
      correctAnswer: 'eNodeB',
      explanation: 'eNodeB is from 4G/LTE, not 5G.'
    },
    {
      questionText: 'What is a network orchestrator?',
      options: ['Network automation tool', 'Network device', 'Network protocol', 'Network cable'],
      correctAnswer: 'Network automation tool',
      explanation: 'Orchestrator automates network service deployment.'
    },
    {
      questionText: 'Which is not a network monitoring protocol?',
      options: ['SNMP', 'NetFlow', 'HTTP', 'Syslog'],
      correctAnswer: 'HTTP',
      explanation: 'HTTP is an application protocol, not for monitoring.'
    },
    {
      questionText: 'What is a network tap?',
      options: ['Network monitoring device', 'Network switch', 'Network router', 'Network cable'],
      correctAnswer: 'Network monitoring device',
      explanation: 'Network tap copies traffic for monitoring.'
    },
    {
      questionText: 'Which is not a network virtualization technology?',
      options: ['VXLAN', 'NVGRE', 'STP', 'GRE'],
      correctAnswer: 'STP',
      explanation: 'STP is a protocol, not a virtualization technology.'
    },
    {
      questionText: 'What is a network function chain?',
      options: ['Service function path', 'Network devices', 'Network protocols', 'Network cables'],
      correctAnswer: 'Service function path',
      explanation: 'Service chaining directs traffic through network functions.'
    },
    {
      questionText: 'Which is not a network analytics metric?',
      options: ['Latency', 'Throughput', 'CPU usage', 'Packet loss'],
      correctAnswer: 'CPU usage',
      explanation: 'CPU usage is a system metric, not network-specific.'
    },
    {
      questionText: 'What is intent-based networking?',
      options: ['Business intent automation', 'Manual configuration', 'Basic networking', 'Traditional networking'],
      correctAnswer: 'Business intent automation',
      explanation: 'Intent-based networking automates based on business requirements.'
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
    await Quiz.deleteMany({ category: 'Networking', difficulty: 'Hard' });
    console.log('Removed existing Hard Networking quizzes');

    // Add the new Networking quiz
    const savedQuiz = await Quiz.create(networkingQuiz);
    console.log('Added new Hard Networking quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
