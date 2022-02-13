import { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
      <img style={{height: "300px", width: "400px"}} src={require(`./images/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg`)} alt="Van Gogh's Starry Night" />
      <i>
        <h4>Thanks To:</h4>
        <h5>Van Gogh's Starry Night from Google Arth Project</h5>
        <h5>Cut photo to equal parts &copy; <a href='https://www.imgonline.com.ua/eng/cut-photo-into-pieces.php'>IMGonline.com.ua</a></h5>
      </i>
    </div>
  );
}

const Game = () => {
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const incrimentNoOfMoves = () => {
    setNumberOfMoves(numberOfMoves + 1);
  }

  return (
    <div>
      <h1>Picture Puzzle</h1>
      <Board incrimentNoOfMoves={incrimentNoOfMoves}/>
      <h3>No of Moves: {numberOfMoves}</h3>
    </div>
  );
}

const Board = (props) => {
  const [blankSquareLocationX, setBlankSquareLocationX] = useState(undefined);
  const [blankSquareLocationY, setBlankSquareLocationY] = useState(undefined);
  const [_2D] = useState(initialize2DArray());
  useEffect(() => {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (_2D[x][y] === 15) {
          setBlankSquareLocationX(x);
          setBlankSquareLocationY(y);
        }
      }
    }
  }, [_2D]);

  const canBeSwapped = (x, y) => {
    var can = parseInt(blankSquareLocationX) - 1 === parseInt(x) && parseInt(blankSquareLocationY) === parseInt(y);
    if (!can) can = parseInt(blankSquareLocationX) + 1 === parseInt(x) && parseInt(blankSquareLocationY) === parseInt(y);
    if (!can) can = parseInt(blankSquareLocationX) === parseInt(x) && parseInt(blankSquareLocationY) - 1 === parseInt(y);
    if (!can) can = parseInt(blankSquareLocationX) === parseInt(x) && parseInt(blankSquareLocationY) + 1  === parseInt(y);
    return can;
  }

  const swap = (x, y) => { 
    props.incrimentNoOfMoves();
    if (canBeSwapped(x, y)) {
      let tempNumber = _2D[x][y];
      _2D[blankSquareLocationX][blankSquareLocationY] = tempNumber;
      _2D[x][y] = 15;
      setBlankSquareLocationX(x);
      setBlankSquareLocationY(y);
      if (isPuzzleSolved()) {
        alert("CONGRATS YOU SOLVED THE PUZZLE!");
      }
    } else {
      alert("INVALID MOVE!");
    }
  }

  const isPuzzleSolved = () => {
    for (let i = 0; i < _2D.length; i++) {
      console.log("checking row", i, _2D[i]);
      if (!sorted(_2D[i])) return false;
    }

    return true;
  }

  const rows = [];
  if (rows.length === 0) {
    for (let index = 0; index < _2D.length; index++) {
      rows.push(
        <div key={index}>
          <Square number={_2D[index][0]} x={index} y={0} swap={swap}/>
          <Square number={_2D[index][1]} x={index} y={1} swap={swap}/>
          <Square number={_2D[index][2]} x={index} y={2} swap={swap}/>
          <Square number={_2D[index][3]} x={index} y={3} swap={swap}/>
        </div>
      );
    }
  }

  return (
    <span>{rows}</span>
  );
}

const Square = (props) => {
  const [x] = useState(props.x);
  const [y] = useState(props.y);
  return (
    <img src={require(`./images/${props.number}.jpg`)} alt={props.number}
      onClick={() => props.swap(x, y)}
    />
  )
}

const initialize2DArray = () => {
  const squares = shuffleSquares(Array(16).fill().map((_, idx) => idx));
  let twoDimentionalArray = new Array(4);
  for (let i = 0; i < 4; i++) {
    twoDimentionalArray[i] = new Array(4); 
  }

  let index = 0;
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++, index++) {
      twoDimentionalArray[x][y] = squares[index];
    }
  }

  return twoDimentionalArray;
}

const shuffleSquares = (squares) => {
  let currentIndex = squares.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [squares[currentIndex], squares[randomIndex]] = [
      squares[randomIndex], squares[currentIndex]];
  }

  return squares;
}

const sorted = (arr) => {
  let second_index;
  for (let first_index = 0; first_index < arr.length; first_index++){
    second_index = first_index + 1;
    if(arr[second_index] - arr[first_index] < 0) return false;
  }
  return true;
}

export default App;
