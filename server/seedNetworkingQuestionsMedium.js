const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const networkingQuiz = {
  title: 'Networking Quiz',
  description: 'Test your knowledge of computer networking concepts',
  category: 'Networking',
  difficulty: 'Medium',
  timeLimit: 20, // 20 minutes for medium
  questions: [
    {
      questionText: 'Which protocol ensures reliable data delivery?',
      options: ['UDP', 'TCP', 'ICMP', 'ARP'],
      correctAnswer: 'TCP',
      explanation: 'TCP provides reliable, connection-oriented communication.'
    },
    {
      questionText: 'What is CIDR notation used for?',
      options: ['IP address allocation', 'Subnet masking', 'Port numbering', 'MAC addressing'],
      correctAnswer: 'Subnet masking',
      explanation: 'CIDR (Classless Inter-Domain Routing) is used for subnet notation.'
    },
    {
      questionText: 'Which layer handles end-to-end communication?',
      options: ['Transport', 'Network', 'Data Link', 'Session'],
      correctAnswer: 'Transport',
      explanation: 'Transport layer (Layer 4) handles end-to-end communication.'
    },
    {
      questionText: 'What is a VLAN?',
      options: ['Virtual LAN', 'Virtual network', 'Virtual router', 'Virtual switch'],
      correctAnswer: 'Virtual LAN',
      explanation: 'VLAN logically segments a physical network.'
    },
    {
      questionText: 'Which protocol resolves IP to MAC addresses?',
      options: ['DNS', 'ARP', 'RARP', 'DHCP'],
      correctAnswer: 'ARP',
      explanation: 'ARP (Address Resolution Protocol) resolves IP to MAC addresses.'
    },
    {
      questionText: 'What is NAT (Network Address Translation)?',
      options: ['IP address translation', 'Port translation', 'Protocol translation', 'Address masking'],
      correctAnswer: 'IP address translation',
      explanation: 'NAT translates private IP addresses to public ones.'
    },
    {
      questionText: 'Which is not a routing protocol?',
      options: ['OSPF', 'BGP', 'RIP', 'HTTP'],
      correctAnswer: 'HTTP',
      explanation: 'HTTP is an application protocol, not a routing protocol.'
    },
    {
      questionText: 'What is a subnet mask?',
      options: ['Network boundary', 'Network security', 'Network speed', 'Network protocol'],
      correctAnswer: 'Network boundary',
      explanation: 'Subnet mask defines network and host portions of an IP address.'
    },
    {
      questionText: 'Which layer handles encryption?',
      options: ['Presentation', 'Application', 'Transport', 'Network'],
      correctAnswer: 'Presentation',
      explanation: 'Presentation layer (Layer 6) handles data encryption and compression.'
    },
    {
      questionText: 'What is a broadcast domain?',
      options: ['Network segment', 'Network device', 'Network protocol', 'Network address'],
      correctAnswer: 'Network segment',
      explanation: 'Broadcast domain is where broadcasts are forwarded.'
    },
    {
      questionText: 'Which protocol is connectionless?',
      options: ['TCP', 'UDP', 'FTP', 'HTTP'],
      correctAnswer: 'UDP',
      explanation: 'UDP is connectionless and doesn\'t guarantee delivery.'
    },
    {
      questionText: 'What is a collision domain?',
      options: ['Network with collisions', 'Network without collisions', 'Network with security', 'Network with routing'],
      correctAnswer: 'Network with collisions',
      explanation: 'Collision domain is where packet collisions can occur.'
    },
    {
      questionText: 'Which is not a switching method?',
      options: ['Store-and-forward', 'Cut-through', 'Fragment-free', 'Direct-switch'],
      correctAnswer: 'Direct-switch',
      explanation: 'Direct-switch is not a standard switching method.'
    },
    {
      questionText: 'What is QoS (Quality of Service)?',
      options: ['Traffic prioritization', 'Network security', 'Network speed', 'Network reliability'],
      correctAnswer: 'Traffic prioritization',
      explanation: 'QoS prioritizes network traffic for better performance.'
    },
    {
      questionText: 'Which layer establishes sessions?',
      options: ['Session', 'Transport', 'Application', 'Presentation'],
      correctAnswer: 'Session',
      explanation: 'Session layer (Layer 5) establishes and maintains sessions.'
    },
    {
      questionText: 'What is a proxy server?',
      options: ['Intermediary server', 'Web server', 'Mail server', 'File server'],
      correctAnswer: 'Intermediary server',
      explanation: 'Proxy server acts as intermediary for client requests.'
    },
    {
      questionText: 'Which is not a network address type?',
      options: ['Unicast', 'Multicast', 'Broadcast', 'Monocast'],
      correctAnswer: 'Monocast',
      explanation: 'Monocast is not a standard network address type.'
    },
    {
      questionText: 'What is a packet?',
      options: ['Data unit', 'Network device', 'Network protocol', 'Network cable'],
      correctAnswer: 'Data unit',
      explanation: 'Packet is a unit of data transmitted over a network.'
    },
    {
      questionText: 'Which protocol is used for remote login?',
      options: ['Telnet', 'FTP', 'SMTP', 'HTTP'],
      correctAnswer: 'Telnet',
      explanation: 'Telnet is used for remote terminal access.'
    },
    {
      questionText: 'What is a mesh network?',
      options: ['Fully connected network', 'Partially connected network', 'Star network', 'Bus network'],
      correctAnswer: 'Fully connected network',
      explanation: 'Mesh network has multiple interconnections between nodes.'
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
    await Quiz.deleteMany({ category: 'Networking', difficulty: 'Medium' });
    console.log('Removed existing Medium Networking quizzes');

    // Add the new Networking quiz
    const savedQuiz = await Quiz.create(networkingQuiz);
    console.log('Added new Medium Networking quiz with ID:', savedQuiz._id);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
