import Ball3 from "./ball3";

class Ball4 extends Ball3 {
    constructor(boardObject){
        super(boardObject);
        this.startPosition = randomizeStartPosition();
    }

    randomizeStartPosition(){

    }

    randomizer() {
        if (Math.floor(Math.random() * 2) === 1) {
            return 1;
        } else {
            return -1;
        }
    }
}