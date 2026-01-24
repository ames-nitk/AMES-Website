import { useState, useEffect } from 'react';

const WORDS = ["Connecting gears of innovation across generations"];
const TYPING_SPEED = 90;
const ERASING_SPEED = 50;
const DELAY_BETWEEN_WORDS = 1200;

export default function useTypewriter(words = WORDS) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    let timeout;
    const currentWord = words[wordIdx];
    if (!isErasing && displayed.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
    } else if (!isErasing && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsErasing(true), DELAY_BETWEEN_WORDS);
    } else if (isErasing && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1));
      }, ERASING_SPEED);
    } else if (isErasing && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsErasing(false);
        setWordIdx((wordIdx + 1) % words.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isErasing, wordIdx, words]);

  return displayed;
}
