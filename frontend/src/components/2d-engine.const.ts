import {Point} from "../interfaces/point.interface.ts";
import {Rectangle} from "two.js/src/shapes/rectangle";
import Two from "two.js";
import {Quest} from "../interfaces/quest.interface.ts";
import {Texture} from "two.js/src/effects/texture";
import {Door} from "../interfaces/door.interface.ts";
import {Minion} from "../interfaces/minion.interface.ts";
import {Furniture} from "../interfaces/furniture.interface.ts";
import {Room} from "../interfaces/room.interface.ts";
import {textures} from "./textures.const.ts";

export type Player = {
    x: number;
    y: number;
    icon: string;
}


export class Engine  {

    private TILE_SIZE_X: number;
    private TILE_SIZE_Y: number;
    private BORDER_OFFSET_X: number;
    private BORDER_OFFSET_Y: number;
    private BOARD_WIDTH: number;
    private BOARD_HEIGHT: number;

    private images: Record<string, HTMLCanvasElement> = {};
    private cachedTextures: Record<string, Texture> = {};

    private players: Player[] = []
    private currentQuest : Quest = {intro_audio: "", players: [], rooms: []};
    private movingPlayer: Player | undefined;
    private monsters: Minion[] = [];
    private objects: Furniture[] = [];
    private doors: Door[] = [];
    private eventListeners: {topLeft: Point, bottomRight: Point, callback: () => void }[] = [];



    private two: Two | undefined = undefined;


    constructor(){
        this.BOARD_HEIGHT = window.innerHeight;
        const IMAGE_ASPECT_RATIO = 1581 / 1169;
        this.BOARD_WIDTH = window.innerHeight * IMAGE_ASPECT_RATIO;
        const SCREEN_ASPECT_RATIO = window.innerWidth / window.innerHeight;
        if(SCREEN_ASPECT_RATIO < IMAGE_ASPECT_RATIO){
            this.BOARD_WIDTH = window.innerWidth;
            this.BOARD_HEIGHT = window.innerWidth / IMAGE_ASPECT_RATIO;
        }

        let BORDER_LEFT = (window.innerWidth - (window.innerHeight * IMAGE_ASPECT_RATIO)) / 2;
        if(BORDER_LEFT < 0) BORDER_LEFT = 0;

        let BORDER_TOP = (window.innerHeight - (window.innerWidth / IMAGE_ASPECT_RATIO)) / 2;
        if(BORDER_TOP < 0) BORDER_TOP = 0;

        if(window.innerHeight > window.innerWidth){
            alert('Please rotate your device to landscape mode and reload the page');
        }


        this.TILE_SIZE_X = this.BOARD_WIDTH / 26.45;
        this.TILE_SIZE_Y = this.BOARD_HEIGHT / 19.45;

        this.BORDER_OFFSET_X = this.TILE_SIZE_X * 0.23 + BORDER_LEFT;
        this.BORDER_OFFSET_Y = this.TILE_SIZE_Y * 0.23 + BORDER_TOP;

        window.addEventListener('keydown', (e) => {
            if(!this.movingPlayer) return;
            if(e.key === 'w'){
                this.movingPlayer.y -= 1;
            } else if(e.key === 's'){
                this.movingPlayer.y += 1;
            } else if(e.key === 'a'){
                this.movingPlayer.x -= 1;
            } else if(e.key === 'd'){
                this.movingPlayer.x += 1;
            }
            this.render();
        })

        const boardGameDom = document.querySelector('.gameBoard') as HTMLDivElement;
        this.two = new Two({ fullscreen: true, height: this.BOARD_HEIGHT, width: this.BOARD_WIDTH }).appendTo(boardGameDom);

        this.two.renderer.domElement.style.display = 'block';
        window.addEventListener('resize', resize, false);
        let two = this.two || false;
        function resize() {
            if(!two) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            two.width = width;
            two.height = height;
            two.renderer.setSize(width, height);
        }
        resize();
        this.handleClickEvents();
        this.loadTextures()
            .then(() => {
                this.render();
            })

        setTimeout(this.render, 10)

    }

    playIntroAudio(){
        if(this.currentQuest.intro_audio){
            const audio = new Audio(this.currentQuest.intro_audio);
            audio.play();
        }
    }


