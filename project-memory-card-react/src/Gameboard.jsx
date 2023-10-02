import './Gameboard.css'

function Gameboard({ images, shuffledWords, onImageClick }) {
    return (
      <div className="gameboard">
        {shuffledWords.map(word => (
          <div key={word} className="gameboard-cell">
            <img 
              src={images[word]} 
              alt={word} 
              className="gameboard-image" 
              onClick={() => onImageClick(word)}
            />
            <div className="gameboard-word">{word}</div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Gameboard;