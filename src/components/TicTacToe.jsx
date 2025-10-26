import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setScores(prev => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
    } else if (newBoard.every(cell => cell !== null)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  const getStatus = () => {
    if (winner) return `Winner: Player ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Current Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Tic-Tac-Toe
        </h1>
        
        <div className="flex justify-around mb-6 bg-gray-100 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{scores.X}</div>
            <div className="text-sm text-gray-600">Player X</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{scores.draws}</div>
            <div className="text-sm text-gray-600">Draws</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{scores.O}</div>
            <div className="text-sm text-gray-600">Player O</div>
          </div>
        </div>

        <div className={`text-center text-xl font-semibold mb-4 h-8 ${
          winner ? 'text-green-600' : isDraw ? 'text-orange-600' : 'text-gray-700'
        }`}>
          {getStatus()}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square rounded-xl text-5xl font-bold transition-all duration-200 ${
                cell === 'X' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : cell === 'O'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
              } ${!cell && !winner ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
          >
            New Game
          </button>
          <button
            onClick={resetScores}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}