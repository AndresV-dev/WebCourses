import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay: number;
}

export default function Typewriter(props: TypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing logic goes here

  useEffect(() => {
    if (currentIndex < props.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + props.text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, props.delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, props.delay, props.text]);

  return <span>{currentText}</span>;
}
