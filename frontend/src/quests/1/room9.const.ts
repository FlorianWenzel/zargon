import {Room} from "../../interfaces/room.interface.ts";

export const room9: Room = {
    id: 8,
    open: false,
    topLeft: {x: 9, y: 13},
    bottomRight: {x: 12, y: 18},
    minions: [
        {
            icon: "murloc",
            atk: 2,
            def: 2,
            x: 10,
            y: 16,
            dead: false
        },
        {
            icon: "goblin",
            atk: 2,
            def: 2,
            x: 10,
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
            topLeft: {x: 10, y: 12},
            direction: "horizontal",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 11,
                y: 15
            },
            bottomRight: {
                x: 11,
                y: 17
            },
            icon: "weaponsRack"
        }
    ],
}