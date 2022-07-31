const crossSign = 1;
const zeroSign = -1;
const empty = 0;

const boardState0 = 
  [
    [crossSign,empty,crossSign],
    [empty,crossSign,empty],
    [zeroSign,zeroSign,zeroSign],
  ];

const boardState1 = 
  [
    [crossSign,empty,zeroSign],
    [empty,zeroSign,empty],
    [zeroSign,empty,crossSign],
  ];

const boardState2 = 
  [
    [zeroSign,empty,crossSign],
    [empty,zeroSign,crossSign],
    [zeroSign,empty,crossSign],
  ];

const boardState3 = 
  [
    [crossSign,empty,zeroSign],
    [empty,crossSign,zeroSign],
    [zeroSign,empty,crossSign],
  ];

const boardState4 = 
  [
    [zeroSign,empty,crossSign],
    [empty,zeroSign,empty],
    [zeroSign,empty,crossSign],
  ];

/**
User {
  id?: string,
  sign: crossSign | zeroSign,
}
*/

const move = (x,y, user) => {
  const {sign} = user;
  // validation
  boardState[x,y] = sign;
}


const check = (set) => {
  set.every( v => v === set[0])
}

const win = (arr) => {
  // if empty cells - continue playing
  let freeCell = false;
  //
  const min = 0;
  const max = arr.length;
  // diagonals
  const match = max - 1; 
  const diagonal = new Set();
  const antiDiagonal = new Set();
  // loops
  for (let y = min; y < max; y++) {
    let row = new Set();
    let column = new Set();
    for (let x = min; x < max; x++) {
      // check is empty cell to store to continue a game further
      if (!freeCell && arr[x][y] == empty) {
        freeCell = true;
      }
      // column X and row Y
      column.add(arr[x][y]);
      row.add(arr[y][x]);
      // diagonal
      if (x == y) {
        diagonal.add(arr[x][y])
      }
      // antiDiagonal
      if ((x + y) == match) {
        antiDiagonal.add(arr[y][x])
      }
    }
    // Check column X
    if (column.size === 1) {
      const [ winner ] = column;
      return { winner, type: 'column', index: y };
    }
    // check row Y
    if (row.size === 1) {
      const [ winner ] = row;
      return { winner, type: 'row', index: y };
    }
  }
  // check diagonal
  if (diagonal.size === 1) {
    const [ winner ] = diagonal;
    return {winner, type: 'diagonal'};
  }
  // check anti-diagonal
  if (antiDiagonal.size === 1) {
    const [ winner ] = antiDiagonal;
    return { winner, type: 'antiDiagonal' };
  }
  // check is empty cell or it's a draw
  if (!freeCell) {
    return { winner: empty }
  }
  // if no empty cell - continue a game
  return null;
}

// 
console.log(win(boardState0));

console.log(win(boardState1));

console.log(win(boardState2));

console.log(win(boardState3));

console.log(win(boardState4));
