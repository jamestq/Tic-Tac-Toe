const startButton = document.getElementById('start_game');
const resetButton = document.getElementById('reset_game');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

function GameBoard(){
    let table = document.getElementsByClassName("cell");
    this.gameTable = [];
    for(let i=0; i<9; i++){
        this.gameTable.push([table[i], 0]);
    }
}

function WinningCombo(){
    this.winArray = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
}

function playGame(player, opponent){  
    let currentPlayer = player;
    let gameBoard = new GameBoard();
    let winningCombo = new WinningCombo();
    
    for(let i in gameBoard.gameTable){
        gameBoard.gameTable[i][0].addEventListener('click', placeMarker);
    };

    function placeMarker(e){
        if(currentPlayer == player){
            turn(this.id, currentPlayer.marker);
            currentPlayer = opponent;
        } else if (currentPlayer == opponent){
            turn(this.id, currentPlayer.marker);
            currentPlayer = player;
        };
    }

    function turn(id, currentMarker){
        //Cell which has been played cannot be modified.
        if(gameBoard.gameTable[id][1] == 0){
            displayMove(id, currentMarker);
            gameBoard.gameTable[id][1] = currentMarker;
        }
        checkWin(id, currentMarker);
    }

    function checkWin(id, currentMarker){
        for(let i in winningCombo.winArray){
            if(winningCombo.winArray[i].includes(parseInt(id))){
                let winCount = 0;
                for(let j in winningCombo.winArray[i]){
                    if(gameBoard.gameTable[winningCombo.winArray[i][j]][1] == currentMarker){
                        winCount += 1;
                    }
                }
                if(winCount == 3) {
                    declareWin(currentMarker);
                    lockGame();
                }
            }
        }
        checkTie();
    }

    function checkTie(){
        let tieNum = 0;
        for(let i in gameBoard.gameTable){
            if(gameBoard.gameTable[i][1] != 0){
                tieNum += 1;
            }
        }
        if(tieNum == 9){
            alert('The game is Tie');
            lockGame();
        }
    }

    
    function declareWin(currentMarker){
        if(player.marker == currentMarker){
            alert("Player " + player.name + " won!");
        } else if(opponent.marker == currentMarker){
            alert("Player " + opponent.name + " won!");
        }
        lockGame();
    }

    function lockGame(){
        for(let i in gameBoard.gameTable){
            gameBoard.gameTable[i][0]
            .removeEventListener('click', placeMarker);
        };
        alert("Press reset to  clear the game table");
    }
};

function startGame(){
    let player1 = new Player('john', 'o');
    let player2 = new Player ('brian', 'x');
    playGame(player1, player2);
};

function resetGame(){
    let gameBoard = new GameBoard();
    for(let i in gameBoard.gameTable){
        while(gameBoard.gameTable[i][0].hasChildNodes()){
            gameBoard.gameTable[i][0].removeChild(gameBoard.gameTable[i][0].childNodes[0]);
        }
    }
}

function displayMove(id, marker){
    let element = document.getElementById(id);
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.justifyContent = 'center';
    let markerNode = document.createElement('span');
    let playerMarker = document.createTextNode(marker);
    markerNode.appendChild(playerMarker);
    markerNode.style.textAlign = 'center';
    markerNode.style.fontSize = "36px";
    element.appendChild(markerNode);
}




