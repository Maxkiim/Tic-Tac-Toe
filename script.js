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
    // return the updated board
    return {getBoard, markCell}
}

function Player(name, marker) {
    return {name, marker }
}

function GameControler(player1, player2) {
    const {markCell, getBoard} = Gameboard();

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
                return;
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
            return;
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

    return {switchTurn, playGame, checkIfGameOver, getBoard};
}