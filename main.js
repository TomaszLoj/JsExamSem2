/*jshint esversion: 6 */
const { board } = require("./ExamInput");
const chalk = require("chalk");

let startPosition = [1, 1];
let position = startPosition.slice();
let vector = [1, 1];
let counter = 0;

const getrandomNumber = () => {
    if (Math.floor(Math.random() * 2) === 1) {
        return 1;
    } else {
        return -1;
    }
};

function setVector(y, x) {
    vector[0] = y;
    vector[1] = x;
}
function move(position, vector) {
    position[0] += vector[0];
    position[1] += vector[1];
}

function checkWall(position, vector, board) {
    let positionY = position[0];
    let positionX = position[1];

    let vectorY = vector[0];
    let vectorX = vector[1];

    let walls = [];
    let wallsCounter = 0;

    if (board[positionY + vectorY][positionX + vectorX] === "X") {
        wallsCounter++;
        walls.push([-vectorY, -vectorX]);
    }
    if (board[positionY][positionX + 1] === "X") {
        wallsCounter++;
        walls.push([vectorY, -1]);
    }
    if (board[positionY][positionX - 1] === "X") {
        wallsCounter++;
        walls.push([vectorY, 1]);
    }
    if (board[positionY - 1][positionX] === "X") {
        wallsCounter++;
        walls.push([1, vectorX]);
    }
    if (board[positionY + 1][positionX] === "X") {
        wallsCounter++;
        walls.push([-1, vectorX]);
    }

    if (wallsCounter === 1) {
        setVector(walls[0][0], walls[0][1]);
    } else if (wallsCounter === 3) {
        setVector(walls[0][0], walls[0][1]);
    } else if (wallsCounter === 2) {
        setVector(walls[0][0], walls[0][1]);
        setVector(walls[1][0], walls[1][1]);
    }

    if (board[positionY][positionX] === "Y") {
        board[positionY][positionX] = "0";
        setVector(getrandomNumber(), getrandomNumber());
    }
}

function draw(position) {
    console.clear();

    let boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[position[0]][position[1]] = "1";

    for (let i = 0; i < boardCopy.length; i++) {
        let row = "";
        let color ;
        for (let j = 0; j < boardCopy[i].length; j++) {
            if (boardCopy[i][j] === "X") {
                color = chalk.bgGreen;
            }
            if (boardCopy[i][j] === "0") {
                color = chalk.bgBlue;
            }
            if (boardCopy[i][j] === "1") {
                color = chalk.bgRed;
            }
            if (boardCopy[i][j] === "Y") {
                color = chalk.bgYellow;
            }
            row += color(" " + boardCopy[i][j] + " ");
        }
        console.log(row);
    }
   
}

function findCorners(board) {
    let corners = [];
    let vectors = [];
    let positionY = 0;
    let positionX = 0;

    for (positionY = 0; positionY < board.length; positionY++) {
        for (positionX = 0; positionX < board[0].length; positionX++) {
            let wallsCounter = 0;
            let vector = [0, 0];

            if (board[positionY][positionX] !== "X") {
                if (board[positionY][positionX + 1] === "X") {
                    wallsCounter++;
                    vector[1] = -1;
                }
                if (board[positionY][positionX - 1] === "X") {
                    wallsCounter++;
                    vector[1] = 1;
                }
                if (board[positionY - 1][positionX] === "X") {
                    wallsCounter++;
                    vector[0] = 1;
                }
                if (board[positionY + 1][positionX] === "X") {
                    wallsCounter++;
                    vector[0] = -1;
                }

                if (wallsCounter > 1) {
                    corners.push([positionY, positionX]);
                    vectors.push(vector);
                }
            }
        }
    }
    return { corners, vectors };
}
function setRandomStartPosition(board) {
    let corners = findCorners(board).corners;
    let vectors = findCorners(board).vectors;
    let random = Math.floor(Math.random() * corners.length);

    startPosition = corners[random];
    position = startPosition.slice();

    board[startPosition[0]][startPosition[1]] = "1";
    setVector(vectors[random][0], vectors[random][1]);
}

setRandomStartPosition(board);

setInterval(function() {
    checkWall(position, vector, board);
    move(position, vector);
    draw(position);
    console.log(counter);
    console.log(startPosition);
    counter++;

    if (position[0] === startPosition[0] && position[1] === startPosition[1]) {
        clearInterval(this);
        console.log("Success !!!!!!!!!");
    }
}, 300);
