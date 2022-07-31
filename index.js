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
      if (!freeCell && arr[x][y] == empty) {
        freeCell = true;
      }
      column.add(arr[x][y]);
      row.add(arr[y][x]);
      if (x == y) {
        diagonal.add(arr[x][y])
      }
      // console.log(x,y,match)
      if ((x + y) == match) {
        antiDiagonal.add(arr[y][x])
      }
    }
    if (row.size === 1) {
      const [winner] = row;
      return {winner, type: 'row', index: y};
    }
    if (column.size === 1) {
      const [winner] = column;
      return {winner, type: 'column', index: y};
    }
    // console.log('row', y, row);
    // console.log('column', y, column);
  }
  console.log('diagonal', diagonal);
  console.log('antiDiagonal', antiDiagonal);
  if (diagonal.size === 1) {
    const [winner] = diagonal;
    return {winner, type: 'diagonal'};
  }
  if (antiDiagonal.size === 1) {
    const [winner] = antiDiagonal;
    return {winner, type: 'antiDiagonal'};
  }
  if (freeCell) {
    return false;
  }
  return {winner: empty}
}

// 
console.log(win(boardState0));

console.log(win(boardState1));

console.log(win(boardState2));

console.log(win(boardState3));

console.log(win(boardState4));
