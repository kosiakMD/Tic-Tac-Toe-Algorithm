const ticTacToe = (gameDivId) => {
  const playgroundTemplate = `
    <div>
      <span id="turn">Tic Tac Toe</span>
      <center><button id="resetBtn">Reset</button></center>
      <br/>
      <br/>

      <table id="playField">
          <tr>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
          </tr>
      </table>

      <br/>
      <span id="winner"></span>
    </div>
  `;

  const crossSign = 1;
  const zeroSign = -1;
  const empty = 0;

  let $table = null;
  let $rows = null;
  let $cells = [];
  let $winner = null;
  let $resetBtn = null;

  let currentUser = crossSign;
  let gameOver = false;

  const signEnum = {
    [empty]: '',
    [crossSign]: 'X',
    [zeroSign]: 'O',
  };

  const winTypeEnum = {
    row: 'row',
    antiDiagonal: 'antiDiagonal',
    column: 'column',
    diagonal: 'diagonal',
  };

  const boardState =
    [
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty],
    ];

  const boardState0 =
    [
      [crossSign, empty, crossSign],
      [empty, crossSign, empty],
      [zeroSign, zeroSign, zeroSign],
    ];
  const resultMock0 = { winner: zeroSign, type: winTypeEnum.row, index: 2 };

  const boardState1 =
    [
      [crossSign, empty, zeroSign],
      [empty, zeroSign, empty],
      [zeroSign, empty, crossSign],
    ];
  const resultMock1 = { winner: zeroSign, type: winTypeEnum.antiDiagonal };

  const boardState2 =
    [
      [zeroSign, empty, crossSign],
      [empty, zeroSign, crossSign],
      [zeroSign, empty, crossSign],
    ];
  const resultMock2 = { winner: crossSign, type: winTypeEnum.column, index: 2 };

  const boardState3 =
    [
      [crossSign, empty, zeroSign],
      [empty, crossSign, zeroSign],
      [zeroSign, empty, crossSign],
    ];
  const resultMock3 = { winner: crossSign, type: winTypeEnum.diagonal };

  const boardState4 =
    [
      [zeroSign, crossSign, crossSign],
      [crossSign, zeroSign, zeroSign],
      [zeroSign, crossSign, crossSign],
    ];
  const resultMock4 = { winner: empty };

  const boardState5 =
    [
      [zeroSign, empty, crossSign],
      [empty, zeroSign, empty],
      [zeroSign, empty, crossSign],
    ];
  const resultMock5 = null;


  const win = (arr) => {
    // if empty cells - continue playing
    let freeCell = false;
    //
    const min = 0;
    const max = arr.length;
    // diagonals
    const match = max - 1;
    let diagonal = 0;
    let antiDiagonal = 0;
    // helpers
    const checkLine = (v) => v === 3 || v === -3;
    const formResult = (line, type, index) => {
      const winner = Math.sign(line);
      return { winner, type, index };
    };
    // loops
    for (let y = min; y < max; y++) {
      let row = 0;
      let column = 0;
      for (let x = min; x < max; x++) {
        const forwardValue = arr[y][x];
        const backwardValue = arr[x][y];
        // check is empty cell to store to continue a game further
        if (!freeCell && forwardValue === empty) {
          freeCell = true;
        }
        // row Y and column X
        forwardValue && (row += forwardValue);
        backwardValue && (column += backwardValue);
        // diagonal
        if (forwardValue && x === y) {
          diagonal += forwardValue;
        }
        // antiDiagonal
        if (backwardValue && (x + y) === match) {
          antiDiagonal += backwardValue;
        }
      }
      // Check column X
      if (checkLine(column)) {
        return formResult(column, 'column', y);
      }
      // check row Y
      if (checkLine(row)) {
        return formResult(row, 'row', y);
      }
    }
    // check diagonal
    if (checkLine(diagonal)) {
      return formResult(diagonal, 'diagonal');
    }
    // check anti-diagonal
    if (checkLine(antiDiagonal)) {
      return formResult(antiDiagonal, 'antiDiagonal');
    }
    // check is empty cell or it's a draw
    if (!freeCell) {
      return { winner: empty };
    }
    // if no empty cell - continue a game
    return null;
  };

