const Player = (shape) => {
    const getShape = () => shape;
    return {getShape};
}

const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    
    const setField = (index, shape) => {
        if (index > board.length){return};
        board[index] = shape;
    };
    
    const getField = (index) => {
        return board[index];
    }; 
    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = ''; 
        }
    };
    return{setField, getField, reset};
})();

const displayController = (() => {
        const boxes = document.querySelectorAll(".box");
        /* Add event listeners */
        const addListeners = () => {
            for (let i = 0; i < boxes.length; i++ ){
                boxes[i].addEventListener("click", clickHandler)
            }
        }
        /* Remove event listeners */
        const removeListener = (index) => {
            boxes[index].removeListener("click", clickHandler)
        }
        /*Handles clicks */
        const clickHandler = (e) => {
            e.currentTarget.textContent = "X"; //will need to update to a function when gamelogic is implemented
        }
    //addListeners();
})();

const gameController = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    //console.log(`${player1.getShape()}`);
    //console.log(`${player2.getShape()}`);
})();