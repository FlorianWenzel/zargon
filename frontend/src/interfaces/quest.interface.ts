import {Room} from "./room.interface.ts";

export interface Quest {
    rooms: Room[];
    players: {
        x: number;
        y: number;
        icon: string;
    }[];
    intro_audio: string;

}