const Player = (shape) => {
    const getShape = () => shape;
    return {getShape};
}

const gameBoard = (() => {
    const board = ['0','1','2','3','4','5','6','7','8'];
    
    const setField = (index, shape) => {
        if (index > board.length){return};
        board[index] = shape;
    };
    
    const getField = (index) => {
       return board[index];
    }; 

    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = `${i}`; 
        }
    };
    return{setField, getField, reset};
})();

const displayController = (() => {
    const boxes = document.querySelectorAll(".box");
    const playerMessage = document.querySelector(".player-message");
    const resetButton = document.querySelector(".reset-button")
    /* Add event listeners */
    boxes.forEach((box) => 
        box.addEventListener("click", (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index)); 
            updateGameboard();
        })
    );
    resetButton.addEventListener("click", () => {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
        setPlayerMessage(`Player X's turn`);
    })
    /* Remove event listeners */
    const removeListener = (index) => {
        boxes[index].removeListener("click", clickHandler)
    };
    /*Set player message element*/
    const setPlayerMessage = (string) => {
        playerMessage.textContent = `${string}`;
    };
    const setGameMessage = (winner) => {
        if (winner === "Draw"){
            playerMessage.textContent = "The game is a draw!" 
        }else {
            playerMessage.textContent = `Player ${winner} has won the game!`;
        }
       
    };
    /*Adds Player's shape to the gameboard */
    const updateGameboard = () => {
        for (let i = 0; i < boxes.length ; i++) {
            if(gameBoard.getField(i) === "X" || gameBoard.getField(i) === "O")
                {boxes[i].textContent = gameBoard.getField(i);}
            else
                {boxes[i].textContent = '';}
        }
    }
    
    return {updateGameboard,removeListener,setPlayerMessage,setGameMessage };
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false

    const playRound = (boxIndex) => {
        gameBoard.setField(boxIndex, getCurrentPlayerShape());
        if (checkForWinner(boxIndex)){
            displayController.setGameMessage(getCurrentPlayerShape());
            isOver = true;
            return;
        }
        if (round === 9){
            displayController.setGameMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayController.setPlayerMessage(`Player ${getCurrentPlayerShape()}'s turn`)
    }
    const getCurrentPlayerShape = () => {
        return round % 2 === 1 ? playerX.getShape() : playerO.getShape();
    }
    const getIsOver = () => {
        return isOver;
    }
    const checkForWinner = (boxIndex) => {
        //winning coordinates
            const winCoords = [
                [0,1,2],
                [0,3,6],
                [0,4,8],
                [1,4,7],
                [2,5,8],
                [2,4,6],
                [3,4,5],
                [6,7,8],
        
            ];
            return winCoords
                .filter((combo) => combo.includes(boxIndex)) //can do without filter I think but it helps to pair it down initially
                .some((allCombos) => allCombos.every(
                    (index) => gameBoard.getField(index) === getCurrentPlayerShape()
                    )
                );
        };
        const getEmptyIndexes = (board) => {
            return board.filter(i => i !=== "O" && i !=== "X")
        }

        const reset = () => {
            isOver = false;
            round = 1;
        }
    return {playRound, getCurrentPlayerShape, getIsOver,getEmptyIndexes, reset}
})();



