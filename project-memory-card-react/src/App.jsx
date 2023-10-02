import React, { useState, useEffect, useContext } from 'react';
import Gameboard from './Gameboard';
import Scoreboard from './Scoreboard';
import DataContext from './DataContext';

function App() {
  const { words: initialWords, images } = useContext(DataContext);
  const [shuffledWords, setShuffledWords] = useState(initialWords);
  const [clickedImages, setClickedImages] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0)

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    setShuffledWords(shuffleArray(initialWords));
  }, [initialWords]);

  const handleImageClick = (word) => {
    if (clickedImages.includes(word)) {
      setScore(0);
      setClickedImages([]);
    } else {
      setScore(prevScore => {
        if (prevScore + 1 > highScore) {
          setHighScore(prevScore + 1);
        }
        return prevScore + 1;
      });
      setClickedImages(prevImages => [...prevImages, word]);
    }
    setShuffledWords(prevWords => shuffleArray(prevWords));
  };


  return (
    <div className="app">
      <Scoreboard score={score} highScore={highScore} />
      <Gameboard 
        images={images}
        shuffledWords={shuffledWords}
        onImageClick={handleImageClick}
      />
    </div>
  );
}

export default App;