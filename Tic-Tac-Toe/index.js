const cells = document.querySelectorAll('.game__cell');

const game_status = document.querySelector('.game__status');

const game_restart = document.querySelector('.game__restart');

let gameOn = true;

// console.log(cells);
// console.log(game_status);
// console.log(game_restart);

let gameStatus = [
    '', '', '',
    '', '', '',
    '', '', ''
];

const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function isGameOver() {

    for (let winningState of winningStates) {

        const x = winningState[0];
        const y = winningState[1];
        const z = winningState[2];

        if ((gameStatus[x] !== "") && (gameStatus[x] === gameStatus[y]) && (gameStatus[y] === gameStatus[z])) {
            game_status.textContent = `${currentPlayer} has won the game`;
            gameOn = false;
            return true;
        }
    }

    if (gameStatus.includes("") === false) {
        game_status.textContent = `Game ended in a draw`;
        gameOn = false;
        return true;
    }

    return false;

}

let currentPlayer = 'X';
game_status.textContent = `Current Move :  ${currentPlayer}`;

function changeCurrentPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    game_status.textContent = `Current Move :  ${currentPlayer}`;
}


function onCellClick() {
    if (gameOn) {

        // console.log(this);
        const cell = this;

        // const idx = cell.getAttribute('data-cell-index');
        // console.log(idx);

        // gameStatus[idx] = currentPlayer;
        if (cell.textContent === "") {


            cell.textContent = currentPlayer;
            const idx = cell.getAttribute('data-cell-index');
            gameStatus[idx] = currentPlayer;
            console.log(gameStatus);
            if (!isGameOver()) {
                changeCurrentPlayer();

            }
        }
    }
}





function restartGame() {
    if (isGameOver()) {
        console.log('have to restart the game!');

        gameOn = true;

        gameStatus = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

        cells.forEach(function (cell) {
            cell.textContent = "";
        })
        currentPlayer = "X";
        game_status.textContent = `Current Move : ${currentPlayer}`;



    }
}

cells.forEach(
    function (cell) {
        cell.addEventListener('click', onCellClick);
    }
);

game_restart.addEventListener('click', restartGame);

