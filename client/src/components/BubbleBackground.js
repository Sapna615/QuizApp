import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState([]);
  const animationRef = useRef(null);
  
  // Show bubbles only in light mode
  const bgColor = useColorModeValue('transparent', 'transparent');
  const isDarkMode = useColorModeValue(false, true);

  // Generate random bubbles based on screen size
  const generateBubbles = useCallback(() => {
    const newBubbles = [];
    const screenWidth = window.innerWidth;
    
    // Adjust bubble count based on screen size
    let bubbleCount;
    if (screenWidth < 768) {
      bubbleCount = Math.floor(Math.random() * 4) + 6; // 6-10 bubbles for mobile
    } else if (screenWidth < 1024) {
      bubbleCount = Math.floor(Math.random() * 6) + 8; // 8-14 bubbles for tablet
    } else {
      bubbleCount = Math.floor(Math.random() * 8) + 12; // 12-20 bubbles for desktop
    }
    
    for (let i = 0; i < bubbleCount; i++) {
      // Adjust bubble size based on screen size
      let minSize, maxSize;
      if (screenWidth < 768) {
        minSize = 20; maxSize = 60; // Smaller bubbles for mobile
      } else if (screenWidth < 1024) {
        minSize = 25; maxSize = 85; // Medium bubbles for tablet
      } else {
        minSize = 30; maxSize = 110; // Larger bubbles for desktop
      }
      
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100, // Start below viewport
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.5, // -0.5 to 0.5
        speedY: -(Math.random() * 0.3 + 0.1), // -0.1 to -0.4 (upward)
        opacity: Math.random() * 0.3 + 0.4, // 0.4 to 0.7 (very visible)
        wobble: Math.random() * Math.PI * 2, // Random starting wobble phase
        wobbleSpeed: Math.random() * 0.02 + 0.01 // Wobble animation speed
      });
    }
    return newBubbles;
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      setBubbles([]);
      return;
    }

    const initialBubbles = generateBubbles();
    setBubbles(initialBubbles);

    const bubblesRef = [...initialBubbles];

    const animate = () => {
      bubblesRef.forEach((bubble, index) => {
        let newY = bubble.y + bubble.speedY;
        let newX = bubble.x + bubble.speedX + Math.sin(bubble.wobble) * 0.2;
        let newWobble = bubble.wobble + bubble.wobbleSpeed;

        // Reset bubble when it goes off screen
        if (newY < -10) {
          newY = 110; // Start from bottom
          newX = Math.random() * 100;
        }

        // Keep bubbles within horizontal bounds
        if (newX < -5) newX = 105;
        if (newX > 105) newX = -5;

        bubblesRef[index] = {
          ...bubble,
          x: newX,
          y: newY,
          wobble: newWobble
        };
      });

      setBubbles([...bubblesRef]);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      const newBubbles = generateBubbles();
      setBubbles(newBubbles);
      bubblesRef.length = 0;
      bubblesRef.push(...newBubbles);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode, generateBubbles]);

  // Don't render in dark mode
  if (isDarkMode) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      pointerEvents="none"
      zIndex={-1}
      overflow="hidden"
      bg={bgColor}
    >
      {bubbles.map(bubble => (
        <Box
          key={bubble.id}
          position="absolute"
          left={`${bubble.x}%`}
          top={`${bubble.y}%`}
          width={`${bubble.size}px`}
          height={`${bubble.size}px`}
          borderRadius="50%"
          bg="linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))"
          border="1px solid rgba(59, 130, 246, 0.5)"
          opacity={bubble.opacity}
          style={{
            transform: 'translate(-50%, -50%)',
            filter: 'none',
            transition: 'none'
          }}
        />
      ))}
    </Box>
  );
};

export default BubbleBackground;
