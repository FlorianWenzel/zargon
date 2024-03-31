import {Room} from "../../interfaces/room.interface.ts";

export const room8: Room = {
    id: 7,
    open: false,
    topLeft: {x: 5, y: 13},
    bottomRight: {x: 9, y: 18},
    minions: [
        {
            icon: "orc",
            atk: 2,
            def: 2,
            x: 8,
            y: 15,
            dead: false
        },
        {
            icon: "orc",
            atk: 2,
            def: 2,
            x: 7,
            y: 14,
            dead: false
        },
    ],
    doors: [
        {
            topLeft: {x: 8, y: 15},
            direction: "vertical",
            open: false
        },
        {
            topLeft: {x: 7, y: 17},
            direction: "horizontal",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 5,
                y: 15
            },
            bottomRight: {
                x: 6,
                y: 17
            },
            icon: "desk"
        },
        {
            topLeft: {
                x: 6,
                y: 13
            },
            bottomRight: {
                x: 8,
                y: 13
            },
            icon: "shelf"
        }
    ],
}