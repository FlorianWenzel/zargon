import {Point} from "./point.interface.ts";

export interface Door {
    open: boolean;
    direction: 'horizontal' | 'vertical';
    topLeft: Point;
}