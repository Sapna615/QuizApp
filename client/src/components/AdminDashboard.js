import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Heading, Text, VStack, Spinner, Alert, AlertIcon, SimpleGrid, Button, Flex,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Select, Textarea, IconButton, Table, Thead, Tbody, Tr, Th, Td, Divider, Tooltip
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);
  const [leaderboardGlobal, setLeaderboardGlobal] = useState([]);

  // State for time tracking
  const [recentTests, setRecentTests] = useState([]);
  const [recentTestsLoading, setRecentTestsLoading] = useState(false);
  const [recentTestsError, setRecentTestsError] = useState(null);

  // State for new quiz form
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizDescription, setNewQuizDescription] = useState('');
  const [newQuizCategory, setNewQuizCategory] = useState('General Knowledge');
  const [newQuizDifficulty, setNewQuizDifficulty] = useState('Medium');
  const [newQuizTimeLimit, setNewQuizTimeLimit] = useState(0);
  const [newQuizQuestions, setNewQuizQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const getStoredUserInfo = () => {
    try {
      const stored = localStorage.getItem('userInfo');
      if (!stored) {
        console.log('No user info found in localStorage');
        return null;
      }
      const userInfo = JSON.parse(stored);
      if (!userInfo.token) {
        console.log('No token found in user info');
        return null;
      }
      return userInfo;
    } catch (error) {
      console.error('Error parsing user info:', error);
      return null;
    }
  };

  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      const userInfo = getStoredUserInfo();
      if (!userInfo) throw new Error('Missing admin credentials');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/quizzes`, config);
      setQuizzes(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError('Failed to fetch quizzes.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Removed unused functions to clean up the code

  const fetchGlobalLeaderboard = useCallback(async () => {
    try {
      setLeaderboardLoading(true);
      setLeaderboardError('');
      
      const userInfo = getStoredUserInfo();
      if (!userInfo?.token) {
        throw new Error('No authentication token found');
      }

      // Use the public endpoint for global leaderboard (no auth required)
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/leaderboard/public/global?limit=10`);

      // Process the response data to ensure it has the expected structure
      let leaderboardData = [];
      
      if (response.data && Array.isArray(response.data)) {
        // If response.data is already an array, use it directly
        leaderboardData = response.data;
      } else if (response.data?.results && Array.isArray(response.data.results)) {
        // If response has a results array, use that
        leaderboardData = response.data.results;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        // If response has a data array, use that
        leaderboardData = response.data.data;
      }

      // Ensure all items have the required fields
      const processedData = leaderboardData.map((item, index) => ({
        rank: index + 1,
        userId: item.userId || item._id || `user-${index}`,
        name: item.name || item.username || `User ${index + 1}`,
        username: item.username || `user${index + 1}`,
        email: item.email || 'N/A',
        totalScore: item.totalScore || 0,
        quizzesCount: item.quizzesCount || 0,
        attempts: item.attempts || 1,
        lastPlayed: item.lastPlayed || null
      }));

      setLeaderboardGlobal(processedData);
      
      // If we have no data but the response was successful, log it for debugging
      if (processedData.length === 0) {
        console.log('No leaderboard data available', { response });
      }
    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
      setLeaderboardError(error.response?.data?.message || 'Failed to fetch global leaderboard');
      setLeaderboardGlobal([]); // Reset to empty array on error
    } finally {
      setLeaderboardLoading(false);
    }
  }, []); // Removed unnecessary navigate dependency

  // Fetch recent tests with time tracking
  const fetchRecentTests = useCallback(async () => {
    try {
      setRecentTestsLoading(true);
      setRecentTestsError('');
      
      const userInfo = getStoredUserInfo();
      if (!userInfo?.token) {
        throw new Error('No authentication token found');
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scores/recent`, config);
      
      // Sort by date completed (newest first)
      const sortedTests = response.data.sort((a, b) => 
        new Date(b.dateCompleted) - new Date(a.dateCompleted)
      );
      
      setRecentTests(sortedTests);
      
      if (sortedTests.length === 0) {
        console.log('No recent tests available', { response });
      }
    } catch (error) {
      console.error('Error fetching recent tests:', error);
      setRecentTestsError(error.response?.data?.message || 'Failed to fetch recent tests');
      setRecentTests([]);
    } finally {
      setRecentTestsLoading(false);
    }
  }, []);

  // Helper function to format time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  useEffect(() => {
    const userInfo = getStoredUserInfo();
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/');
    } else {
      fetchQuizzes();
      fetchGlobalLeaderboard();
      fetchRecentTests();
    }
  }, [navigate, fetchQuizzes, fetchGlobalLeaderboard, fetchRecentTests]);

  // Handlers for dynamic questions
  const handleAddQuestion = () => {
    setNewQuizQuestions([...newQuizQuestions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleRemoveQuestion = (qIndex) => {
    const list = [...newQuizQuestions];
    list.splice(qIndex, 1);
    setNewQuizQuestions(list);
  };

  const handleQuestionTextChange = (e, qIndex) => {
    const { value } = e.target;
    const list = [...newQuizQuestions];
    list[qIndex].questionText = value;
    setNewQuizQuestions(list);
  };

  const handleOptionChange = (e, qIndex, oIndex) => {
    const { value } = e.target;
    const list = [...newQuizQuestions];
    list[qIndex].options[oIndex] = value;
    setNewQuizQuestions(list);
  };

  const handleAddOption = (qIndex) => {
    const list = [...newQuizQuestions];
    list[qIndex].options.push('');
    setNewQuizQuestions(list);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const list = [...newQuizQuestions];
    list[qIndex].options.splice(oIndex, 1);
    setNewQuizQuestions(list);
  };

  const handleCorrectAnswerChange = (e, qIndex) => {
    const { value } = e.target;
    const list = [...newQuizQuestions];
    list[qIndex].correctAnswer = value;
    setNewQuizQuestions(list);
  };

  const handleDeleteQuiz = async (id) => {
    try {
      const userInfo = getStoredUserInfo();
      if (!userInfo) throw new Error('Missing admin credentials');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${process.env.REACT_APP_API_URL}/api/quizzes/${id}`, config);
      fetchQuizzes();
      onDeleteClose();
    } catch (err) {
      console.error('Error deleting quiz:', err);
      setError('Failed to delete quiz.');
    }
  };

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setNewQuizTitle(quiz.title);
    setNewQuizDescription(quiz.description);
    setNewQuizCategory(quiz.category);
    setNewQuizDifficulty(quiz.difficulty);
    setNewQuizTimeLimit(quiz.timeLimit);
    setNewQuizQuestions(quiz.questions);
    onEditOpen();
  };

  const handleUpdateQuiz = async () => {
    try {
      const userInfo = getStoredUserInfo();
      if (!userInfo) throw new Error('Missing admin credentials');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const updatedQuizData = {
        title: newQuizTitle,
        description: newQuizDescription,
        category: newQuizCategory,
        difficulty: newQuizDifficulty,
        timeLimit: newQuizTimeLimit,
        questions: newQuizQuestions.map(q => ({
          ...q,
          options: q.options.filter(opt => opt.trim() !== ''),
        })),
      };

      await axios.put(`${process.env.REACT_APP_API_URL}/api/quizzes/${currentQuiz._id}`, updatedQuizData, config);
      onEditClose();
      fetchQuizzes();
      resetForm();
    } catch (err) {
      console.error('Error updating quiz:', err);
      setError('Failed to update quiz.');
    }
  };

  const resetForm = () => {
    setNewQuizTitle('');
    setNewQuizDescription('');
    setNewQuizCategory('General Knowledge');
    setNewQuizDifficulty('Medium');
    setNewQuizTimeLimit(0);
    setNewQuizQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
    setCurrentQuiz(null);
  };

  const handleCreateQuiz = async () => {
    try {
      const userInfo = getStoredUserInfo();
      if (!userInfo) throw new Error('Missing admin credentials');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const newQuizData = {
        title: newQuizTitle,
        description: newQuizDescription,
        category: newQuizCategory,
        difficulty: newQuizDifficulty,
        timeLimit: newQuizTimeLimit,
        questions: newQuizQuestions.map(q => ({
          ...q,
          options: q.options.filter(opt => opt.trim() !== ''),
        })),
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/quizzes`, newQuizData, config);
      onClose();
      fetchQuizzes();
      resetForm();
    } catch (err) {
      console.error('Error creating quiz:', err);
      setError('Failed to create quiz.');
    }
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading quizzes...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h1" size="xl">Admin Dashboard</Heading>
          <Button colorScheme="blue" onClick={onOpen}>Create New Quiz</Button>
        </Flex>

        <Text fontSize="lg">Manage quizzes:</Text>

        {quizzes.length === 0 ? (
          <Text>No quizzes found in the database. Create one!</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {quizzes.map((quiz) => (
              <Box key={quiz._id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                <Heading fontSize="xl" mb={2}>{quiz.title}</Heading>
                <Text mb={1}>Category: {quiz.category}</Text>
                <Text mb={1}>Difficulty: {quiz.difficulty}</Text>
                <Text mb={2}>Questions: {quiz.questions.length}</Text>
                <Text fontSize="sm" color="gray.500">ID: {quiz._id}</Text>
                <Flex mt={4} justify="flex-end">
                  <Button 
                    colorScheme="teal" 
                    size="sm" 
                    mr={2}
                    leftIcon={<EditIcon />}
                    onClick={() => handleEditQuiz(quiz)}
                  >
                    Edit
                  </Button>
                  <Button 
                    colorScheme="red" 
                    size="sm"
                    leftIcon={<DeleteIcon />}
                    onClick={() => {
                      setCurrentQuiz(quiz);
                      onDeleteOpen();
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        )}

        <Divider my={8} />

        <Heading as="h2" size="lg">Leaderboards</Heading>
        <Text color="gray.600">Only admins can view these leaderboards. Use them to track overall progress and celebrate top performers.</Text>

        {leaderboardError && (
          <Alert status="error">
            <AlertIcon />
            Failed to fetch global leaderboard.
          </Alert>
        )}

        <Box mt={8}>
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Heading as="h3" size="lg" color="gray.800">Global Leaderboard</Heading>
              <Text color="gray.600" mt={1}>
                Track overall user performance and celebrate top performers
              </Text>
            </Box>
            <Button 
              colorScheme="blue" 
              size="sm" 
              leftIcon={<Box as="span">🔄</Box>}
              onClick={fetchGlobalLeaderboard}
              isLoading={leaderboardLoading}
              loadingText="Refreshing..."
            >
              Refresh
            </Button>
          </Flex>

          {leaderboardError && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {leaderboardError}
            </Alert>
          )}

          {leaderboardLoading ? (
            <Flex justify="center" py={12} bg="white" borderRadius="lg" borderWidth="1px">
              <Spinner size="xl" thickness="3px" color="blue.500" />
            </Flex>
          ) : leaderboardGlobal.length > 0 ? (
            <Box 
              overflowX="auto" 
              borderWidth="1px" 
              borderRadius="lg" 
              bg="white"
              boxShadow="sm"
            >
              <Table variant="simple" size="md">
                <Thead bg="gray.50">
                  <Tr>
                    <Th w="80px" color="gray.600">Rank</Th>
                    <Th color="gray.600">User</Th>
                    <Th color="gray.600">Email</Th>
                    <Th isNumeric color="gray.600">Score</Th>
                    <Th isNumeric color="gray.600">Quizzes</Th>
                    <Th isNumeric color="gray.600">Attempts</Th>
                    <Th color="gray.600">Last Active</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {leaderboardGlobal.map((user, index) => (
                    <Tr 
                      key={user.userId}
                      _hover={{ bg: 'gray.50' }}
                      borderBottomWidth="1px"
                      borderBottomColor="gray.100"
                    >
                      <Td>
                        <Flex align="center">
                          <Box 
                            display="inline-flex" 
                            alignItems="center" 
                            justifyContent="center"
                            w={8} 
                            h={8} 
                            borderRadius="full"
                            bg={index < 3 ? 'blue.50' : 'gray.50'}
                            color={index < 3 ? 'blue.600' : 'gray.700'}
                            fontWeight="bold"
                            fontSize="sm"
                          >
                            {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                          </Box>
                        </Flex>
                      </Td>
                      <Td fontWeight="medium">
                        <Box>
                          <Text>{user.name || user.username || `User ${index + 1}`}</Text>
                          {user.email && (
                            <Text fontSize="xs" color="gray.500" isTruncated maxW="200px">
                              {user.email}
                            </Text>
                          )}
                        </Box>
                      </Td>
<Td fontSize="sm" color="gray.600">
                        <Text>@{user.username || 'user'}</Text>
                        <Text fontSize="xs" color="gray.500">
                          ID: {user.userId.substring(0, 8)}...
                        </Text>
                      </Td>
                      <Td isNumeric fontWeight="bold" color={index < 3 ? 'blue.600' : 'gray.800'}>
                        {user.totalScore.toLocaleString()}
                      </Td>
                      <Td isNumeric color="gray.700">
                        {user.quizzesCount}
                      </Td>
                      <Td isNumeric color="gray.700">
                        {user.attempts}
                      </Td>
                      <Td fontSize="sm" color="gray.600">
                        {user.lastPlayed ? (
                          <Tooltip 
                            label={new Date(user.lastPlayed).toLocaleString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                            placement="top"
                            hasArrow
                          >
                            <Box>
                              {new Date(user.lastPlayed).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </Box>
                          </Tooltip>
                        ) : 'N/A'}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              
              {leaderboardGlobal.length > 10 && (
                <Flex justify="center" p={4} borderTopWidth="1px">
                  <Text color="gray.500" fontSize="sm">
                    Showing {Math.min(leaderboardGlobal.length, 10)} of {leaderboardGlobal.length} users
                  </Text>
                </Flex>
              )}
            </Box>
          ) : (
            <Box 
              textAlign="center" 
              py={12} 
              bg="white" 
              borderRadius="lg" 
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="gray.200"
            >
              <Box as="span" display="inline-block" mb={3} p={3} bg="blue.50" borderRadius="full">
                <Box as="span" fontSize="2xl" color="blue.500">📊</Box>
              </Box>
              <Text fontSize="lg" fontWeight="medium" color="gray.700" mb={2}>
                No leaderboard data available yet
              </Text>
              <Text color="gray.500" maxW="md" mx="auto">
                User scores will appear here once they start taking quizzes. Check back later!
              </Text>
            </Box>
          )}
        </Box>

        <Divider my={8} />

        {/* Time Tracking Section */}
        <Heading as="h2" size="lg">Test Time Tracking</Heading>
        <Text color="gray.600">View when users took their tests and track quiz completion times.</Text>

        <Box mt={8}>
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Heading as="h3" size="lg" color="gray.800">Recent Test Activity</Heading>
              <Text color="gray.600" mt={1}>
                See when users completed their quizzes
              </Text>
            </Box>
            <Button 
              colorScheme="blue" 
              size="sm" 
              leftIcon={<Box as="span">🔄</Box>}
              onClick={fetchRecentTests}
              isLoading={recentTestsLoading}
              loadingText="Refreshing..."
            >
              Refresh
            </Button>
          </Flex>

          {recentTestsError && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {recentTestsError}
            </Alert>
          )}

          {recentTestsLoading ? (
            <Flex justify="center" py={12} bg="white" borderRadius="lg" borderWidth="1px">
              <Spinner size="xl" thickness="3px" color="blue.500" />
            </Flex>
          ) : recentTests.length > 0 ? (
            <Box 
              overflowX="auto" 
              borderWidth="1px" 
              borderRadius="lg" 
              bg="white"
              boxShadow="sm"
            >
              <Table variant="simple" size="md">
                <Thead bg="gray.50">
                  <Tr>
                    <Th color="gray.600">User</Th>
                    <Th color="gray.600">Quiz</Th>
                    <Th color="gray.600">Score</Th>
                    <Th color="gray.600">Date & Time</Th>
                    <Th color="gray.600">Time Ago</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentTests.map((test, index) => (
                    <Tr 
                      key={test._id}
                      _hover={{ bg: 'gray.50' }}
                      borderBottomWidth="1px"
                      borderBottomColor="gray.100"
                    >
                      <Td fontWeight="medium">{test.username}</Td>
                      <Td>{test.quizTitle}</Td>
                      <Td>
                        <Text fontWeight="bold" color="green.600">
                          {test.score}/{test.totalQuestions}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm">
                          {new Date(test.dateCompleted).toLocaleString()}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" color="gray.500">
                          {getTimeAgo(test.dateCompleted)}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              
              {recentTests.length > 10 && (
                <Flex justify="center" p={4} borderTopWidth="1px">
                  <Text color="gray.500" fontSize="sm">
                    Showing {Math.min(recentTests.length, 10)} of {recentTests.length} tests
                  </Text>
                </Flex>
              )}
            </Box>
          ) : (
            <Box 
              textAlign="center" 
              py={12} 
              bg="white" 
              borderRadius="lg" 
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Box as="span" display="inline-block" mb={3} p={3} bg="blue.50" borderRadius="full">
                <Box as="span" fontSize="2xl" color="blue.500">⏰</Box>
              </Box>
              <Text fontSize="lg" fontWeight="medium" color="gray.700" mb={2}>
                No test activity yet
              </Text>
              <Text color="gray.500" maxW="md" mx="auto">
                User test times will appear here once users start taking quizzes.
              </Text>
            </Box>
          )}
        </Box>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Quiz</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete the quiz "{currentQuiz?.title}"? This action cannot be undone.</Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={() => handleDeleteQuiz(currentQuiz?._id)}
                isLoading={loading}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Edit Quiz Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Quiz</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mb={4}>
                <FormLabel>Quiz Title</FormLabel>
                <Input 
                  placeholder="Enter quiz title"
                  value={currentQuiz?.title || ''}
                  onChange={(e) => setCurrentQuiz({...currentQuiz, title: e.target.value})}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder="Enter quiz description"
                  value={currentQuiz?.description || ''}
                  onChange={(e) => setCurrentQuiz({...currentQuiz, description: e.target.value})}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                <Select 
                  value={currentQuiz?.category || ''}
                  onChange={(e) => setCurrentQuiz({...currentQuiz, category: e.target.value})}
                >
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Difficulty</FormLabel>
                <Select 
                  value={currentQuiz?.difficulty || 'Medium'}
                  onChange={(e) => setCurrentQuiz({...currentQuiz, difficulty: e.target.value})}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdateQuiz}>
                Save Changes
              </Button>
              <Button onClick={onEditClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete the quiz "{currentQuiz?.title}"? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={() => handleDeleteQuiz(currentQuiz?._id)}
              isLoading={loading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Quiz Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Quiz Title</FormLabel>
              <Input 
                placeholder="Enter quiz title" 
                value={newQuizTitle} 
                onChange={(e) => setNewQuizTitle(e.target.value)} 
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea 
                placeholder="Enter quiz description" 
                value={newQuizDescription} 
                onChange={(e) => setNewQuizDescription(e.target.value)} 
              />
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input 
                  value={newQuizCategory} 
                  onChange={(e) => setNewQuizCategory(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Difficulty</FormLabel>
                <Select 
                  value={newQuizDifficulty} 
                  onChange={(e) => setNewQuizDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            <FormControl mb={4}>
              <FormLabel>Time Limit (minutes, 0 for no limit)</FormLabel>
              <Input 
                type="number" 
                min="0" 
                value={newQuizTimeLimit} 
                onChange={(e) => setNewQuizTimeLimit(parseInt(e.target.value) || 0)} 
              />
            </FormControl>

            <Divider my={4} />
            <Heading size="md" mb={4}>Questions</Heading>

            {newQuizQuestions.map((question, qIndex) => (
              <Box key={qIndex} mb={6} p={4} borderWidth="1px" borderRadius="md">
                <Flex justify="space-between" align="center" mb={2}>
                  <FormLabel>Question {qIndex + 1}</FormLabel>
                  <IconButton
                    aria-label="Remove question"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    isDisabled={newQuizQuestions.length <= 1}
                  />
                </Flex>
                <FormControl mb={4}>
                  <Input
                    placeholder="Enter question text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(e, qIndex)}
                  />
                </FormControl>

                <FormLabel mb={2}>Options</FormLabel>
                {question.options.map((option, oIndex) => (
                  <Flex key={oIndex} mb={2} align="center">
                    <Input
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                      mr={2}
                    />
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={question.correctAnswer === option}
                      onChange={() => {
                        const list = [...newQuizQuestions];
                        list[qIndex].correctAnswer = option;
                        setNewQuizQuestions(list);
                      }}
                      disabled={!option.trim()}
                    />
                    <IconButton
                      aria-label="Remove option"
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleRemoveOption(qIndex, oIndex)}
                      isDisabled={question.options.length <= 2}
                      ml={2}
                    />
                  </Flex>
                ))}

                <Button
                  size="sm"
                  mt={2}
                  leftIcon={<AddIcon />}
                  onClick={() => handleAddOption(qIndex)}
                  isDisabled={question.options.length >= 6}
                >
                  Add Option
                </Button>
              </Box>
            ))}

            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={handleAddQuestion}
              isDisabled={newQuizQuestions.length >= 20}
            >
              Add Question
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleUpdateQuiz}
              isLoading={loading}
              isDisabled={
                !newQuizTitle.trim() ||
                !newQuizDescription.trim() ||
                newQuizQuestions.some(
                  q => 
                    !q.questionText.trim() ||
                    q.options.filter(opt => opt.trim() !== '').length < 2 ||
                    !q.correctAnswer.trim()
                )
              }
            >
              Update Quiz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Quiz Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentQuiz ? 'Edit Quiz' : 'Create New Quiz'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Quiz Title</FormLabel>
              <Input placeholder="Enter quiz title" value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter quiz description" value={newQuizDescription} onChange={(e) => setNewQuizDescription(e.target.value)} />
            </FormControl>

            <Flex mb={4}>
              <FormControl mr={4}>
                <FormLabel>Category</FormLabel>
                <Select value={newQuizCategory} onChange={(e) => setNewQuizCategory(e.target.value)}>
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainment">Entertainment</option>
                </Select>
              </FormControl>

              <FormControl mr={4}>
                <FormLabel>Difficulty</FormLabel>
                <Select value={newQuizDifficulty} onChange={(e) => setNewQuizDifficulty(e.target.value)}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Time Limit (minutes)</FormLabel>
                <Input type="number" value={newQuizTimeLimit} onChange={(e) => setNewQuizTimeLimit(parseInt(e.target.value, 10) || 0)} />
              </FormControl>
            </Flex>

            <Heading as="h3" size="md" mb={4}>Questions</Heading>
            <VStack spacing={4} align="stretch">
              {newQuizQuestions.map((question, qIndex) => (
                <Box key={qIndex} p={4} borderWidth="1px" borderRadius="md">
                  <Flex justify="space-between" align="center" mb={2}>
                    <FormLabel mb={0}>Question {qIndex + 1}</FormLabel>
                    {newQuizQuestions.length > 1 && (
                      <IconButton
                        aria-label="Remove question"
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() => handleRemoveQuestion(qIndex)}
                      />
                    )}
                  </Flex>
                  <FormControl mb={3}>
                    <Input
                      placeholder="Enter question text"
                      value={question.questionText}
                      onChange={(e) => handleQuestionTextChange(e, qIndex)}
                    />
                  </FormControl>

                  <FormLabel>Options</FormLabel>
                  <VStack pl={4} spacing={2} align="stretch" mb={3}>
                    {question.options.map((option, oIndex) => (
                      <Flex key={oIndex}>
                        <Input
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                          mr={2}
                        />
                        {question.options.length > 2 && (
                          <IconButton
                            aria-label="Remove option"
                            icon={<DeleteIcon />}
                            size="sm"
                            onClick={() => handleRemoveOption(qIndex, oIndex)}
                          />
                        )}
                      </Flex>
                    ))}
                    <Button size="sm" leftIcon={<AddIcon />} onClick={() => handleAddOption(qIndex)}>Add Option</Button>
                  </VStack>

                  <FormControl>
                    <FormLabel>Correct Answer</FormLabel>
                    <Select
                      placeholder="Select correct answer"
                      value={question.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(e, qIndex)}
                    >
                      {question.options.filter(opt => opt.trim() !== '').map((option, oIndex) => (
                        <option key={oIndex} value={option}>{option}</option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ))}
              <Button leftIcon={<AddIcon />} onClick={handleAddQuestion}>Add New Question</Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={currentQuiz ? handleUpdateQuiz : handleCreateQuiz}
            isDisabled={
              !newQuizTitle.trim() ||
              !newQuizDescription.trim() ||
              newQuizQuestions.some(
                q => 
                  !q.questionText.trim() ||
                  q.options.filter(opt => opt.trim() !== '').length < 2 ||
                  !q.correctAnswer.trim()
              )
            }
            isLoading={loading}
          >
            {currentQuiz ? 'Update' : 'Create'}
          </Button>
            <Button 
            onClick={() => {
              onClose();
              resetForm();
            }}
          >
            Cancel
          </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </Box>
  );
}

export default AdminDashboard;
