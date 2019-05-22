/*jshint esversion: 8*/
const chalk = require("chalk");
const { board } = require("./ExamInput");

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
        this.currentPosition = this.calculatePosition(
            this.currentPosition,
            this.vector
        );
    }

    calculatePosition(position, vector) {
        let [positionY, positionX] = [...position];
        let [vectorY, vectorX] = [...vector];

        positionY += vectorY;
        positionX += vectorX;
        return [positionY, positionX];
    }

    getValueAtPosition(position) {
        let [positionY, positionX] = position;
        return this.boardCopy[positionY][positionX];
    }

    isWall(position, vector) {
        return this.getValueAtPosition(
            this.calculatePosition(position, vector)
        ) === "X"
            ? true
            : false;
    }

    checkWall() {
        let position = this.currentPosition;
        let currentVector = this.vector.slice();

        let direction = {
            straight: { vector: [...currentVector] },
            top: { vector: [-1, 0] },
            bottom: { vector: [1, 0] },
            left: { vector: [0, -1] },
            right: { vector: [0, 1] }
        };

        Object.values(direction).forEach((p, i) => {
            p.isWall = this.isWall(position, p.vector);
        });

        return direction;
    }

    lookAround() {
        let newVector = this.vector.slice();
        let direction = this.checkWall();

       if(direction.top.isWall || direction.bottom.isWall || direction.left.isWall || direction.right.isWall){
            if (direction.top.isWall) newVector[0] = 1;
            if (direction.bottom.isWall) newVector[0] = -1;
            if (direction.left.isWall) newVector[1] = 1;
            if (direction.right.isWall) newVector[1] = -1;
       }else if (direction.straight.isWall) newVector= [-newVector[0],-newVector[1]];
            
        

        this.setVector(newVector);

        return newVector;
    }

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
                if (this.boardCopy[i][j] === "X") color = chalk.bgGreen;
                if (this.boardCopy[i][j] === "0") color = chalk.bgBlue;
                if (this.boardCopy[i][j] === "1") color = chalk.bgRed;
                if (this.boardCopy[i][j] === "Y") color = chalk.bgYellow;

                row += color(" " + this.boardCopy[i][j] + " ");
            }
            console.log(row);
        }
    }
    set1(position) {
        this.boardCopy[position[0]][position[1]] = "1";
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
    ball.lookAround();
    ball.move();
    drawer.draw();

    if (ball.isStartPosition() === true) {
        clearInterval(this);
        console.log("Success !!!!!!!!!");
    }
}, 300);

// for (let i = 0; i < 12; i++) {
//     drawer.draw();
//     //ball.checkY();
//     ball.lookAround();
//     ball.move();

//     if (ball.isStartPosition === true) {
//         clearInterval(this);
//         console.log("Success !!!!!!!!!");
//     }
// }
