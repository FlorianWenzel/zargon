import {Room} from "../../interfaces/room.interface.ts";

export const corridor2: Room = {
    id: 8,
    open: false,
    topLeft: {x: 12, y: 12},
    bottomRight: {x: 14, y: 19},
    minions: [
    ],
    doors: [
        {
            topLeft: {x: 13, y: 15},
            direction: "vertical",
            open: false
        },
    ],
    objects: [
        {
            topLeft: {
                x: 14,
                y: 18
            },
            bottomRight: {
                x: 14,
                y: 18
            },
            icon: "stone"
        }
    ],
}