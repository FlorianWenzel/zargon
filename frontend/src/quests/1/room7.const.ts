import {Room} from "../../interfaces/room.interface.ts";

export const room7: Room = {
    id: 6,
    open: true,
    topLeft: {x: 1, y: 14},
    bottomRight: {x: 5, y: 18},
    minions: [],
    doors: [
        {
            topLeft: {x: 3, y: 17},
            direction: "horizontal",
            open: false
        }
    ],
    objects: [
        {
            topLeft: {
                x: 1,
                y: 14
            },
            bottomRight: {
                x: 2,
                y: 15
            },
            icon: "stairs"
        }
    ],
}