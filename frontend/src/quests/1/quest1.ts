import {Quest} from "../../interfaces/quest.interface";
import {room6} from "./room6.const.ts";
import {room7} from "./room7.const.ts";
import {room8} from "./room8.const.ts";
import {room9} from "./room9.const.ts";
import {corridor1} from "./corridor1.const.ts";
import {corridor2} from "./corridor2.const.ts";
import {room1, room2, room3, room4, room5} from "./roomsA.const.ts";

export const quest1: Quest = {
    rooms: [
        room1,
        room2,
        room3,
        room4,
        room5,
        room6,
        room7,
        room8,
        room9,
        corridor1,
        corridor2
    ],
    players: [
        {
            x: 1,
            y: 16,
            icon: 'priest'
        },
        {
            x: 2,
            y: 16,
            icon: 'barbarian'
        },
        {
            x: 3,
            y: 14,
            icon: 'elf'
        },
        {
            x: 3,
            y: 15,
            icon: 'dwarf'
        }
    ],
    intro_audio: "audio/quest1/q1_intro.mp3"
}