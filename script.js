
//creating a IIFE that creates the gameboard object

let gameBoard = (function () {
    return {
        fields: ["1","2","3",
                "4","5","6",
                "7","8","9"]
    }
})();

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


    return {updateFields, checkForHorizontalStrike, checkForVerticalStrike, checkForDiagonalStrike};
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

for(let i = 0; i<moves.length; i++){
    console.log(moves[i].updateFields())
    console.log(moves[i].checkForHorizontalStrike());
}

