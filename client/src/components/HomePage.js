import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Button, SimpleGrid, VStack, Select, useColorModeValue, FormControl, FormLabel, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GiWorld, GiMicroscope, GiScrollQuill, GiSoccerBall, GiFilmStrip, GiProcessor, GiNetworkBars, GiLaptop } from 'react-icons/gi';
import { FaMap, FaPython } from 'react-icons/fa';
import axios from 'axios'; // Import axios

const categories = [
  { name: 'General Knowledge', icon: GiWorld },
  { name: 'Science', icon: GiMicroscope },
  { name: 'History', icon: GiScrollQuill },
  { name: 'Geography', icon: FaMap },
  { name: 'Sports', icon: GiSoccerBall },
  { name: 'Entertainment', icon: GiFilmStrip },
  { name: 'Java Programming', icon: GiProcessor },
  { name: 'Python Programming', icon: FaPython },
  { name: 'Operating Systems', icon: GiLaptop },
  { name: 'Networking', icon: GiNetworkBars },
  { name: 'React', icon: GiProcessor },
  { name: 'Node.js', icon: GiProcessor },
];

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <Box
    p={6}
    bg={useColorModeValue('white', 'gray.800')}
    borderRadius="lg"
    boxShadow="md"
    borderWidth="1px"
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    transition="all 0.3s"
    flex={1}
    maxW={{ base: '100%', md: '300px' }}
    _hover={{
      transform: 'translateY(-4px)',
      boxShadow: 'lg',
      borderColor: 'blue.400',
    }}
  >
    <Flex direction="column" align="center" textAlign="center">
      <Text fontSize="4xl" mb={4}>
        {icon}
      </Text>
      <Heading as="h3" size="md" mb={3} color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="sm" lineHeight="1.6">
        {description}
      </Text>
    </Flex>
  </Box>
);

// Section Component
const Section = ({ children }) => (
  <Box py={16} px={4}>
    {children}
  </Box>
);

// Section Title Component
const SectionTitle = ({ children }) => (
  <Heading 
    as="h2" 
    size="2xl" 
    textAlign="center" 
    mb={12}
    fontWeight="bold"
    color={useColorModeValue('gray.800', 'white')}
  >
    {children}
  </Heading>
);

// How It Works Section Component
const HowItWorksSection = () => (
  <Section>
    <SectionTitle>How It Works</SectionTitle>
    <Flex 
      direction={{ base: 'column', lg: 'row' }}
      gap={{ base: 6, lg: 8 }}
      justify="center"
      align="stretch"
      maxW="6xl"
      mx="auto"
      px={{ base: 4, lg: 0 }}
    >
      <StepCard 
        stepNumber="1"
        title="Choose a Topic"
        description="Enter any subject you can think of, or pick from our list of popular categories."
      />
      <StepCard 
        stepNumber="2"
        title="AI Generation"
        description="API instantly creates a unique, 5,10,15,20-question multiple-choice quiz tailored to your topic and few self added questions."
      />
      <StepCard 
        stepNumber="3"
        title="Test Your Knowledge"
        description="Answer the questions and see how well you know your stuff. The interface is clean and simple."
      />
      <StepCard 
        stepNumber="4"
        title="See Your Results"
        description="Get your score, review your answers, and submit your name to the leaderboard!"
      />
    </Flex>
  </Section>
);

// Step Card Component
const StepCard = ({ stepNumber, title, description }) => (
  <Box
    p={6}
    bg={useColorModeValue('white', 'gray.800')}
    borderRadius="lg"
    boxShadow="md"
    borderWidth="1px"
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    transition="all 0.3s"
    flex={1}
    position="relative"
    _hover={{
      transform: 'translateY(-4px)',
      boxShadow: 'lg',
      borderColor: 'teal.400',
    }}
  >
    <Flex direction="column" h="full">
      <Box
        w={12}
        h={12}
        borderRadius="full"
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        color="white"
        fontWeight="bold"
        fontSize="xl"
      >
        {stepNumber}
      </Box>
      <Heading as="h3" size="md" mb={3} color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="sm" lineHeight="1.6">
        {description}
      </Text>
    </Flex>
  </Box>
);

