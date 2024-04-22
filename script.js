
//creating a IIFE that creates the gameBoard object
const gameBoard = (function () {
    return {
        fields: ["1","2","3",
                "4","5","6",
                "7","8","9"]
    }
})();

//creating a IIFE that renders the gameBoard object in the DOM
function gameBoardDOM(gameBoard) {
    
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("game-board");
    document.body.appendChild(boardContainer);
    for(let field of gameBoard.fields) {
        const newField = document.createElement("div");
        newField.classList.add("field");
        newField.dataset.index = field;
        newField.innerText = field;
        boardContainer.appendChild(newField);
    }
}
gameBoardDOM(gameBoard);

//factory function to create players
function createPlayer(order, sign) {
    return {order: order.toUpperCase(),
            sign: sign.toUpperCase()};
}
const playerOne = createPlayer("first", "x");
const playerTwo = createPlayer("second", "o");

//The game function takes the game board object, a player object, and a field as parameters
//and returns an object with a method to update the game board fields according to the player's move.
function game(gameBoardObj, playerObject, field) {

    const updateFields = () => {
            gameBoardObj.fields.splice(gameBoardObj.fields.indexOf(field), 1, playerObject.sign);
            return gameBoardObj.fields;
            }

    const checkForHorizontalStrike = () => {
        for (let i = 0; i < 9; i += 3) {
            if (gameBoardObj.fields[i] === playerObject.sign &&
                gameBoardObj.fields[i + 1] === playerObject.sign &&
                gameBoardObj.fields[i + 2] === playerObject.sign) {
                    return true;
                }
            }
            return false;
        };
    
    const checkForVerticalStrike = () => {
        for (let i = 0; i < 3; i += 1) {
            if (gameBoardObj.fields[i] === playerObject.sign &&
                gameBoardObj.fields[i + 3] === playerObject.sign &&
                gameBoardObj.fields[i + 6] === playerObject.sign) {
                    return true;
                }
            }
            return false;
        };

    const checkForDiagonalStrike = () => {
        for (let i = 0; i < 3; i += 2) {
            if (gameBoardObj.fields[i] === playerObject.sign &&
                gameBoardObj.fields[i + 4] === playerObject.sign &&
                gameBoardObj.fields[i + 8] === playerObject.sign) {
                    return true;
                }
            }
            return false;
        };

    const checkStrike = () => {
        if(checkForDiagonalStrike() || checkForHorizontalStrike() || checkForVerticalStrike()){
            return true;
        } 
        return false;
    };
    
    return {updateFields, checkStrike}
    }

gameBoard.fields;
playerOne.sign;
playerTwo.sign;

//simulation of the game
let moves = [
game(gameBoard, playerOne, "1"),
game(gameBoard, playerTwo, "2"),
game(gameBoard, playerOne, "3"),
game(gameBoard, playerTwo, "4"),
game(gameBoard, playerOne, "5"),
game(gameBoard, playerTwo, "6"),
game(gameBoard, playerOne, "7"),
game(gameBoard, playerTwo, "8"),
game(gameBoard, playerOne, "9")
];

for (let i = 0; i < moves.length; i++) {
    moves[i].updateFields();
    console.log("After move " + (i + 1) + ":", gameBoard.fields);
    if (moves[i].checkStrike()){
        console.log("Player " + ((i % 2 === 0) ? "One (X)" : "Two (O)") + " won!");
        break;
    }
}
