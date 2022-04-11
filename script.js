
let tiles = document.querySelectorAll('.tile');
let resetBtn = document.querySelector('.reset');
let notification = document.querySelector('.notif');

const winConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [2, 5, 8], 
    [1, 4, 7], 
    [0, 3, 6], 
    [0, 4, 8], 
    [2, 4, 6]
];

let player;
let gameBoard;

resetBtn.addEventListener('click', reset);

init();

function init(){
    tiles.forEach(function(tile, i){
        tile.addEventListener('click', () => populate(tile, i))
    });
    player = 'X'
    gameBoard = [
        '', '', '', 
        '', '', '', 
        '', '', ''
    ];
}

function populate(tile, i){
    if (tile.innerText == ""){
        gameBoard[i] = player;
        tile.innerText = player;
        checkBoard();
    }
};

function checkBoard(){
    let winner = false;
    for (let i = 0; i < winConditions.length; i++){
        let winCondition = winConditions[i];
        if (gameBoard[winCondition[0]] == '' || gameBoard[winCondition[1]] == '' || gameBoard[winCondition[2]] == ''){
            continue;
        }
        if (gameBoard[winCondition[0]] === gameBoard[winCondition[1]] && gameBoard[winCondition[1]] === gameBoard[winCondition[2]]){
            winner = true;
            break;
        }
    }
    if (!winner && !gameBoard.includes(''))
        notification.innerText = "Draw";
    else if (!winner)
        changePlayer();
    else
        announceWinner();
}

function changePlayer(){
    if (player == 'X')
        player = 'O';
    else
        player = 'X';
    notification.innerText = player + "'s Turn";
}

function announceWinner(){
    notification.innerText = player + " wins!";
    lockBoard();
}

function lockBoard(){
    tiles.forEach(function(tile, i){
        if (tile.innerText == '')
            tile.innerText = '-';
    })
}

function reset(){
    tiles.forEach(function(tile){
        tile.innerText = "";
    })
    notification.innerText = "X's Turn";
    init();
}