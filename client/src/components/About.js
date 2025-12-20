import React from 'react';
import { Box, Container, Heading, Text, VStack, useColorModeValue, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaBrain, FaChartLine, FaMobileAlt, FaClock, FaAward, FaRobot, FaUserFriends } from 'react-icons/fa';

const About = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          {/* Hero Section */}
          <Box textAlign="center" py={10}>
            <Heading as="h1" size="2xl" mb={4}>
              About QuizMaster
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              Empowering learning through interactive quizzes and knowledge sharing
            </Text>
          </Box>

          {/* Mission Section */}
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md" mb={8}>
            <Heading as="h2" size="lg" mb={6} textAlign="center">
              Our Mission
            </Heading>
            <Text fontSize="lg" textAlign="center" maxW="4xl" mx="auto">
              At QuizMaster, we believe that learning should be engaging, accessible, and fun. 
              Our platform is designed to help users test their knowledge, learn new things, 
              and track their progress in an interactive way.
            </Text>
          </Box>

          {/* Key Features Section */}
          <Box py={12} bg={cardBg} borderRadius="lg" boxShadow="md" px={{ base: 4, md: 8 }}>
            <Heading as="h2" size="xl" textAlign="center" mb={12}>
              Key Features
            </Heading>
            <Box 
              display="grid" 
              gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} 
              gap={8}
              maxW="1400px"
              mx="auto"
            >
              <FeatureCard 
                icon={<FaBrain size={32} color="#3182ce" />}
                title="Diverse Quiz Categories"
                description="Explore a wide range of topics from Science and History to Pop Culture and Technology."
              />
              <FeatureCard 
                icon={<FaChartLine size={32} color="#3182ce" />}
                title="Performance Analytics"
                description="Track your progress with detailed statistics and performance metrics to see your improvement over time."
              />
              <FeatureCard 
                icon={<FaMobileAlt size={32} color="#3182ce" />}
                title="Mobile Friendly"
                description="Take quizzes on the go with our fully responsive design that works on any device."
              />
              <FeatureCard 
                icon={<FaClock size={32} color="#3182ce" />}
                title="Timed Quizzes"
                description="Challenge yourself with timed quizzes to test both your knowledge and speed."
              />
              <FeatureCard 
                icon={<FaAward size={32} color="#3182ce" />}
                title="Achievements & Badges"
                description="Earn badges and achievements as you complete quizzes and reach new milestones."
              />
              <FeatureCard 
                icon={<FaRobot size={32} color="#3182ce" />}
                title="AI-Powered Chatbot"
                description="Get instant help and explanations from our AI assistant while taking quizzes."
              />
            </Box>
          </Box>

          {/* Community Section */}
          <Box py={12}>
            <Box maxW="6xl" mx="auto" textAlign="center">
              <FaUserFriends size={48} color="#3182ce" style={{ margin: '0 auto 20px' }} />
              <Heading as="h2" size="xl" mb={6}>
                Join Our Growing Community
              </Heading>
              <Text fontSize="lg" mb={8} maxW="2xl" mx="auto">
                Connect with thousands of quiz enthusiasts, share your scores, and compete with friends on our global leaderboards.
              </Text>
              <Box 
                display="grid" 
                gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} 
                gap={6}
                mt={10}
                textAlign="center"
              >
                <StatItem number="50,000+" label="Active Users" />
                <StatItem number="1,000+" label="Quizzes Available" />
                <StatItem number="1M+" label="Questions Answered" />
              </Box>
            </Box>
          </Box>

          {/* CTA Section */}
          <Box textAlign="center" py={10} bg={cardBg} borderRadius="lg" boxShadow="md" mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              Ready to Test Your Knowledge?
            </Heading>
            <Text fontSize="lg" mb={6} maxW="2xl" mx="auto">
              Join thousands of users who are already improving their knowledge with QuizMaster.
            </Text>
            <ChakraLink as={ReactRouterLink} to="/quizzes">
              <Box 
                as="button"
                bg="blue.500"
                color="white"
                px={8}
                py={3}
                borderRadius="md"
                _hover={{ bg: 'blue.600' }}
                fontWeight="bold"
                fontSize="lg"
                width="100%"
              >
                Get Started Now
              </Box>
            </ChakraLink>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Box 
    bg="white" 
    p={8} 
    borderRadius="lg" 
    boxShadow="lg"
    textAlign="center"
    height="100%"
    display="flex"
    flexDirection="column"
    _hover={{ 
      transform: 'translateY(-5px)', 
      boxShadow: 'xl',
      transition: 'all 0.3s ease-in-out' 
    }}
  >
    <Box mb={5}>
      {icon}
    </Box>
    <Heading as="h3" size="md" mb={3} color="gray.800">
      {title}
    </Heading>
    <Text color="gray.600" lineHeight="tall">
      {description}
    </Text>
  </Box>
);

const StatItem = ({ number, label }) => (
  <Box 
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="md"
    _hover={{
      transform: 'scale(1.03)',
      boxShadow: 'lg',
      transition: 'all 0.3s'
    }}
  >
    <Text fontSize="3xl" fontWeight="bold" color="blue.500" mb={2}>
      {number}
    </Text>
    <Text fontSize="lg" color="gray.600">
      {label}
    </Text>
  </Box>
);

export default About;
