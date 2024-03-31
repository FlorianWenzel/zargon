import {Point} from "./point.interface.ts";
import {Furniture} from "./furniture.interface.ts";
import {Door} from "./door.interface.ts";

export interface Room {
    id: string | number;
    open: boolean;
    minions: any[];
    objects: Furniture[];
    doors: Door[];
    topLeft: Point;
    bottomRight: Point;
    color?: string;
    intro_audio?: string;
    clickEventListener?: number;
}