// Team Member Component
const TeamMember = ({ name, role, bio, image }) => (
  <Box 
    bg={useColorModeValue('white', 'gray.800')} 
    p={6} 
    borderRadius="lg" 
    boxShadow="md"
    textAlign="center"
    _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s' }}
  >
    <Image 
      src={image} 
      alt={name} 
      borderRadius="full" 
      boxSize="150px" 
      mx="auto" 
      mb={4}
      objectFit="cover"
    />
    <Heading as="h3" size="md" mb={1} color={useColorModeValue('gray.800', 'white')}>
      {name}
    </Heading>
    <Text color="blue.500" fontWeight="medium" mb={3}>
      {role}
    </Text>
    <Text color={useColorModeValue('gray.600', 'gray.300')}>
      {bio}
    </Text>
  </Box>
);

// Team Section Component
const TeamSection = () => (
  <Section>
    <SectionTitle>Meet Our Team</SectionTitle>
    <Box 
      display="grid" 
      gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} 
      gap={8}
      maxW="6xl"
      mx="auto"
    >
      <TeamMember 
        name="Sapna Rai"
        role="Backend Developer"
        bio="Back-end developer managing server-side logic, APIs, and core functionality of the project."
        image="https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_hybrid&w=740&q=80"
      />
      <TeamMember 
        name="Sourav"
        role="Frontend Developer"
        bio="Front-end developer responsible for designing and developing the user interface of the project."
        image="https://previews.123rf.com/images/artinspiring/artinspiring1811/artinspiring181100743/127434465-portrait-of-young-man-beautiful-handsome-boy-avatar-guy-smiling-male-character-isolated-vector.jpg"
      />
      <TeamMember 
        name="Kunal Tudu"
        role="Database Administrator"
        bio="Handled database design, optimization, and integration for the project."
        image="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740&q=80"
      />
    </Box>
  </Section>
);

