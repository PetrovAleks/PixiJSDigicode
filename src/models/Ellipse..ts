import * as PIXI from 'pixi.js';
import { Shape } from './Shape'; // Adjust the import path as needed

export class Ellipse extends Shape {
    public radiusX: number;
    public radiusY: number;

    constructor(x: number, y: number, radiusX: number, radiusY: number, color: number) {
        super(x, y, color);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.setPosition(x, y);
        this.draw();
    }

    draw(): void {
        this.graphics.clear();
        this.graphics.fill(this.color);
        this.graphics.ellipse(0, 0, this.radiusX, this.radiusY);
        this.graphics.fill();

    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.graphics.position.set(x, y);
    }

    getArea(): number {
        return Math.PI * this.radiusX * this.radiusY;
    }
}