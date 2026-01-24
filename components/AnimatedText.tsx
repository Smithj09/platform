import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number; // milliseconds between letters
  loopDelay?: number; // milliseconds before restart
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', speed = 100, loopDelay = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentIndex < text.length) {
      // Adding letters
      timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (!isDeleting && currentIndex === text.length) {
      // Finished typing, wait before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, loopDelay);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting letters
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, speed / 2);
    } else if (isDeleting && currentIndex === 0) {
      // Finished deleting, start typing again
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, isDeleting, loopDelay]);

  return <span className={className}>{displayedText}</span>;
};

export default AnimatedText;