// Features Section Component
const FeaturesSection = () => (
  <Section>
    <SectionTitle>Why You'll Love <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Quiz Game</span></SectionTitle>
    <Flex 
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 6, md: 8 }}
      justify="center"
      align="center"
      maxW="6xl"
      mx="auto"
      px={{ base: 4, md: 0 }}
    >
      <FeatureCard 
        icon="🧠"
        title="Infinite Topics"
        description="From Ancient History to Zoology, if you can name it, you can play a quiz on it."
      />
      <FeatureCard 
        icon="✨"
        title="AI-Powered"
        description="Leveraging Gemini to create unique and challenging questions every single time you play."
      />
      <FeatureCard 
        icon="🏆"
        title="Climb the Ranks"
        description="Submit your score and compete with others on the global leaderboard for ultimate bragging rights."
      />
    </Flex>
  </Section>
);

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('General Knowledge');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(0); // New timeLimit state (0 for no limit)
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null); // New error state
  const navigate = useNavigate();

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedBorderColor = 'blue.500';

  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    console.log('Environment Variables:', {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      NODE_ENV: process.env.NODE_ENV
    });
    try {
      // First, try to get quizzes from MongoDB (admin-created quizzes)
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const { data: mongoQuizzes } = await axios.get(
          `${apiUrl}/api/quizzes?category=${encodeURIComponent(selectedCategory)}&difficulty=${encodeURIComponent(difficulty)}`,
          { withCredentials: true }
        );
        
        // If we have quizzes in MongoDB for this category and difficulty, use one of them
        if (mongoQuizzes && mongoQuizzes.length > 0) {
          // Randomly select one quiz from the available ones
          const randomQuiz = mongoQuizzes[Math.floor(Math.random() * mongoQuizzes.length)];
          
          // Limit questions if the quiz has more than requested
          let questionsToUse = randomQuiz.questions;
          if (numQuestions > 0 && questionsToUse.length > numQuestions) {
            // Shuffle and take first N questions
            const shuffled = [...questionsToUse].sort(() => Math.random() - 0.5);
            questionsToUse = shuffled.slice(0, numQuestions);
          }
          
          const quizData = {
            title: randomQuiz.title,
            description: randomQuiz.description,
            questions: questionsToUse,
            timeLimit: timeLimit || randomQuiz.timeLimit || 0,
            category: randomQuiz.category,
            difficulty: randomQuiz.difficulty,
          };
          
          navigate('/quiz-start', { state: { quizData } });
          return;
        }
      } catch (mongoErr) {
        console.log('No MongoDB quizzes found, falling back to external API', mongoErr);
      }
      
      // Fallback to external API if no MongoDB quizzes found
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const { data } = await axios.get(
        `${apiUrl}/api/external-quizzes?category=${encodeURIComponent(selectedCategory)}&difficulty=${encodeURIComponent(difficulty)}&amount=${numQuestions}`,
        { withCredentials: true }
      );
      const quizWithTimeLimit = { ...data, timeLimit: timeLimit };
      navigate('/quiz-start', { state: { quizData: quizWithTimeLimit } });
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Failed to fetch quiz questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} pt={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} mb={4}>Welcome to QuizMaster!</Heading>
          <Text fontSize={{ base: "md", md: "xl" }} color="gray.600" _dark={{ color: "gray.300" }}>
            Select a topic, set your preferences, and start testing your knowledge. Challenge yourself
            with timed quizzes and track your progress!
          </Text>
        </Box>

        {error && <Text color="red.500" textAlign="center" mb={4}>{error}</Text>}

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        <Box px={{ base: 4, md: 0 }}>
          <Heading as="h2" size="lg" mb={4}>Choose a Topic</Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={{ base: 3, md: 4 }}>
            {categories.map((cat) => (
              <Flex
                key={cat.name}
                direction="column"
                align="center"
                justify="center"
                p={4}
                borderWidth="2px"
                borderRadius="lg"
                borderColor={selectedCategory === cat.name ? selectedBorderColor : borderColor}
                bg={bgColor}
                cursor="pointer"
                onClick={() => setSelectedCategory(cat.name)}
                _hover={{ shadow: "md" }}
                minH="120px"
              >
                <Box as={cat.icon} fontSize="3xl" mb={2} />
                <Text fontWeight="medium" textAlign="center">{cat.name}</Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>

        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" mt={8} wrap="wrap" px={{ base: 4, md: 0 }}>
          <FormControl id="difficulty" flex="1" mr={{ md: 4 }} mb={{ base: 4, md: 0 }} minW={{ base: "100%", md: "200px" }}>
            <FormLabel>Difficulty Level</FormLabel>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </FormControl>

          <FormControl id="numQuestions" flex="1" minW={{ base: "100%", md: "200px" }}>
            <FormLabel>Number of Questions</FormLabel>
            <Select value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value))}>
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
            </Select>
          </FormControl>

          <FormControl id="timeLimit" flex="1" ml={{ md: 4 }} mb={{ base: 4, md: 0 }} minW={{ base: "100%", md: "200px" }}> {/* New timeLimit control */}
            <FormLabel>Time Limit (minutes)</FormLabel>
            <Select value={timeLimit} onChange={(e) => setTimeLimit(parseInt(e.target.value))}>
              <option value={0}>No Limit</option>
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
              <option value={20}>20 Minutes</option>
            </Select>
          </FormControl>
        </Flex>

        <Button 
          colorScheme="blue" 
          size={{ base: "lg", md: "md" }} 
          onClick={handleStartQuiz} 
          mt={8} 
          width={{ base: "full", md: "auto" }}
          px={{ base: 8, md: 6 }}
          py={{ base: 6, md: 4 }}
          fontSize={{ base: "lg", md: "md" }}
          isLoading={loading} 
          isDisabled={loading}
          minH={{ base: "60px", md: "auto" }}
        >
          Start Quiz
        </Button>

        {/* Team Section */}
        <TeamSection />
      </VStack>
    </Box>
  );
}

export default HomePage;
