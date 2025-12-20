const fallbackQuestions = {
  'Python Programming': [
    {
      questionText: 'What is the correct way to create a function in Python?',
      options: [
        'function myFunction():',
        'def myFunction():',
        'create myFunction():',
        'function = myFunction()'
      ],
      correctAnswer: 'def myFunction():',
      explanation: 'In Python, functions are defined using the def keyword.'
    },
    {
      questionText: 'Which of the following is used to create a comment in Python?',
      options: ['//', '/* */', '#', '<!-- -->'],
      correctAnswer: '#',
      explanation: 'In Python, comments start with the # symbol.'
    },
    {
      questionText: 'What is the output of: print(3 * 3 ** 2)?',
      options: ['9', '18', '27', '81'],
      correctAnswer: '27',
      explanation: 'Exponentiation has higher precedence than multiplication, so 3**2 is 9, then 3*9 is 27.'
    },
    {
      questionText: 'What is the output of: print("Hello" + 3)?',
      options: ['Hello3', 'Hello 3', 'TypeError', 'HelloHelloHello'],
      correctAnswer: 'TypeError',
      explanation: 'You cannot concatenate a string with an integer in Python.'
    },
    {
      questionText: 'Which of these is NOT a valid Python data type?',
      options: ['int', 'float', 'double', 'str'],
      correctAnswer: 'double',
      explanation: 'Python uses float instead of double for floating-point numbers.'
    },
    {
      questionText: 'What does the len() function do in Python?',
      options: [
        'Returns the length of a string',
        'Returns the length of a list',
        'Returns the length of a dictionary',
        'All of the above'
      ],
      correctAnswer: 'All of the above',
      explanation: 'The len() function can be used with strings, lists, tuples, and dictionaries.'
    },
    {
      questionText: 'How do you start a for loop in Python?',
      options: [
        'for (i = 0; i < 5; i++)',
        'for i in range(5):',
        'for i = 1 to 5',
        'for i from 1 to 5'
      ],
      correctAnswer: 'for i in range(5):',
      explanation: 'Python uses for-in loops with the range() function for iteration.'
    },
    {
      questionText: 'What is the output of: print("Python"[1:3])?',
      options: ['Py', 'yth', 'tho', 'Pyt'],
      correctAnswer: 'yt',
      explanation: 'String slicing in Python is zero-based and the end index is exclusive.'
    }
  ],
  'C++ Programming': [
    {
      questionText: 'Which of the following is the correct way to include the iostream library in C++?',
      options: ['#include <iostream>', '#include "iostream"', 'import iostream', 'using iostream'],
      correctAnswer: '#include <iostream>',
      explanation: 'The correct syntax to include the iostream library is #include <iostream>.'
    },
    {
      questionText: 'What is the size of an int data type in C++?',
      options: ['2 bytes', '4 bytes', 'Depends on the system', '8 bytes'],
      correctAnswer: 'Depends on the system',
      explanation: 'The size of int in C++ depends on the system architecture and compiler.'
    },
    {
      questionText: 'What is the correct way to declare a pointer in C++?',
      options: ['int ptr;', 'int &ptr;', 'int *ptr;', 'ptr int;'],
      correctAnswer: 'int *ptr;',
      explanation: 'Pointers in C++ are declared using the * symbol after the data type.'
    },
    {
      questionText: 'What is the output of: cout << (5 / 2); in C++?',
      options: ['2', '2.5', '2.0', '3'],
      correctAnswer: '2',
      explanation: 'Integer division in C++ truncates the decimal part.'
    },
    {
      questionText: 'Which of these is NOT a valid C++ loop?',
      options: ['for', 'while', 'do-while', 'foreach'],
      correctAnswer: 'foreach',
      explanation: 'C++ has for, while, and do-while loops, but not foreach (though it has range-based for loops).'
    },
    {
      questionText: 'What is the purpose of the new operator in C++?',
      options: [
        'To declare a new variable',
        'To allocate memory dynamically',
        'To create a new class',
        'To define a new function'
      ],
      correctAnswer: 'To allocate memory dynamically',
      explanation: 'The new operator is used for dynamic memory allocation in C++.'
    }
  ],
  'Operating Systems': [
    {
      questionText: 'What is the main function of an operating system?',
      options: [
        'To manage hardware resources',
        'To create documents',
        'To browse the internet',
        'To play games'
      ],
      correctAnswer: 'To manage hardware resources',
      explanation: 'The primary function of an operating system is to manage computer hardware and software resources.'
    },
    {
      questionText: 'Which of these is not an operating system?',
      options: ['Windows', 'Linux', 'macOS', 'Chrome'],
      correctAnswer: 'Chrome',
      explanation: 'Chrome is a web browser, not an operating system.'
    },
    {
      questionText: 'What is virtual memory?',
      options: [
        'Memory that exists only when the computer is on',
        'A section of the hard drive used as additional RAM',
        'Memory used by virtual machines',
        'A type of cache memory'
      ],
      correctAnswer: 'A section of the hard drive used as additional RAM',
      explanation: 'Virtual memory uses disk space to extend the available RAM.'
    },
    {
      questionText: 'What is the purpose of a file system?',
      options: [
        'To organize and store files on storage devices',
        'To manage network connections',
        'To control input/output operations',
        'To allocate CPU time to processes'
      ],
      correctAnswer: 'To organize and store files on storage devices',
      explanation: 'A file system controls how data is stored and retrieved.'
    },
    {
      questionText: 'What is a deadlock in operating systems?',
      options: [
        'When a process terminates unexpectedly',
        'When two or more processes are unable to proceed because each is waiting for the other',
        'When the system runs out of memory',
        'When the CPU is idle'
      ],
      correctAnswer: 'When two or more processes are unable to proceed because each is waiting for the other',
      explanation: 'Deadlock occurs when processes are blocked waiting for resources held by each other.'
    },
    {
      questionText: 'What is the purpose of a process scheduler?',
      options: [
        'To manage file operations',
        'To allocate CPU time to processes',
        'To manage memory allocation',
        'To handle network communications'
      ],
      correctAnswer: 'To allocate CPU time to processes',
      explanation: 'The process scheduler determines which process runs next on the CPU.'
    }
  ],
  'Networking': [
    {
      questionText: 'What does TCP stand for?',
      options: [
        'Transmission Control Protocol',
        'Transfer Control Protocol',
        'Transmission Communication Protocol',
        'Transfer Communication Protocol'
      ],
      correctAnswer: 'Transmission Control Protocol',
      explanation: 'TCP stands for Transmission Control Protocol.'
    },
    {
      questionText: 'Which port does HTTP typically use?',
      options: ['21', '25', '80', '443'],
      correctAnswer: '80',
      explanation: 'HTTP typically uses port 80, while HTTPS uses port 443.'
    },
    {
      questionText: 'What is the purpose of DNS?',
      options: [
        'To secure network connections',
        'To translate domain names to IP addresses',
        'To manage email servers',
        'To create virtual private networks'
      ],
      correctAnswer: 'To translate domain names to IP addresses',
      explanation: 'DNS (Domain Name System) translates human-readable domain names to IP addresses.'
    },
    {
      questionText: 'What is the difference between TCP and UDP?',
      options: [
        'TCP is connection-oriented, UDP is connectionless',
        'TCP is faster than UDP',
        'UDP guarantees delivery, TCP does not',
        'TCP is used only for web browsing'
      ],
      correctAnswer: 'TCP is connection-oriented, UDP is connectionless',
      explanation: 'TCP establishes a connection before sending data and ensures delivery, while UDP sends data without establishing a connection.'
    },
    {
      questionText: 'What is a MAC address used for?',
      options: [
        'To identify a device on the internet',
        'To filter spam emails',
        'To identify a network interface on a local network',
        'To encrypt network traffic'
      ],
      correctAnswer: 'To identify a network interface on a local network',
      explanation: 'A MAC address is a unique identifier assigned to a network interface controller (NIC).'
    },
    {
      questionText: 'What is a firewall used for?',
      options: [
        'To prevent unauthorized access to a network',
        'To increase internet speed',
        'To store website data',
        'To connect to a VPN'
      ],
      correctAnswer: 'To prevent unauthorized access to a network',
      explanation: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.'
    }
  ]
};