    getX(x: number){
        return x * this.TILE_SIZE_X + this.BORDER_OFFSET_X;
    }
    getY(y: number){
        return y * this.TILE_SIZE_Y + this.BORDER_OFFSET_Y;
    }
    getRectangle(topLeft: Point, bottomRight: Point, options?: {color?: string, icon?: string, opacity?: number}): Rectangle {
        const width = (bottomRight.x - topLeft.x) * this.TILE_SIZE_X;
        const height = (bottomRight.y - topLeft.y) * this.TILE_SIZE_Y;

        const centerX = this.getX(topLeft.x) + width / 2;
        const centerY = this.getY(topLeft.y) + height / 2;

        const rect = new Two.Rectangle(centerX, centerY, width, height);
        if(options?.color)
            rect.fill = options?.color;
        if(options?.icon)
            rect.fill = this.getImage(options?.icon);

        if(options?.icon && options?.color){
            const backgroundRect = new Two.Rectangle(centerX, centerY, width, height);
            backgroundRect.fill = options?.color;
            this.two?.add(backgroundRect);
        }

        rect.opacity = options?.opacity ?? 1;

        this.two?.add(rect);
        return rect;
    }



    public loadQuest(quest: Quest){
        this.currentQuest = quest;
        this.players.push(...quest.players);
        const openRooms = quest.rooms.filter(room => room.open);
        openRooms.forEach((room) => this.openRoom(room));
    }




    getImage(key: string): Texture{
        if(this.cachedTextures[key]) return this.cachedTextures[key];
        const canvas = this.images[key];
        if(!canvas) return new Texture();
        this.cachedTextures[key] = new Two.Texture(canvas);
        return new Two.Texture(canvas);
    }







    render(){
        if(!this.two) return;
        this.renderBackground();
        this.drawRooms()
        this.drawDoors();
        this.drawFurniture()
        this.drawMonsters();
        this.drawPlayers();
        this.two.update();
    }




