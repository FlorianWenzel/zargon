export type Texture = {
    key: string;
    img: string;
    width: number | 'full';
    height: number | 'full';
    rotation?: number;

}

export const textures: Texture[] = [
    {key: 'gameBoard', img: 'game-board.png', width: 'full', height: 'full'},
    {key: 'skeleton', img: 'icons/skeleton.png', width: 1, height: 1},
    {key: 'mummy', img: 'icons/mummy.png', width: 1, height: 1},
    {key: 'zombie', img: 'icons/zombie.png', height: 1, width: 1},
    {key: 'tomb', img: 'icons/tomb.png', height: 3, width: 2},
    {key: 'chestUp', img: 'icons/chestUp.png', height: 1, width: 1},
    {key: 'doorHorizontal', img: 'icons/doorHorizontal.png', height: 1, width: 1},
    {key: 'doorVertical', img: 'icons/doorVertical.png', height: 1, width: 1},
    {key: 'altarBook', img: 'icons/altarBook.png', height: 3, width: 2},
    {key: 'goblin', img: 'icons/goblin.png', height: 1, width: 1},
    {key: 'orc', img: 'icons/orc.png', height: 1, width: 1},
    {key: 'table', img: 'icons/table.png', height: 2, width: 3},
    {key: 'dwarf', img: 'icons/dwarf.png', height: 1, width: 1},
    {key: 'priest', img: 'icons/priest.png', height: 1, width: 1},
    {key: 'elf', img: 'icons/elf.png', height: 1, width: 1},
    {key: 'barbarian', img: 'icons/barbarian.png', height: 1, width: 1},
    {key: 'rack', img: 'icons/rack.png', height: 3, width: 2},
    {key: 'stairs', img: 'icons/stairs.png', height: 3, width: 2},
    {key: 'shelf', img: 'icons/shelf.png', height: 1, width: 3},
    {key: 'desk', img: 'icons/desk.png', height: 3, width: 2},
    {key: 'weaponsRack', img: 'icons/weaponsRack.png', height: 3, width: 1},
    {key: 'murloc', img: 'icons/murloc.png', height: 1, width: 1},
    {key: 'stone', img: 'icons/stone.png', height: 1, width: 1},
]