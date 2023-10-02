import './Scoreboard.css'

function Scoreboard({ score, highScore }) {
    return (
      <header className="scoreboard">
        <h1>Do not pick the same image</h1>
        <h3>Score: {score}</h3>
        <h3>High Score: {highScore}</h3>
      </header>
    );
  }
  
  export default Scoreboard;