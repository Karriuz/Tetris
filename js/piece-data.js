const iBrick = {
    class: 'iBrick',
    mainSquare: {
        x: 6,
        y: 1,
    },

    rotateStates: [
        [
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -2, y: 0 },
        ],
        [
            { x: 0, y: -2 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 }
        ]
    ],

    rotateOffset: [-1, 0, 2, 2]
}

const oBrick = {
    class: 'oBrick',
    mainSquare: {
        x: 6,
        y: 2,
    },

    rotateStates: [
        [
            { x: 1, y: -1 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 }
        ],
    ],
}

const zBrick = {
    class: 'zBrick',
    mainSquare: {
        x: 6,
        y: 2
    },

    rotateStates: [
        [
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 }
        ],
        [
            { x: 1, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 1 }
        ]
    ],

    rotateOffset: [1, 0, 0, -1]
}

const sBrick = {
    class: 'sBrick',
    mainSquare: {
        x: 6,
        y: 2
    },

    rotateStates: [
        [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: -1 }
        ],
        [
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ]
    ],

    rotateOffset: [1, 0, 0, -1]
}

const tBrick = {
    class: 'tBrick',
    mainSquare: {
        x: 6,
        y: 2
    },

    rotateStates: [
        [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 0 }
        ],
        [
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        ],
        [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        ],
        [
            { x: 0, y: 1 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: 0 }
        ],
    ],

    rotateOffset: [1, 0, 0, -1]
}

const jBrick = {
    class: 'jBrick',
    mainSquare: {
        x: 6,
        y: 1
    },

    rotateStates: [
        [
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -1, y: -1 }
        ],
        [
            { x: 1, y: -1 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ],
        [
            { x: 1, y: 1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: -1, y: 0 },
        ],
        [
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 1 }
        ],
    ],

    rotateOffset: [-1, 0, 1, 1]
}

const lBrick = {
    class: 'lBrick',
    mainSquare: {
        x: 6,
        y: 1
    },

    rotateStates: [
        [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 }
        ],
        [
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ],
        [
            { x: -1, y: 1 },
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 1, y: 0 }
        ],
        [
            { x: 0, y: 1 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: -1 }
        ],
    ],

    rotateOffset: [1, 0, -1, -1]
}

export const gameBricksData = [iBrick, oBrick, zBrick, sBrick, tBrick, lBrick, jBrick]