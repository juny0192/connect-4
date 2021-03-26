const width = 7;
const height = 6;
const board = [];

let currPlayer = 1;

const makeBoard = () => {
  // const hozArr = [];
  // for (let x = 0; x < width; x++) {
  //   hozArr.push(null);
  // }

  // for (let y = 0; y < height; y++) {
  //   board.push(hozArr);
  // }

  //Above is what I wrote originally but I changed to down.

  for (let y = 0; y < height; y++) {
    let rowArr = Array.from({ length: width });
    board.push(rowArr);
  }
  /** Array.from({length: x }) -> copied from internet
      I didn't know that there is a way to make a new array with
      using length only. This is COOL! Then I can change the width
      later if I want and it automatically change the width of the
      game board.
  */
};

const makeHtmlBoard = () => {
  const htmlBoard = document.getElementById('board');

  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < width; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  htmlBoard.append(top);

  for (let y = 0; y < height; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < width; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    htmlBoard.append(row);
  }
};

/**so this function is finding y depends on given x.
Since we are dropping down piece, we will set first y height
from the most bottom. so y loop from the bottom and back to 0 index.
while looping over the y height, if the function find cell has undefined
then that height will be y. so if (y: 6, x: 3), next y will be (y: 5, x:3).
if the x column is full, which means function cannot find any undefined x,
it will alert click another row and return undefined.
*/

const findSpotForCol = (x) => {
  for (let y = height - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  alert('click another row!');
  return undefined;
};

/** This function create piece in html board.
 * add class piece and also currplayer color which will be changed
 * per every click.
 * And get position by id that already set up above.
 * and append the piece to the cell position.
 */

function placeInTable(y, x) {
  const createColorCell = document.createElement('div');
  createColorCell.classList.add('piece');
  createColorCell.classList.add(`p${currPlayer}`);

  let colorCell = document.getElementById(`${y}-${x}`);

  colorCell.append(createColorCell);
}

const endGame = (msg) => {
  alert(msg);
};

const handleClick = (evt) => {
  const x = +evt.target.id;

  const y = findSpotForCol(x);
  //console.log(y); - just checking y height
  if (y === null) {
    return;
  }

  /**
   * This code will just update board array element in html.
   * so wherever clicked possition's array element will update
   * its current player number.
   */
  board[y][x] = currPlayer;
  placeInTable(y, x);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  /**
   * I was having a hard time to figure out how to use every method
   * in tied. So,
   */

  // if (board.every((row) => row.every((cell) => cell))) {
  //   endGame('Game is tied!');
  // }

  currPlayer = currPlayer === 1 ? 2 : 1;
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  /** 
okay so this part loop through all cells, and these arrays are winning situation
so first is wherever the y and x positioned, if horizontally laid 0 to 3 which is
connected four, and goes to _win function that see if every x and y position is 
under same color (currPlayer). If these two returned true, 
the whole function checkForWin() return true
please let me know if my understanding is right or wrong or miss something.
*/

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

makeBoard();
makeHtmlBoard();
