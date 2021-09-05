import { clean, gameBoard, spawnNewPiece, lockedTiles, failGame } from './game.js'
import { scoreIncrease } from './score.js'

let freezeIt = false;
let gameShouldRestart = false

export class Piece {
    constructor(mainSquare, rotateStates, type, rotateOffset, cssClass) {
        this.mainSquare = mainSquare;
        this.rotateStates = rotateStates
        this.currentState = rotateStates[0]
        this.locked = false;
        this.rotateOffset = rotateOffset
        this.cssClass = cssClass
    }

    draw() {
        this.currentState.forEach(obj => {
            const brickPart = document.createElement('div')
            brickPart.classList.add(this.cssClass)
            brickPart.classList.add('active-piece')
            brickPart.classList.add('brick')
            brickPart.style.gridRowStart = this.mainSquare.y + obj.y
            brickPart.style.gridColumnStart = this.mainSquare.x + obj.x

            if (this.locked === true) {
                brickPart.classList.remove('active-piece')
                lockedTiles.push({ x: this.mainSquare.x + obj.x, y: this.mainSquare.y + obj.y, brickPart: brickPart })
                scoreIncrease(2.5)

                if (this.mainSquare.y + obj.y === 1) {
                    gameShouldRestart = true
                }
            }
            gameBoard.appendChild(brickPart)
        });

        if (gameShouldRestart === true) {
            failGame()
            gameShouldRestart = false
        }

    };

    moveDown() {
        this.currentState.forEach(brickPart => {
            if (compareToLocked(this, brickPart, 0, 1)) {
                freezeIt = true;
            }
        });

        if (freezeIt === true) {
            this.locked = true;
            spawnNewPiece()
            freezeIt = false;
        }
        else {
            this.mainSquare.y++
        }
    }

    moveSides(direction) {
        let moveit = 0;
        let shouldItMove = true;
        this.currentState.forEach(brickPart => {
            if (direction == 'right') {
                if (compareToLocked(this, brickPart, 1, 0)) {
                    shouldItMove = false
                    return
                }
                else {
                    moveit = 1
                }
            }
            if (direction == 'left') {
                if (compareToLocked(this, brickPart, -1, 0)) {
                    shouldItMove = false
                    return
                }
                else {
                    moveit = -1
                }
            }
        })
        if (shouldItMove === true) {
            this.mainSquare.x += moveit;
            moveit = 0
        }
    }

    rotate() {
        clean('active-piece')
        const index = this.rotateStates.indexOf(this.currentState)

        if (this.rotateStates[index + 1] === undefined) {
            if (colideRotationCheck(this, 0)) this.currentState = this.rotateStates[0]
        }
        else {
            if (colideRotationCheck(this, index + 1)) this.currentState = this.rotateStates[index + 1]
        }
    }

    moveDownRepeat() {
        if (this.locked === false) {
            this.moveDown()
            this.moveDownRepeat()
        }
    }
}

function compareToLocked(piece, brickPart, offsetX, offsetY) {
    let result = false;
    lockedTiles.filter(element => element.x === piece.mainSquare.x + brickPart.x + offsetX && element.y === piece.mainSquare.y + brickPart.y + offsetY).forEach(() => { result = true })
    return result
}

function colideRotationCheck(piece, rotateStateIndex) {
    const oldPiecePosition = piece.mainSquare.x;
    let canItRotate = true
    let counter = 0

    for (let i = 0; i < piece.rotateStates[rotateStateIndex].length; i++) {
        const brickPart = piece.rotateStates[rotateStateIndex][i];
        let offset = 0
        if (compareToLocked(piece, brickPart, 0, 0)) {
            offset = piece.rotateOffset[i];
            counter++

            piece.rotateStates[rotateStateIndex].forEach(brickPart => {
                if (compareToLocked(piece, brickPart, offset, 0)) { counter++; console.log('brick failed lockCheck') }  // this entire function is such complete garbage
            });

            if (counter === 1) {
                piece.mainSquare.x += offset
            }
            else {
                canItRotate = false
                piece.mainSquare.x = oldPiecePosition
            }
        }
    }
    return canItRotate
}