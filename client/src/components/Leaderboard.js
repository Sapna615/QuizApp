import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';


function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Responsive grid columns based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Only fetch overall leaderboard
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/leaderboard/public/global?limit=10`);
      // The response now includes usernames
      setLeaderboardData(response.data.results || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to fetch leaderboard data');
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={{ base: 4, md: 6 }} maxW="6xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size={{ base: "2xl", md: "3xl" }} textAlign="center">Leaderboard</Heading>
        <Text textAlign="center" color="gray.600" fontSize={{ base: "sm", md: "md" }}>
          Track top performers across all quizzes. View the overall rankings based on total scores.
        </Text>

        {loading ? (
          <Flex justify="center" align="center" py={8}>
            <Spinner size="xl" />
          </Flex>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : leaderboardData.length === 0 ? (
          <Alert status="info">
            <AlertIcon />
            No scores recorded yet. Be the first to complete a quiz!
          </Alert>
        ) : (
          <Box>
            <Heading as="h2" size="lg" mb={4} textAlign="center">
              Overall Rankings
            </Heading>
            {isMobile ? (
              // Mobile layout - vertical cards
              <VStack spacing={4} align="stretch">
                {leaderboardData.map((entry, index) => (
                  <Box
                    key={entry.userId || index}
                    p={4}
                    borderRadius="lg"
                    bg={index % 2 === 0 ? 'white' : 'gray.50'}
                    borderWidth="1px"
                    borderColor="gray.200"
                    _hover={{ bg: 'gray.100', shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Flex align="center">
                        <Text 
                          fontWeight="bold" 
                          fontSize="lg"
                          color={index < 3 ? 'blue.600' : 'inherit'}
                          mr={2}
                        >
                          #{index + 1}
                        </Text>
                        <Text fontSize="lg">
                          {index === 0 && ' 🏆'}
                          {index === 1 && ' 🥈'}
                          {index === 2 && ' 🥉'}
                        </Text>
                      </Flex>
                      <Text fontWeight="bold" color="blue.500" fontSize="lg">
                        {entry.totalScore || 0} pts
                      </Text>
                    </Flex>
                    <Text fontWeight="medium" fontSize="md" mb={1}>
                      {entry.username || 'Unknown User'}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {entry.quizzesCount || 1} quizzes played
                    </Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              // Desktop layout - table format
              <Box overflowX="auto">
                <SimpleGrid columns={4} spacing={4} mb={4} fontWeight="bold" borderBottomWidth="2px" pb={2} borderColor="gray.300">
                  <Text>Rank</Text>
                  <Text>User</Text>
                  <Text textAlign="right">Total Score</Text>
                  <Text textAlign="right">Quizzes Played</Text>
                </SimpleGrid>
                {leaderboardData.map((entry, index) => (
                  <Box
                    key={entry.userId || index}
                    p={3}
                    borderRadius="md"
                    bg={index % 2 === 0 ? 'white' : 'gray.50'}
                    _hover={{ bg: 'gray.100' }}
                    transition="all 0.2s"
                  >
                    <SimpleGrid columns={4} spacing={4} alignItems="center">
                      <Text fontWeight={index < 3 ? 'bold' : 'normal'} color={index < 3 ? 'blue.600' : 'inherit'}>
                        {index + 1}
                        {index === 0 && ' 🏆'}
                        {index === 1 && ' 🥈'}
                        {index === 2 && ' 🥉'}
                      </Text>
                      <Text fontWeight="medium" isTruncated maxW="200px">
                        {entry.username || 'Unknown User'}
                      </Text>
                      <Text textAlign="right" fontWeight="bold">
                        {entry.totalScore || 0} pts
                      </Text>
                      <Text textAlign="right">
                        {entry.quizzesCount || 1} quizzes
                      </Text>
                    </SimpleGrid>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default Leaderboard;
