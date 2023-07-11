import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PracticeScreen from './componenets/PracticeScreen';
import RankScreen from './componenets/RankScreen';

function App() {
  const [correctAnswer, setCorrectAnswer] = useState(null);

  return (
    <Router>
      <div>
        <h1>mostafa salama</h1>
        <Routes>
          <Route
            path="/"
            element={<PracticeScreen setCorrectAnswer={setCorrectAnswer} />}
          />
          <Route
            path="/word/getwords"
            element={<PracticeScreen setCorrectAnswer={setCorrectAnswer} />}
          />
          <Route
            path="/rank"
            element={<RankScreen correctAnswer={correctAnswer} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
