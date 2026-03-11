function Gameboard() {
    // create the board
    const board = ['', '', '', '', '', '', '', '', ''];
    // mark the cell the player choose with player marker
    function markCell(marker, cell) {
        if (board[cell] !== ''){return;}
        board[cell] = marker;
    }
    function getBoard() {
        return board;
    }
    function resetBoard(){
        for(i = 0; i < board.length; i++){
            board[i] = '';
        }
    }
    // return the updated board
    return {getBoard, markCell, resetBoard}
}

function Player(name, marker) {
    return {name, marker }
}

function GameControler(player1, player2) {
    const {markCell, getBoard, resetBoard} = Gameboard();

    let turn = player1;
    let result = '';
    let gameOver = false;

    // Switch turns betweem players
    function switchTurn() {
        if (turn == player1){
            turn = player2;
        } else { 
            turn = player1;
        }
    }
    function checkIfGameOver(){
        const board = getBoard()
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]              // diagonals
        ]; 
        // loop through winningCombinations and see if the board has any of the combinations
        for (let i = 0; i < winningCombinations.length; i++) {
            if (board[winningCombinations[i][0]] == ''){continue} //check if the cell is empty, if its empty then no point in check the other cells
            if (board[winningCombinations[i][0]] == board[winningCombinations[i][1]] && board[winningCombinations[i][1]] == board[winningCombinations[i][2]]){
                result = `${turn.name} has won the game!`;
                gameOver = true;
                return gameOver;
            }
        }
        // if there is no winner, check if its a tie. First check if the board is filled
        let boardFilled = true;
        for (let i = 0; i < board.length; i++){
            if (board[i] == ''){
                boardFilled = false;
            }
        }
        if (boardFilled) {
            result = 'Its a tie!'; 
            gameOver = true; 
            return gameOver;
        };
    }
    function playGame(cell) {
        markCell(turn.marker, cell);
        checkIfGameOver()
        if (!gameOver){
            switchTurn()
        } else {
            return result;
        }
    }
    function disableClick() {
        turn = null;
    }
    function getResult() {
        return result;
    }
    function resetGame() {
        turn = player1;
        result = '';
        gameOver = false;
        resetBoard();
    }
    return {switchTurn, playGame, checkIfGameOver, getBoard, disableClick, getResult, resetGame};
}

function DisplayController(game){
    const board = game.getBoard();
    const playingBoard = document.querySelector('.playingBoard');
    const resetBtn = document.querySelector('#reset-btn');
    const resultBox = document.querySelector('#result')
    playingBoard.classList.add('board');

    resetBtn.addEventListener('click', () => resetGame());

    // display the board and update the content of the cells when players click on them.
    board.forEach((cell, index) => {
        let cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.textContent =   cell;
        playingBoard.appendChild(cellDiv);
        cellDiv.addEventListener('click', () =>  updateBoard(index));
    })
    // Clear and re-render the updated board
    function updateBoard(index) {
        game.playGame(index);
        playingBoard.innerHTML = '';
        DisplayController(game);
        displayResult();
        if (game.checkIfGameOver()){game.disableClick()};
    }

    function displayResult() {
        resultBox.textContent = game.getResult();
    }
    function resetGame() {
        game.resetGame();
        playingBoard.innerHTML = '';
        DisplayController(game);
    }
}

(() => {
    const player1 = Player('Max', 'X');
    const player2 = Player('Jonny', 'O');
    const game = GameControler(player1, player2);
    DisplayController(game)
})();