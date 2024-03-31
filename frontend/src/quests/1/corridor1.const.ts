import {Room} from "../../interfaces/room.interface.ts";

export const corridor1: Room = {
    id: 8,
    open: false,
    topLeft: {x: 0, y: 18},
    bottomRight: {x: 26, y: 19},
    minions: [
    ],
    doors: [
        {
            topLeft: {x: 3, y: 17},
            direction: "horizontal",
            open: false
        },
        {
            topLeft: {x: 7, y: 17},
            direction: "horizontal",
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
    intro_audio: "audio/quest1/q1_corridor_1.mp3"
}