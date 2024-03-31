import {Point} from "./point.interface.ts";

export interface Furniture {
    topLeft: Point;
    bottomRight: Point;
    icon: string;
}