// Function to shuffle array in place
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getFallbackQuestions = (category, count = 20) => {
  // Get the base questions for this category
  const baseQuestions = [...(fallbackQuestions[category] || [])];
  
  // If no questions exist for this category, try to find a similar one
  if (baseQuestions.length === 0) {
    console.warn(`No fallback questions found for category: ${category}`);
    // Try to find questions from any category
    const allQuestions = Object.values(fallbackQuestions).flat();
    if (allQuestions.length > 0) {
      return shuffleArray([...allQuestions]).slice(0, count);
    }
    // If still no questions, return a default question
    return [{
      questionText: 'Sample question - No questions available for this category.',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1',
      explanation: 'This is a default question.'
    }];
  }
  
  // If we have exactly the number of questions needed, return them shuffled
  if (baseQuestions.length === count) {
    return shuffleArray([...baseQuestions]);
  }
  
  // If we need more questions than we have, duplicate and modify some
  if (baseQuestions.length < count) {
    const result = [];
    let index = 0;
    
    while (result.length < count) {
      const question = {...baseQuestions[index % baseQuestions.length]};
      
      // If we've gone through all questions once, start modifying them
      if (index >= baseQuestions.length) {
        // Create a deep copy
        question.questionText = `${question.questionText} (${Math.floor(Math.random() * 1000)})`;
        
        // Shuffle options but keep track of the correct answer
        const correctAnswer = question.correctAnswer;
        question.options = shuffleArray([...question.options]);
        question.correctAnswer = correctAnswer;
      }
      
      result.push(question);
      index++;
      
      // Safety check to prevent infinite loops
      if (index > count * 2) break;
    }
    
    return result.slice(0, count);
  }
  
  // If we have more questions than needed, return a random subset
  return shuffleArray([...baseQuestions]).slice(0, count);
};

module.exports = { getFallbackQuestions };
