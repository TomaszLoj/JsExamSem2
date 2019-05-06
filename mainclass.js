/*jshint esversion: 6 */
const { board } = require("./ExamInput");
const chalk = require("chalk");

class Ball {
    constructor(boardObject) {
        this.boardObject = boardObject;
        this.vector = [1, 1];
        this.startPosition = [1, 1];
        this.currentPosition = [1, 1];
        this.boardCopy = JSON.parse(
            JSON.stringify(this.boardObject.getBoard())
        );
    }

    setVector(vector) {
        this.vector = vector;
    }
    move() {
        this.currentPosition[0] += this.vector[0];
        this.currentPosition[1] += this.vector[1];
    }
    checkWall(){}

    isStartPosition() {
        if (
            this.currentPosition[0] === this.startPosition[0] &&
            this.currentPosition[1] === this.startPosition[1]
        ) {
            return true;
        }
    }
    randomizer() {
        if (Math.floor(Math.random() * 2) === 1) {
            return 1;
        } else {
            return -1;
        }
    }
}

class Board {
    constructor(board) {
        this.boardCopy = board.slice();
        this.startPosition = [1, 1];
    }

    getBoard() {
        return this.boardCopy;
    }

    set0(position) {
        this.boardCopy[position[0]][position[1]] = "0";
    }
}

class Drawer {
    constructor(boardObject, ballObject) {
        this.boardObject = boardObject;
        this.ballObject = ballObject;
        this.setBoard();
    }
    draw() {
        console.clear();
        this.setBoard();

        this.set1(this.ballObject.currentPosition);
        this.set1(this.ballObject.startPosition);

        for (let i = 0; i < this.boardCopy.length; i++) {
            let row = "";
            let color;
            for (let j = 0; j < this.boardCopy[i].length; j++) {
                if (this.boardCopy[i][j] === "X") {
                    color = chalk.bgGreen;
                }
                if (this.boardCopy[i][j] === "0") {
                    color = chalk.bgBlue;
                }
                if (this.boardCopy[i][j] === "1") {
                    color = chalk.bgRed;
                }
                if (this.boardCopy[i][j] === "Y") {
                    color = chalk.bgYellow;
                }
                row += color(" " + this.boardCopy[i][j] + " ");
            }
            console.log(row);
        }
    }
    set1(position) {
        this.boardCopy[position[1]][position[0]] = "1";
    }

    setBoard() {
        this.boardCopy = JSON.parse(
            JSON.stringify(this.boardObject.getBoard())
        );
    }
}
const table = new Board(board);
const ball = new Ball(table);
const drawer = new Drawer(table, ball);

setInterval(function() {
    drawer.draw();
    ball.checkY();
    ball.checkWall();
    ball.move();

    if (ball.isStartPosition === true) {
        clearInterval(this);
        console.log("Success !!!!!!!!!");
    }
}, 300);

// while(1){
//     drawer.draw();
//     ball.move();
//     ball.checkWalls();

//     if (ball.isStartPosition === true) {
//         console.log("Success !!!!!!!!!");
//     }
// }
