import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Text, Link as ChakraLink, useToast, Flex } from '@chakra-ui/react';
import axios from 'axios';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,{ name, username, email, password },config);

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/'); // Redirect to home or wherever you want after registration
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto" mt={8}>
      <Heading as="h1" mb={6} textAlign="center">Register</Heading>
      <form onSubmit={submitHandler}>
        <VStack spacing={4}>
          <FormControl id="name">
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
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
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Register</Button>
        </VStack>
      </form>
      <Flex justify="center" mt={4}>
        <Text>Have an Account? </Text>
        <ChakraLink as={ChakraLink} href="/login" color="blue.500" ml={1}>Login</ChakraLink>
      </Flex>
    </Box>
  );
}

export default RegisterScreen;

