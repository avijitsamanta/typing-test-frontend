import { useState, useEffect, useRef,useContext } from "react";
import { Button } from "react-bootstrap";
import SentenceDisplay from "./SentenceDisplay";
import TypingArea from "./TypingArea";
import Timer from "./Timer";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import API_BASE_URL from "../config";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is an essential skill for programmers.",
  "Practice makes perfect in the world of coding.",
  "React is a powerful JavaScript library for UI development."
];

const TypingTest = () => {
  const { user } = useContext(AuthContext);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [timer, setTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [typedWords, setTypedWords] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [typingDurations, setTypingDurations] = useState([]);  
  const [lastWordTime, setLastWordTime] = useState(Date.now());
  const textareaRef = useRef(null);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && !sessionSaved) {  
      setIsRunning(false);
      saveSessionData();
      setSessionSaved(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startTest = () => {
    setSentenceIndex(0);
    setCurrentInput("");
    setTypedWords(0);
    setCorrectWords(0);
    setIncorrectWords([]);
    setTimer(15);
    setIsRunning(true);
    textareaRef.current.focus();
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!isRunning) return;
  
    if (e.key === " ") {  
        e.preventDefault();  

        const currentTime = Date.now();
        const timeTaken = (currentTime - lastWordTime) / 1000; // Time in seconds
        setLastWordTime(currentTime);

        setTypingDurations((prev) => [...prev, timeTaken]);

        const wordsTyped = currentInput.trim().split(" ");
        const correctWordsArray = sentences[sentenceIndex].split(" ");
        
        const lastIndex = wordsTyped.length - 1;
        const lastWord = wordsTyped[lastIndex];
        const correctWord = correctWordsArray[lastIndex];

        setTypedWords((prev) => prev + 1);

        if (lastWord === correctWord) {
            setCorrectWords((prev) => prev + 1);
        } else {
            setIncorrectWords((prev) => [...prev, lastWord]);
        }

        setCurrentInput((prev) => prev + " "); // Keep typed text
    }
  };

  const saveSessionData = async () => {
    if (!user || sessionSaved) return;
    const wpm = typedWords > 0 ? Math.round((typedWords / (15 - timer)) * 60) : 0;
    const accuracy = typedWords > 0 ? Math.round((correctWords / typedWords) * 100) : 0;
  
    const sessionData = {
        wpm,
        accuracy,
        totalErrors: incorrectWords.length,
        errorWords: incorrectWords,
        typingDurations,
        createdAt: new Date(),
      };
    
    try {
      let token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/sessions`, sessionData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Session Saved!");
    } catch (error) {
      console.error("Error saving session:", error);
    }

  };

  return (
    <div className="text-center">
      <h5>Type the following sentence:</h5>
      <SentenceDisplay sentence={sentences[sentenceIndex]} input={currentInput} />
      <TypingArea
        ref={textareaRef}
        currentInput={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        isRunning={isRunning}
      />
      <Timer time={timer} />
      <p>WPM: {typedWords > 0 ? Math.round((typedWords / (15 - timer)) * 60) : 0}</p>
      <p>Accuracy: {typedWords > 0 ? Math.round((correctWords / typedWords) * 100) : 0}%</p>
      <p>Errors: {incorrectWords.length}</p>
      <p>Typing Durations (sec): {typingDurations.map((t, i) => `Word ${i + 1}: ${t.toFixed(2)}s `).join(", ")}</p>
      <Button onClick={startTest} disabled={isRunning}>
        Start Test
      </Button>
    </div>
  );
};

export default TypingTest;
