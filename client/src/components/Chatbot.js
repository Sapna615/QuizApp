import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Input,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Avatar,
  HStack,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { FaRobot, FaPaperPlane, FaCommentDots } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your Quiz Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const messagesEndRef = useRef(null);

  const botResponses = {
    'hello': 'Hello! How can I assist you with the quiz today?',
    'hi': 'Hi there! What would you like to know about the quiz?',
    'how to create a quiz': 'To create a quiz, click the "Create New Quiz" button on the admin dashboard and fill in the required details.',
    'how to edit a quiz': 'Click the edit button (pencil icon) next to the quiz you want to modify.',
    'how to delete a quiz': 'Click the delete button (trash icon) next to the quiz you want to remove. A confirmation will be required.',
    'how many questions can I add': 'You can add up to 20 questions per quiz, with 2-6 options per question.',
    'what categories can I use': 'You can create quizzes in any category you like. Some examples include General Knowledge, Science, History, etc.',
    'how to set time limit': 'When creating or editing a quiz, use the "Time Limit" field to set a duration in minutes. Set to 0 for no time limit.',
    'default': "I'm not sure I understand. Could you rephrase your question? You can ask me about creating, editing, or managing quizzes.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for matching keywords in the bot responses
    for (const [key, value] of Object.entries(botResponses)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }
    
    // Check for specific patterns
    if (/how.*create|make.*quiz/.test(lowerInput)) {
      return botResponses['how to create a quiz'];
    } else if (/how.*edit|change.*quiz/.test(lowerInput)) {
      return botResponses['how to edit a quiz'];
    } else if (/how.*delete|remove.*quiz/.test(lowerInput)) {
      return botResponses['how to delete a quiz'];
    } else if (/time limit|how long|duration/.test(lowerInput)) {
      return botResponses['how to set time limit'];
    } else if (/categor(y|ies)|type/.test(lowerInput)) {
      return botResponses['what categories can I use'];
    }
    
    return botResponses['default'];
  };

  const chatBubbleStyles = (sender) => ({
    maxWidth: '80%',
    p: 3,
    borderRadius: 'lg',
    bg: sender === 'user' ? 'blue.500' : 'gray.200',
    color: sender === 'user' ? 'white' : 'gray.800',
    alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
    boxShadow: 'sm',
  });

  return (
    <>
      {/* Floating action button */}
      <Box
        position="fixed"
        bottom={6}
        right={6}
        zIndex={10}
      >
        <IconButton
          isRound
          size="lg"
          colorScheme="blue"
          aria-label="Open chat"
          icon={<FaCommentDots />}
          onClick={onOpen}
          boxShadow="lg"
        />
      </Box>

      {/* Chat drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" bg="blue.500" color="white">
            <HStack>
              <Avatar icon={<FaRobot />} bg="white" color="blue.500" />
              <Box>
                <Text>Quiz Assistant</Text>
                <Text fontSize="sm" color="blue.100">How can I help you today?</Text>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerCloseButton color="white" />
          
          <DrawerBody p={0} bg={useColorModeValue('gray.50', 'gray.800')}>
            <VStack 
              spacing={4} 
              p={4} 
              h="100%" 
              overflowY="auto"
              align="stretch"
            >
              {messages.map((message) => (
                <Box key={message.id} {...chatBubbleStyles(message.sender)}>
                  <Text>{message.text}</Text>
                  <Text fontSize="xs" opacity={0.7} textAlign={message.sender === 'user' ? 'right' : 'left'} mt={1}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Box>
              ))}
              {isTyping && (
                <Box {...chatBubbleStyles('bot')}>
                  <HStack spacing={2}>
                    <Spinner size="sm" />
                    <Text>Typing...</Text>
                  </HStack>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </DrawerBody>
          
          <DrawerFooter borderTopWidth="1px" p={3}>
            <form onSubmit={handleSendMessage} style={{ width: '100%' }}>
              <HStack>
                <Input
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                />
                <IconButton
                  colorScheme="blue"
                  aria-label="Send message"
                  icon={<FaPaperPlane />}
                  type="submit"
                  isDisabled={!input.trim()}
                />
              </HStack>
            </form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Chatbot;
