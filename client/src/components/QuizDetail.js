import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import { Box, Heading, Text, VStack, Radio, RadioGroup, Button, useToast, Progress, Flex } from '@chakra-ui/react';

function QuizDetail() {
  const location = useLocation(); // Use useLocation to get state
  const navigate = useNavigate(); // Use useNavigate for redirection
  const { quizData } = location.state || {}; // Get quizData from state

  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const loggedInUserId = storedUserInfo ? storedUserInfo._id : `guest-${Date.now()}`;
  const loggedInUsername = storedUserInfo ? storedUserInfo.username : 'Guest';

  const [quiz, setQuiz] = useState(quizData);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData?.timeLimit || 0);
  const [timerActive, setTimerActive] = useState(quizData?.timeLimit > 0);
  const toast = useToast();

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizData) {
        // If no quiz data was passed, try to get it from the URL params
        const quizId = location.pathname.split('/').pop();
        if (quizId) {
          try {
            // This is a category-based quiz, fetch questions from OpenTDB
            const category = quizId.replace('category-', '').replace(/-/g, ' ');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/external-quizzes?category=${encodeURIComponent(category)}&amount=10`);
            
            const quizFromApi = {
              ...quizData,
              _id: quizId,
              title: response.data.title || `${category} Quiz`,
              description: response.data.description || `Test your knowledge of ${category}`,
              questions: response.data.questions || [],
              timeLimit: response.data.timeLimit || 15,
              category: response.data.category || category,
              difficulty: response.data.difficulty || 'medium'
            };
            
            setQuiz(quizFromApi);
            setTimeLeft(quizFromApi.timeLimit * 60);
            setTimerActive(true);
            
          } catch (error) {
            console.error('Error loading quiz:', error);
            toast({
              title: 'Error loading quiz',
              description: 'Could not load quiz questions. Please try again.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            navigate('/quizzes');
          }
        } else {
          // No quiz ID in URL and no quiz data
          toast({
            title: 'No quiz selected',
            description: 'Please select a quiz to start.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          navigate('/quizzes');
        }
      } else {
        // Use the provided quiz data
        setQuiz(quizData);
        if (quizData.timeLimit > 0) {
          setTimeLeft(quizData.timeLimit * 60); // Convert minutes to seconds
          setTimerActive(true);
        }
      }
    };

    loadQuiz();
  }, [quizData, navigate, toast, location.pathname]);

  const handleSubmit = useCallback(() => {
    setTimerActive(false);
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      toast({
        title: 'No questions to submit',
        description: 'There are no questions in this quiz to submit.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const answersArray = quiz.questions.map((q, index) => selectedAnswers[index] || null);
    let correctAnswersCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] && selectedAnswers[index] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });

    axios.post(`${process.env.REACT_APP_API_URL}/api/scores`, {
      quizId: quiz._id,
      quizTitle: quiz.title,
      category: quiz.category,
      difficulty: quiz.difficulty,
      answers: answersArray,
      userId: loggedInUserId,
      username: loggedInUsername,
      score: correctAnswersCount,
      totalQuestions: quiz.questions.length,
    })
      .then(response => {
        setScore(response.data.score);
        setShowResults(true);
      })
      .catch(error => {
        console.error('There was an error submitting the quiz!', error);
        if (error.response && error.response.data && error.response.data.message) {
          toast({
            title: 'Submission Error',
            description: error.response.data.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          console.error('Backend Error:', error.response.data.message);
        } else {
          toast({
            title: 'Submission Error',
            description: 'Could not submit quiz. Please try again.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      });
  }, [quiz, selectedAnswers, loggedInUserId, loggedInUsername, toast]);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (timerActive && timeLeft <= 0 && quiz) {
      handleSubmit(); // Automatically submit when time runs out
    }
  }, [timeLeft, timerActive, quiz, handleSubmit]);

  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!quiz) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl">Loading quiz...</Text>
      </Box>
    );
  }

  const progressValue = quiz.timeLimit > 0 ? ((quiz.timeLimit * 60 - timeLeft) / (quiz.timeLimit * 60)) * 100 : 0;

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>{quiz.title}</Heading>
      <Text mb={4}>{quiz.description}</Text>

      {quiz.timeLimit > 0 && timerActive && (
        <Box mb={4}>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="bold">Time Left: {formatTime(timeLeft)}</Text>
            <Text>{quiz.timeLimit} minutes</Text>
          </Flex>
          <Progress value={progressValue} colorScheme="blue" size="sm" />
        </Box>
      )}

      {!showResults ? (
        <VStack spacing={6} align="stretch">
          {quiz.questions.map((question, qIndex) => (
            <Box key={qIndex} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={3}>{qIndex + 1}. {question.questionText}</Heading>
              <RadioGroup onChange={(value) => handleAnswerChange(qIndex, value)} value={selectedAnswers[qIndex] || ''}>
                <VStack align="stretch">
                  {question.options.map((option, oIndex) => (
                    <Radio key={oIndex} value={option}>
                      {option}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
          ))}
          <Button colorScheme="blue" onClick={handleSubmit} isDisabled={timerActive && timeLeft <= 0}>
            Submit Quiz
          </Button>
        </VStack>
      ) : (
        <Box>
          <Heading as="h2" size="lg" mb={4}>Your Score: {score}/{quiz.questions.length}</Heading>
          <Heading as="h3" size="md" mb={4}>Correct Answers:</Heading>
          <VStack spacing={3} align="stretch">
            {quiz.questions.map((question, qIndex) => (
              <Box key={qIndex} p={3} shadow="sm" borderWidth="1px" borderRadius="md" bg={selectedAnswers[qIndex] === question.correctAnswer ? 'green.50' : 'red.50'}>
                <Text fontWeight="bold">{qIndex + 1}. {question.questionText}</Text>
                <Text>Your Answer: <Text as="span" color={selectedAnswers[qIndex] === question.correctAnswer ? 'green.600' : 'red.600'}>{selectedAnswers[qIndex] || 'Not answered'}</Text></Text>
                <Text>Correct Answer: <Text as="span" color="green.600" fontWeight="bold">{question.correctAnswer}</Text></Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default QuizDetail;
