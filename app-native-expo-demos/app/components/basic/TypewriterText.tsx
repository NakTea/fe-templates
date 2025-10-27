import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

type ITextProps = {
  text: string;
  speed?: number;
};

const TypewriterText = ({ text = '', speed = 50 }: ITextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
    currentIndexRef.current = currentIndex;
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (currentIndexRef.current >= text.length - 1) {
        setShowCursor(false);
        clearInterval(cursorInterval);
      } else {
        setShowCursor(prev => !prev);
      }
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Text>
      {displayedText}
      {showCursor ? '|' : ' '}
    </Text>
  );
};

export default TypewriterText;
