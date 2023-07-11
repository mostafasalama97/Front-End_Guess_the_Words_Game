import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./practice.css";

const PracticeScreen = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [noOfAnswer, setNoOfAnswer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null); // State for timer
  const [timerCount, setTimerCount] = useState(10); // Remaining time in seconds
  const navigate = useNavigate();

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    startTimer(); // Start the timer when the current word changes
  }, [currentWord]);

  useEffect(() => {
    if (timerCount === 0) {
      handleOptionSelect(null); // No option selected (timeout)
    }
  }, [timerCount]);

  const fetchWords = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(
        `http://localhost:8000/word/getwords?timestamp=${timestamp}`
      );
      const data = await response.json();
      if (data && Array.isArray(data) && data.length > 0) {
        setWords(data);
        setCurrentWord(data[0]);
      } else {
        console.log("No words found");
      }
    } catch (error) {
      console.log("Error fetching words:", error);
    }
  };

  const startTimer = () => {
    clearTimeout(timer); // Clear the previous timer

    // Start a new timer
    const newTimer = setInterval(() => {
      setTimerCount((prevCount) => prevCount - 1);
    }, 1000); // Update the timer every second

    setTimer(newTimer); // Store the timer in state
  };

  const handleOptionSelect = (selectedPos) => {
    clearInterval(timer); // Clear the timer when an option is selected

    setSelectedOption(selectedPos);

    if (
      currentWord &&
      currentWord.pos &&
      selectedPos !== null &&
      selectedPos.toLowerCase() === currentWord.pos.toLowerCase()
    ) {
      setAnswerFeedback("Correct!");
      setCorrectAnswer(true);
      setNoOfAnswer((prevAnswer) => prevAnswer + 1);
    } else {
      setAnswerFeedback("Incorrect!");
      setCorrectAnswer(false);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setAnswerFeedback(null);
      setProgress((prevProgress) => prevProgress + 10);
      showNextWord();
    }, 1500);
  };

  const showNextWord = () => {
    const currentIndex = words.indexOf(currentWord);
    const nextIndex = currentIndex + 1;

    // if (nextIndex < words.length) {
    //   setCurrentWord(words[nextIndex]);
    //   setTimerCount(10); // Reset the timer count for the next word
    // } else {
    //   navigate(`/rank?correctAnswer=${noOfAnswer}`);
    // }

    if (nextIndex < words.length) {
      setCurrentWord(words[nextIndex]);
      setTimerCount(10); // Reset the timer count for the next word
    } else {
      const params = new URLSearchParams();
      params.append("correctAnswer", noOfAnswer);
      params.append("word1", words[0].word);
      params.append("correct1", correctAnswer ? "true" : "false");
      params.append("word2", words[1].word);
      params.append("correct2", correctAnswer ? "true" : "false");
      params.append("word3", words[2].word);
      params.append("correct3", correctAnswer ? "true" : "false");
      params.append("word4", words[3].word);
      params.append("correct4", correctAnswer ? "true" : "false");
      params.append("word5", words[4].word);
      params.append("correct5", correctAnswer ? "true" : "false");
      params.append("word6", words[5].word);
      params.append("correct6", correctAnswer ? "true" : "false");
      params.append("word7", words[6].word);
      params.append("correct7", correctAnswer ? "true" : "false");
      params.append("word8", words[7].word);
      params.append("correct8", correctAnswer ? "true" : "false");
      params.append("word9", words[8].word);
      params.append("correct9", correctAnswer ? "true" : "false");
      params.append("word10", words[9].word);
      params.append("correct10", correctAnswer ? "true" : "false");

      navigate(`/rank?${params.toString()}`);
    }
  };

  return (
    <div className="practice-screen">
      <h1>Practice Screen</h1>
      {currentWord && (
        <div className="word-container">
          <h2>Word: {currentWord.word}</h2>
          <h3>Select the correct part of speech:</h3>
          <div className="button-container">
            <button
              className={`pos-button ${
                selectedOption === "adjective" ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect("adjective")}
              disabled={selectedOption !== null || progress === 100}
            >
              Adjective
            </button>
            <button
              className={`pos-button ${
                selectedOption === "adverb" ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect("adverb")}
              disabled={selectedOption !== null || progress === 100}
            >
              Adverb
            </button>
            <button
              className={`pos-button ${
                selectedOption === "noun" ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect("noun")}
              disabled={selectedOption !== null || progress === 100}
            >
              Noun
            </button>
            <button
              className={`pos-button ${
                selectedOption === "verb" ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect("verb")}
              disabled={selectedOption !== null || progress === 100}
            >
              Verb
            </button>
          </div>
        </div>
      )}
      {answerFeedback && <p>{answerFeedback}</p>}
      <div>Progress: {progress}%</div>
      <div>Number Of Correct Answer: {noOfAnswer}/10</div>
      {timerCount > 0 && <div>Time Remaining: {timerCount}s</div>}
      {progress === 100 && (
        <Link to={`/rank?correctAnswer=${noOfAnswer}`}>
          <button>Show Score</button>
        </Link>
      )}
    </div>
  );
};

export default PracticeScreen;
