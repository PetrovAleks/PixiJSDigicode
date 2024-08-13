import * as PIXI from 'pixi.js';
import { Shape } from './Shape';

export class Triangle extends Shape {
    private sideLength: number;

    constructor(x: number, y: number, sideLength: number, color: number) {
        super(x, y, color);
        this.sideLength = sideLength;
        this.setPosition(x, y);
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.fill(this.color);
        this.graphics.poly([
            0, 0 - this.sideLength / 2,
            0 - this.sideLength / 2, this.y + this.sideLength / 2,
            0 + this.sideLength / 2, this.y + this.sideLength / 2
        ]);
        this.graphics.fill();
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.graphics.position.set(x, y);
    }

    getArea(): number {
        return (Math.sqrt(3) / 4) * this.sideLength * this.sideLength;
    }
}