// run tests
  const test = () => {
    let result = true;

    const boardMocks = [boardState0, boardState1, boardState2, boardState3, boardState4, boardState5];

    const resultMocks = [resultMock0, resultMock1, resultMock2, resultMock3, resultMock4, resultMock5];

    boardMocks.every((board, i) => {
      const testString = JSON.stringify(resultMocks[i]);
      const testResult = win(board);
      const resultString = JSON.stringify(testResult);
      const testSuccess = testString === resultString;
      if (testSuccess) {
        console.log(`Test #${i} passed.`, resultString);
        return true;
      } else {
        console.log(`Test #${i} failed.`);
        console.log(`Waited for: ${testString}`);
        console.log(`Received for: ${resultString}`);
        return false;
      }
    });

    return result;
  };

  const nextUser = () => currentUser = currentUser === crossSign ? zeroSign : crossSign;

  const checkCellToFill = (x, y) => {
    return !boardState[x][y];
  };

// cells in rows = in Arrays cell in columns
  const getCellId = (x, y) => `${y}:${x}`;

  const setWinner = (result) => {
    if (result) {
      if (result.winner) {
        $winner.innerText = result ? `Winner '${signEnum[result.winner]}' user` : '';
        $table.classList.add('gameOver', `${result.type}Win${result.type === winTypeEnum.diagonal || result.type === winTypeEnum.antiDiagonal ? '' : result.index + 1}`);
      } else {
        $winner.innerText = 'Draw!';
      }
    } else {
      $winner.innerText = '';
      goOverAllCells((cell) => {
        $table.className = '';
        cell.innerText = signEnum[empty];
      });
    }
  };

  const move = (x, y, cell) => {
    // validation
    if (gameOver) return;
    if (!checkCellToFill(x, y)) return;
    // TODO: for more complex user interface
    const sign = currentUser;
    boardState[x][y] = sign;
    const currentCell = cell || document.getElementById(getCellId(x, y));
    currentCell.innerText = signEnum[currentUser];
    const result = win(boardState);
    if (result && result.winner) {
      console.log(boardState);
      console.log(result);
      setWinner(result);
      gameOver = true;
      return;
    }
    nextUser();
  };

  const goOverAllCells = (cellCallback) => {
    if (!cellCallback && typeof cellCallback !== 'function') return;
    for (let y = 0; y < $rows.length; y++) {
      let $currentCells;
      if (!$cells[y]) {
        $cells[y] = $rows[y].querySelectorAll('td');
      }
      $currentCells = $cells[y];
      for (let x = 0; x < $rows.length; x++) {
        const cell = $currentCells[x];
        cellCallback(cell, x, y);
      }
    }
  };

  const resetGame = () => {
    const max = boardState.length;
    for (let y = 0; y < max; y++) {
      for (let x = 0; x < max; x++) {
        boardState[y][x] = empty;
      }
    }
    setWinner();
    currentUser = crossSign;
    gameOver = false;
  };

  const init = () => {
    const $playground = document.getElementById(gameDivId);
    $playground.innerHTML = playgroundTemplate;
    // init elements
    $table = document.getElementById('playField');
    $rows = $table.querySelectorAll(`tr`);
    $winner = document.getElementById('winner');
    $resetBtn = document.getElementById('resetBtn');
    //
    goOverAllCells((cell, x, y) => {
      const pos = getCellId(x, y);
      cell.setAttribute('id', pos);
      cell.addEventListener('click', () => {
        const [x, y] = pos.split(':');
        move(x, y, cell);
      });
    });
    //
    $resetBtn.addEventListener('click', game.resetGame);
  };

  return {
    test,
    init,
    resetGame,
  };

};


