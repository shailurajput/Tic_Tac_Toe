export type Player = 'X' | 'O' | null;
export type Board = Player[];

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(board: Board): Player {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function getAvailableMoves(board: Board): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
}

export function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const winner = calculateWinner(board);

  if (winner === 'O') {
    return 10 - depth;
  }

  if (winner === 'X') {
    return depth - 10;
  }

  if (isBoardFull(board)) {
    return 0;
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const score = minimax(newBoard, depth + 1, false);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = 'X';
      const score = minimax(newBoard, depth + 1, true);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

export function getWinningMove(board: Board, player: Player): number | null {
  const availableMoves = getAvailableMoves(board);

  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = player;
    if (calculateWinner(testBoard) === player) {
      return move;
    }
  }

  return null;
}

export function getBlockingMove(board: Board): number | null {
  return getWinningMove(board, 'X');
}

export function getSmartAIMove(board: Board): number | null {
  const winMove = getWinningMove(board, 'O');
  if (winMove !== null) {
    return winMove;
  }

  const blockMove = getBlockingMove(board);
  if (blockMove !== null) {
    return blockMove;
  }

  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return null;
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = 'O';
    const score = minimax(newBoard, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

export function getRandomAIMove(board: Board): number | null {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    return null;
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
