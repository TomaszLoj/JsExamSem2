
class Ball3 {
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

    
}

export default Ball3