import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./rank.css";

const RankScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const correctAnswer = queryParams.get("correctAnswer");
  const [rank, setRank] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    calculateRank();
  }, [correctAnswer]);

  const calculateRank = async () => {
    try {
      const response = await axios.post("http://localhost:8000/rank/postrank", {
        finalScore: correctAnswer,
      });
      setRank(response.data);
      console.log(response)
      console.log(response.data)
      animateProgressBar();
    } catch (error) {
      console.log(error);
    }
  };

  const animateProgressBar = () => {
    const correctAnswers = parseInt(correctAnswer);
    const totalQuestions = 10;
    const progressPercentage = (correctAnswers / totalQuestions) * 100;
    setProgress(progressPercentage);
  };

  const handleTryAgain = () => {
    setRank(null);
    setProgress(0);
  };

  return (
    <div className="rank-screen">
      <h1>Rank Screen</h1>
      <p>Your score: {correctAnswer}</p>
      {rank && (
        <div>
          <p>Your rank: {rank}</p>
          <p>Word Selections:</p>
          <ul>
            <li>
              Word 1: {queryParams.get("word1")} -{" "}
              {queryParams.get("correct1") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 2: {queryParams.get("word2")} -{" "}
              {queryParams.get("correct2") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 3: {queryParams.get("word3")} -{" "}
              {queryParams.get("correct3") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 4: {queryParams.get("word4")} -{" "}
              {queryParams.get("correct4") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 5: {queryParams.get("word5")} -{" "}
              {queryParams.get("correct5") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 6: {queryParams.get("word6")} -{" "}
              {queryParams.get("correct6") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 7: {queryParams.get("word7")} -{" "}
              {queryParams.get("correct7") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 8: {queryParams.get("word8")} -{" "}
              {queryParams.get("correct8") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 9: {queryParams.get("word9")} -{" "}
              {queryParams.get("correct9") === "true" ? "Correct" : "Incorrect"}
            </li>
            <li>
              Word 10: {queryParams.get("word10")} -{" "}
              {queryParams.get("correct10") === "true"
                ? "Correct"
                : "Incorrect"}
            </li>
          </ul>
        </div>
      )}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>

      </div>
      {correctAnswer === "10" && (
        <p className="completion-message">
          Congratulations! You have completed the activity.
        </p>
      )}
      {correctAnswer !== "10" && (
        <p className="completion-message">
          You did not answer all questions correctly. Keep practicing!
        </p>
      )}
      <Link to="/word/getwords">
        <button className="try-again-button" onClick={handleTryAgain}>
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default RankScreen;
