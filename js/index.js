'use struct'

const electron = require('electron');

let APP = {};

window.onload = () => {
    const screen = electron.screen;
    const size = screen.getPrimaryDisplay().size;
    APP.display = new Display('canvas');
    APP.display.width = size.width;
    APP.display.height = size.height;
    APP.display.preload(['image/0.png', 'image/1.png', 'image/2.png', 'image/3.png', 'image/4.png']);
    APP.display.blossoms = [];
    APP.display.clearColor = 'rgba(0, 0, 0, 0)';
    APP.display.on('update', function(e) {
        if (e % 10 === 0) {
            let a = new Blossom(this);
            this.blossoms.push(a);
            this.addChild(a);
        }
    });
    // APP.display.on('init', function() {
    //     for (let i = 0; i < 10; i++) {
    //         let a = new Blossom(this);
    //         this.blossoms.push(a);
    //         this.addChild(a);
    //     }
    // });
};

class Blossom extends AnimationSprite {
    constructor(display) {
        super(25, 25, [
            display.getTexture('image/0.png'),
            display.getTexture('image/1.png'),
            display.getTexture('image/2.png'),
            display.getTexture('image/3.png'),
            display.getTexture('image/4.png')
        ]);
        this.pos = new Vector(display.width, Random.range(0, display.height, true));
        this.rate = 3;
        this.offs = Random.range(1, 2);
        this.on('update', function() {
            this.pos.x -= this.offs * 5;
            this.pos.y += this.offs;
        });
    }
}