import React from 'react';
import { Box, Text, Flex, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box bg={bgColor} p={6} mt="auto">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        borderTop="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        pt={4}
      >
        <Text fontSize="sm" color={textColor} mb={{ base: 4, md: 0 }}>
          &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
        </Text>
        <Flex>
          <ChakraLink 
            href="https://github.com/Sapna615" 
            isExternal 
            mx={2} 
            color={textColor} 
            display="inline-flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            _hover={{ 
              color: 'blue.500',
              bg: useColorModeValue('gray.100', 'gray.700') 
            }}
            aria-label="GitHub profile"
          >
            <FaGithub size="20px" />
          </ChakraLink>
          <ChakraLink 
            href="https://www.linkedin.com/in/sapna-rai/" 
            isExternal 
            mx={2} 
            color={textColor} 
            display="inline-flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            _hover={{ 
              color: '#0077B5',
              bg: useColorModeValue('gray.100', 'gray.700') 
            }}
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size="20px" />
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;

