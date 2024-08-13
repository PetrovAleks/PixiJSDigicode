import * as PIXI from 'pixi.js';

export abstract class Shape {
    public x: number;
    public y: number;
    public color: number;
    public graphics: PIXI.Graphics;

    constructor(x: number, y: number, color: number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.graphics = new PIXI.Graphics();
        this.draw();
    }

    abstract draw(): void;
    abstract getArea(): number;
    abstract setPosition(x: number, y: number): void;
}