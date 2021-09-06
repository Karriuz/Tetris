import { Piece } from './piece.js'
import { gameBricksData } from './piece-data.js'
import { clearRow, scoreIncrease, levelIncrease, gameDifficulity } from './score.js'
import { animateBackground } from './background.js'
import { score } from './score.js'

const gameBoard = document.getElementById('game-board');
const menu = document.getElementById('menu')
const miniBoard = document.getElementById('mini-board')
const saveScorePanel = document.getElementById('save-score-panel')
const scoreBoard = document.getElementById('scoreboard-container')
const pauseButton = document.getElementById("pause-button")

let lastRendertime = 0
let treasureMap = ['b', 'D', '7']
let treasure = ''
let url
let lockedTiles = []
let currentBlock
let nextPieceID
let paused = true

document.getElementById('cancel-button').addEventListener('click', restartGame)
document.getElementById('send-score-button').addEventListener('click', saveScore)
pauseButton.addEventListener("click", pauseGame)
document.getElementById('menu-play-button').addEventListener("click", pauseGame)
window.addEventListener('keydown', (e) => {
    moveBlock(e.key, currentBlock)
});

const main = (currentTime) => {
    if (paused === false) {
        window.requestAnimationFrame(main);
        if (currentTime - lastRendertime > 1000 / gameDifficulity) {
            lastRendertime = currentTime;
            currentBlock.moveDown()
            draw();
        }
    }
};

function spawnNewPiece() {
    if (paused === true) return

    if (currentBlock === undefined) {
        nextPieceID = getRandomInt(0, 7)
    }
    else {
        currentBlock.draw()
    }
    const pieceInUse = gameBricksData[nextPieceID]
    currentBlock = new Piece({ ...pieceInUse.mainSquare }, pieceInUse.rotateStates, pieceInUse.type, pieceInUse.rotateOffset, pieceInUse.class)
    nextPieceID = getRandomInt(0, 7)
    displayNextPiece(nextPieceID)
}

function draw() {
    clearRow()
    clean('active-piece')
    currentBlock.draw()
}

function moveBlock(key, currentBlock) {
    if (currentBlock.locked === false && paused === false) {
        clean('active-piece')
        switch (key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':
                currentBlock.moveSides('left')
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                currentBlock.moveSides('right')
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                currentBlock.moveDown()
                break;
            case 'e':
            case 'E':
            case 'ArrowUp':
                currentBlock.rotate();
                break;
            case " ":
                currentBlock.moveDownRepeat();
                break;
        }
        draw()
    }
}

function restartGame() {
    lastRendertime = 0
    lockedTiles = []
    currentBlock = undefined
    nextPieceID = undefined
    paused = false

    for (let i = 0; i < 22; i++) {
        lockedTiles.push({ x: 0, y: i })
        lockedTiles.push({ x: 11, y: i })
        lockedTiles.push({ x: i, y: 22 })
    }
    getScores()
    levelIncrease(0)
    scoreIncrease(0)
    saveScorePanel.style.visibility = 'hidden'
    gameBoard.innerHTML = ''
    pauseButton.addEventListener('click', pauseGame)
    spawnNewPiece()
    pauseGame()
}

function pauseGame() {
    if (paused === true) {
        menu.style.visibility = 'hidden'
        window.requestAnimationFrame(main);
        paused = false
    }
    else {
        menu.style.visibility = 'visible'
        paused = true
    }
    document.getElementById('focus-handler').focus()
}

function displayNextPiece(index) {
    let path = ''
    switch (index) {
        case 0:
            path = 'miniboard-ipiece.png'
            break;
        case 1:
            path = 'miniboard-opiece.png'
            break;
        case 2:
            path = 'miniboard-zpiece.png'
            break;
        case 3:
            path = 'miniboard-spiece.png'
            break;
        case 4:
            path = 'miniboard-tpiece.png'
            break;
        case 5:
            path = 'miniboard-lpiece.png'
            break;
        case 6:
            path = 'miniboard-jpiece.png'
            break;
    }
    miniBoard.style.backgroundImage = `url(./imgs/${path})`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function clean(cssTag) {
    const arr = gameBoard.getElementsByClassName(cssTag)
    while (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            gameBoard.removeChild(arr[i])
        }
    }
}

function failGame() {
    treasureMap.push(['S', 'e', 'R'])
    saveScorePanel.style.visibility = 'visible'
    pauseButton.removeEventListener('click', pauseGame)
    pauseGame()
}

function saveScore() {
    treasureMap.push(['T', 'x'])
    let username = document.getElementById('nickname-input').value
    if (username.length > 15) {
        alert('nice idea')
        treasureMap = ': D_'
    }
    else {
        treasureMap.push('a')
    }

    for (var i = treasureMap.length - 1; i >= 0; i--) {
        treasure += treasureMap[i];
    }

    const user = {
        name: username,
        score: score
    }

    url = "https://karrius-tetris-api.herokuapp.com/scores/" + treasure
    fetch(url,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(function (res) { return res.json(); })

    restartGame()
}

function getScores() {
    fetch("https://karrius-tetris-api.herokuapp.com/scores/",
        {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => { return b.score - a.score })
            scoreBoard.innerHTML = `
            <h1>TOP SCORES:</h1>
            <h2>1. ${data[0].name} - ${data[0].score}</h2>
            <h3>2. ${data[1].name} - ${data[1].score}</h3>
            <h4>3. ${data[2].name} - ${data[2].score}</h4>
            <h4>4. ${data[3].name} - ${data[3].score}</h4>
            <h4>5. ${data[4].name} - ${data[4].score}</h4>
            <h4>6. ${data[5].name} - ${data[5].score}</h4>
            <h4>7. ${data[6].name} - ${data[6].score}</h4>
            `
        });
}

restartGame()
animateBackground()
treasureMap.push(['5', 'w', '1', '4'])

export { main, gameBoard, miniBoard, lockedTiles, currentBlock, spawnNewPiece, clean, moveBlock, pauseGame, failGame }