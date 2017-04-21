import React from "react";
import {render} from "react-dom";

import {Board} from "./components/Board";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }
  
  handleClick(i) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const result  = calculateWinner(squares);
    console.log(result);
    if (result['status'] === 'win' || result['status'] === 'draw') {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState((prevState, props) => ({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: prevState.stepNumber + 1
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // debugger;
    const result  = calculateWinner(current.squares);
    // console.log(result);
    let status;
    if (result['status'] === 'win') {
      status = 'Winner: ' + result['player'];
    } else if (result['status'] === 'draw') {
      status = 'It is a DRAW!'
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            status={status}
          />
        </div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

function isDraw(squares) {
  const draw = squares.filter(Boolean).length === 9 ? true : false;
  return draw;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {'status': 'win', 'player': squares[a]};
    }
  }
  if (isDraw(squares)) {
    console.log(isDraw(squares));
    return {'status': 'draw', 'player': squares[a]};
  }
  return {'status': 'ongoing'};
}

render(<Game/>, window.document.getElementById("game"));