import {Room} from "../../interfaces/room.interface.ts";
import {roomA1, roomA2, roomA3, roomA4, roomA5} from "../../rooms/roomsA.const.ts";

export const room1: Room = {
    ...roomA1,
    minions: [
        {
            icon: "skeleton",
            atk: 1,
            def: 1,
            x: 2,
            y: 2,
            dead: false
        },
        {
            icon: "skeleton",
            atk: 1,
            def: 1,
            x: 3,
            y: 2,
            dead: false
        }
    ],
    doors: [
        {
            topLeft: {x: 3, y: 3},
            direction: "horizontal",
            open: false
        },
        {
            topLeft: {x: 4, y: 2},
            direction: "vertical",
            open: false
        }
    ],
}

export const room2: Room = {
    ...roomA2,
    minions: [
        {
            icon: "zombie",
            atk: 2,
            def: 2,
            x: 6,
            y: 1,
            dead: false
        },
        {
            icon: "mummy",
            atk: 2,
            def: 2,
            x: 6,
            y: 2,
            dead: false
        },
        {
            icon: "zombie",
            atk: 2,
            def: 2,
            x: 6,
            y: 3,
            dead: false
        },
    ],
    doors: [
        {
            topLeft: {x: 4, y: 2},
            direction: "vertical",
            open: false
        },
        {
            topLeft: {x: 8, y: 2},
            direction: "vertical",
            open: false
        }
    ],
    intro_audio: "audio/quest1/q1_mummy.mp3"
}

export const room3: Room = {
    ...roomA3,
    minions: [
        {
            icon: "skeleton",
            atk: 2,
            def: 2,
            x: 9,
            y: 1,
            dead: false
        },
        {
            icon: "skeleton",
            atk: 2,
            def: 2,
            x: 9,
            y: 3,
            dead: false
        },
        {
            icon: "mummy",
            atk: 2,
            def: 2,
            x: 9,
            y: 4,
            dead: false
        },
    ],
    doors: [
        {
            topLeft: {x: 8, y: 2},
            direction: "vertical",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 10,
                y: 1
            },
            bottomRight: {
                x: 11,
                y: 3
            },
            icon: "tomb"
        },
        {
            topLeft: {
                x: 10,
                y: 5
            },
            bottomRight: {
                x: 10,
                y: 5
            },
            icon: "chestUp"
        }
    ],
}

export const room4: Room = {
    ...roomA4,
    minions: [
        {
            icon: "goblin",
            atk: 2,
            def: 2,
            x: 3,
            y: 6,
            dead: false
        },
        {
            icon: "orc",
            atk: 2,
            def: 2,
            x: 4,
            y: 5,
            dead: false
        },
    ],
    doors: [
        {
            topLeft: {x: 3, y: 3},
            direction: "horizontal",
            open: false
        },
        {
            topLeft: {x: 3, y: 8},
            direction: "horizontal",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 1,
                y: 5
            },
            bottomRight: {
                x: 2,
                y: 7
            },
            icon: "altarBook"
        }
    ],
}

export const room5: Room = {
    ...roomA5,
    minions: [
        {
            icon: "goblin",
            atk: 2,
            def: 2,
            x: 6,
            y: 7,
            dead: false
        },
        {
            icon: "goblin",
            atk: 2,
            def: 2,
            x: 7,
            y: 7,
            dead: false
        },
    ],
    doors: [
        {
            topLeft: {x: 7, y: 8},
            direction: "horizontal",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 6,
                y: 5
            },
            bottomRight: {
                x: 8,
                y: 6
            },
            icon: "table"
        }
    ],
    intro_audio: "audio/quest1/q1_room_A5.mp3"
}