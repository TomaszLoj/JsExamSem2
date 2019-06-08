const chalk = require("chalk");
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

export default  Drawer;