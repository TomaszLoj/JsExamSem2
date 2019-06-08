
class Board3 {
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

export default Board3