    async loadTextures() {
        await Promise.all(textures.map(({ key, img, width, height, rotation }) => {
            return new Promise((resolve) => {

                if(width === 'full'){
                    width = window.innerWidth / this.TILE_SIZE_X
                }
                if(height === 'full'){
                    height = window.innerHeight / this.TILE_SIZE_Y
                }

                const TARGET_HEIGHT = height * this.TILE_SIZE_Y;
                const TARGET_WIDTH = width * this.TILE_SIZE_X;
                const image = new Image();
                image.src = img;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if(!ctx) return;

                    if (rotation === 90 || rotation === 270) {
                        canvas.width = TARGET_HEIGHT;
                        canvas.height = TARGET_WIDTH;
                    } else {
                        canvas.width = TARGET_WIDTH;
                        canvas.height = TARGET_HEIGHT;
                    }

                    // Calculate the scale and dimensions for the image
                    const scale = Math.min(TARGET_WIDTH / image.width, TARGET_HEIGHT / image.height);
                    const scaledWidth = image.width * scale;
                    const scaledHeight = image.height * scale;

                    ctx.save(); // Save the current context state

                    if (rotation) {
                        // Translate and rotate context for drawing
                        ctx.translate(canvas.width / 2, canvas.height / 2);
                        ctx.rotate(rotation * Math.PI / 180); // Convert degrees to radians
                        // Draw the image centered on the rotated context
                        ctx.drawImage(
                            image,
                            -scaledWidth / 2, -scaledHeight / 2,
                            scaledWidth, scaledHeight
                        );
                    } else {
                        // Draw the image without rotation
                        ctx.drawImage(
                            image,
                            (canvas.width - scaledWidth) / 2, (canvas.height - scaledHeight) / 2,
                            scaledWidth, scaledHeight
                        );
                    }

                    ctx.restore(); // Restore the context to its original state
                    resolve(1);

                    this.images[key] = canvas; // Assuming 'images' is intended to store the resulting canvases
                };
            })
        }))
        this.render();
    }

    renderBackground(){
        const texture: Texture = this.getImage('gameBoard');
        if(!this.two || !texture) return

        const background = this.two.makeRectangle(this.two.width / 2, this.two.height / 2, this.BOARD_WIDTH, this.BOARD_HEIGHT);
        background.fill = texture;
        this.two.update();
    }
    drawRooms(){
        this.currentQuest.rooms.forEach(room => {
            const shape = this.getRectangle(room.topLeft, room.bottomRight, { color: room.color || 'rgba(0, 0, 0, 1)', opacity: room.open ? 0 : .5 });

            if(!room.clickEventListener)
                room.clickEventListener = this.addEventListener(shape, () => {
                    if(room.open) this.lookForTreasure(room);
                    else this.openRoom(room)
                })
        })
    }
    lookForTreasure(_: Room){
        console.log('Looking for treasure');
    }
    openRoom(room: Room){
        room.open = true;
        this.monsters.push(...room.minions);
        this.objects.push(...room.objects);
        this.doors.push(...room.doors);
        if(room.intro_audio){
            const audio = new Audio(room.intro_audio);
            audio.play();
        }
        this.render();
    }

    drawDoors() {
        this.doors.forEach(door => {
            const { topLeft, direction } = door;
            const icon = 'door' + (direction === 'horizontal' ? 'Horizontal' : 'Vertical');
            const shape = this.getRectangle(topLeft,
                {x: topLeft.x +1 , y: topLeft.y + 1}, { icon})
            let width = this.TILE_SIZE_X / 3;
            let height = this.TILE_SIZE_Y / 3;

            if(direction === 'horizontal'){
                width = this.TILE_SIZE_X;
                shape.translation.y += this.TILE_SIZE_Y / 2;
            } else {
                height = this.TILE_SIZE_Y;
                shape.translation.x += this.TILE_SIZE_X / 2;
            }
            shape.width = width;
            shape.height = height;
        })
    }
    drawMonsters(){
        this.monsters.forEach(monster => {
            if(!this.two) return;
            const {x, y, icon} = monster;
            this.getRectangle({x, y}, {x: x + 1, y: y + 1}, {icon});
        })
        this.two?.update();
    }
    drawPlayers(){
        this.players.forEach(player => {
            const {x, y, icon} = player;
            console.log(this.movingPlayer === player)
            this.getRectangle({x, y}, {x: x + 1, y: y + 1}, {icon, color: this.movingPlayer === player ? 'rgba(255, 0, 0, .5)' : ''})
        })
    }
    drawFurniture(){
        this.objects.forEach((furniture: Furniture) => {
            const { topLeft, bottomRight, icon} = furniture;
            this.getRectangle(topLeft, { x: bottomRight.x + 1, y: bottomRight.y + 1}, {icon});
        })
    }

    addEventListener(shape: Rectangle, callback: () => void): number {
        return this.eventListeners.push(
            {
                topLeft:
                    {
                        x: shape.translation.x - shape.width / 2,
                        y: shape.translation.y - shape.height / 2
                    },
                bottomRight:
                    {
                        x: shape.translation.x + shape.width / 2,
                        y: shape.translation.y + shape.height / 2
                    },
                callback
            }
        )
    }
    handleClickEvents(){
        this.two?.renderer.domElement.addEventListener('click', (e: MouseEvent) => {
            const x = e.clientX - this.two?.renderer.domElement.getBoundingClientRect().left;
            const y = e.clientY - this.two?.renderer.domElement.getBoundingClientRect().top;

            const playerClicked = this.players.find(player => {
                const topLeft = {x: player.x * this.TILE_SIZE_X + this.BORDER_OFFSET_X, y: player.y * this.TILE_SIZE_Y + this.BORDER_OFFSET_Y};
                const bottomRight = {x: topLeft.x + this.TILE_SIZE_X, y: topLeft.y + this.TILE_SIZE_Y};
                return x > topLeft.x && x < bottomRight.x && y > topLeft.y && y < bottomRight.y;
            })
            if(playerClicked && (playerClicked === this.movingPlayer)){
                this.movingPlayer = undefined;
                this.render();
                return;
            }
            if(playerClicked){
                this.movingPlayer = playerClicked;
                this.render()
                return;
            }

            const clickedSquare = {
                x: Math.floor((x - this.BORDER_OFFSET_X) / this.TILE_SIZE_X),
                y: Math.floor((y - this.BORDER_OFFSET_Y) / this.TILE_SIZE_Y)
            }

            if(this.movingPlayer){
                this.movingPlayer.x = clickedSquare.x;
                this.movingPlayer.y = clickedSquare.y;
                this.movingPlayer = undefined;
                this.render();
                return;
            }

             this.eventListeners.forEach(({topLeft, bottomRight, callback}) => {
                if(x > topLeft.x && x < bottomRight.x && y > topLeft.y && y < bottomRight.y){
                    callback();
                }
            })
        }, false);
    }
}
