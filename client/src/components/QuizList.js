import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Heading, Text, VStack, Link as ChakraLink, useColorMode } from '@chakra-ui/react';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Fetch available quiz categories from our API
    axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then(response => {
        const categories = response.data;
        // Create a quiz for each category
        const categoryQuizzes = categories.map(category => ({
          _id: `category-${category._id || category.name}`,
          title: `${category.name} Quiz`,
          description: `Test your knowledge of ${category.name}`,
          category: category.name,
          difficulty: 'medium',
          timeLimit: 15, // 15 minutes
          questions: [] // Will be loaded when quiz is started
        }));
        setQuizzes(categoryQuizzes);
      })
      .catch(error => {
        console.error('Error fetching quiz categories:', error);
        // Fallback to some default categories if the API call fails
        setQuizzes([
          {
            _id: 'general-knowledge',
            title: 'General Knowledge Quiz',
            description: 'Test your general knowledge',
            category: 'General Knowledge',
            difficulty: 'medium',
            timeLimit: 15
          },
          {
            _id: 'science',
            title: 'Science Quiz',
            description: 'Test your science knowledge',
            category: 'Science',
            difficulty: 'medium',
            timeLimit: 15
          },
          {
            _id: 'history',
            title: 'History Quiz',
            description: 'Test your history knowledge',
            category: 'History',
            difficulty: 'medium',
            timeLimit: 15
          }
        ]);
      });
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>Available Quizzes</Heading>
      <VStack spacing={4} align="stretch">
        {quizzes.length === 0 ? (
          <Text>No quizzes available. Please add one using the backend API.</Text>
        ) : (
          quizzes.map(quiz => (
            <ChakraLink as={ReactRouterLink} to={`/quiz/${quiz._id}`} key={quiz._id}>
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" _hover={{ bg: colorMode === 'dark' ? 'gray.700' : 'gray.50' }}>
                <Heading fontSize="xl">{quiz.title}</Heading>
                <Text mt={2}>{quiz.description}</Text>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Category: {quiz.category} • Difficulty: {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </Text>
                {quiz.timeLimit > 0 && <Text fontSize="sm" color="gray.500">Time Limit: {quiz.timeLimit} minutes</Text>}
              </Box>
            </ChakraLink>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default QuizList;
