import {Room} from "../../interfaces/room.interface.ts";

export const room6: Room = {
    id: 5,
    open: false,
    topLeft: {x: 1, y: 10},
    bottomRight: {x: 5, y: 14},
    minions: [
        {
            icon: "goblin",
            atk: 2,
            def: 2,
            x: 2,
            y: 11,
            dead: false
        },
        {
            icon: "orc",
            atk: 2,
            def: 2,
            x: 2,
            y: 12,
            dead: false
        },
    ],
    doors: [
        {
            topLeft: {x: 0, y: 11},
            direction: "vertical",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 3,
                y: 10
            },
            bottomRight: {
                x: 4,
                y: 12
            },
            icon: "rack"
        }
    ],
}