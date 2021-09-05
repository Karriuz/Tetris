import { lockedTiles } from "./game.js";

const scoreDisplay = document.getElementsByClassName('score-para')
const levelDisplay = document.getElementById('level-para')
let gameDifficulity = 1
let score = 0
let level = 1

function clearRow() {
    let streak = 0

    for (let i = 0; i < 22; i++) {
        let counter = 0
        filterRowAndExectute(i, () => { counter++ })
        if (counter === 10) {
            filterRowAndExectute(i, (element) => { element.brickPart.remove(), element.y = 100 })
            moveAllRowsDown()
            streak++
        }

        if (streak !== 0 && i === 21) {
            scoreIncrease(streak * 200 - 100)
        }
    }
}

const moveAllRowsDown = () => {
    for (let index = 22; index > 0; index--) {
        let moveIt = true;
        lockedTiles.filter(element => element.y === index + 1 && !(element.x === 11 || element.x === 0)).forEach(() => { moveIt = false })
        if (moveIt === true) {
            filterRowAndExectute(index, (element) => { element.y++; element.brickPart.style.gridRowStart++ })
        }
    }
}

function filterRowAndExectute(index, instructions) {
    lockedTiles.filter(element => element.y === index && !(element.y === 22 || element.x === 11 || element.x === 0)).forEach(element => instructions(element))
}

function scoreIncrease(value) {
    if (value === 0) {
        score = 0
    } else {
        score += value
    }
    scoreDisplay[0].innerText = score
    scoreDisplay[1].innerText = score

    if (score > level * 2000) {
        levelIncrease(1)
    }
}

function levelIncrease(value) {
    if (value === 0) {
        level = 1
        gameDifficulity = 1
        document.body.className = 'purple'
    }
    else {
        gameDifficulity = gameDifficulity * 0.5 + gameDifficulity
        level += value

        if (level === 3) {
            for (let i = 0; i < 2; i++) {
                document.body.className = 'blue'
            }
        }
        if (level === 5) {
            for (let i = 0; i < 2; i++) {
                document.body.className = 'red'
            }
        }
    }
    levelDisplay.innerText = level
}



export { scoreIncrease, clearRow, levelIncrease, gameDifficulity, score }