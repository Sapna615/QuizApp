import { BrowserRouter as Router, Route, Routes, Link as ReactRouterLink } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizDetail from './components/QuizDetail';
import { Box, Flex, Link as ChakraLink, Button, useColorMode, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Chatbot from './components/Chatbot';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    // You might want to redirect to home or login page after logout
  };

  return (
    <Router>
      <AppContent colorMode={colorMode} toggleColorMode={toggleColorMode} userInfo={userInfo} logoutHandler={logoutHandler} />
    </Router>
  );
}

function AppContent({ colorMode, toggleColorMode, userInfo, logoutHandler }) {
  return (
    <>
      <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'white'}>
        <Flex direction="column" minH="100vh">
          <Flex 
            as="nav" 
            p={{ base: 3, md: 4 }}
            bg={colorMode === 'dark' ? 'gray.800' : 'blue.500'} 
            color="white" 
            justify="space-between" 
            align="center" 
            position="relative" 
            zIndex="2"
            boxShadow="md"
            flexWrap="wrap"
          >
          <ChakraLink as={ReactRouterLink} to="/" fontWeight="bold" fontSize="xl">Quiz App</ChakraLink>
          <Flex align="center" wrap="wrap" gap={{ base: 2, md: 4 }}>
            <ChakraLink as={ReactRouterLink} to="/" fontSize={{ base: "sm", md: "md" }}>Home</ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/quizzes" fontSize={{ base: "sm", md: "md" }}>Quizzes</ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/leaderboard" fontSize={{ base: "sm", md: "md" }}>Leaderboard</ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/about" fontSize={{ base: "sm", md: "md" }}>About</ChakraLink>

            {userInfo ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={4}>
                  {userInfo.username}
                </MenuButton>
                <MenuList>
                  {userInfo.role === 'admin' && (
                    <ChakraLink as={ReactRouterLink} to="/admin">
                      <MenuItem>Admin Dashboard</MenuItem>
                    </ChakraLink>
                  )}
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <ChakraLink as={ReactRouterLink} to="/login" fontSize={{ base: "sm", md: "md" }}>Login</ChakraLink>
                <ChakraLink as={ReactRouterLink} to="/register" fontSize={{ base: "sm", md: "md" }}>Register</ChakraLink>
              </>
            )}
            
            <Button onClick={toggleColorMode} size="sm" ml={{ base: 2, md: 4 }}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>

        <Box flex="1" p={4} position="relative" zIndex="1">
          <Box maxW="1200px" mx="auto" w="100%" px={[2, 4, 6]}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quiz-start" element={<QuizDetail />} />
              <Route path="/quiz/:id" element={<QuizDetail />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </Box>

        <Footer />
        <Chatbot />
      </Flex>
      </Box>
    </>
  );
}

export default App;
