import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link as ChakraLink,
  useToast,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('LoginScreen rendered.');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    console.log('LoginScreen useEffect triggered.');
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  // -------------------------------
  //     LOGIN HANDLER (FIXED)
  // -------------------------------

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Login form submitted. Attempting POST to /api/users/login.');
    console.log('Email:', email, 'Password:', password);

    try {
      console.log('Environment:', {
        NODE_ENV: process.env.NODE_ENV,
        REACT_APP_API_URL: process.env.REACT_APP_API_URL
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // ------ FINAL FIXED URL ------
      const loginUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/users/login`;

      console.log('Login URL:', loginUrl);

      const { data } = await axios.post(
        loginUrl,
        { email, password },
        config
      );

      console.log('Login successful. Response:', data);

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // -------------------------------
  //         RETURN UI
  // -------------------------------

  return (
    <Box p={4} maxW="md" mx="auto" mt={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Login
      </Heading>

      <form onSubmit={submitHandler}>
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </form>

      <Flex justify="center" mt={4}>
        <Text>New Customer? </Text>
        <ChakraLink
          href={redirect ? `/register?redirect=${redirect}` : '/register'}
          color="blue.500"
          ml={1}
        >
          Register
        </ChakraLink>
      </Flex>
    </Box>
  );
}

export default LoginScreen;
