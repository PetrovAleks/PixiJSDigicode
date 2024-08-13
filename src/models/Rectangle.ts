import { Shape } from './Shape';

export class Rectangle extends Shape {
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number, color: number) {
        super(x, y, color);
        this.width = width;
        this.height = height;
        this.setPosition(x, y);
        this.draw();
    }

    draw(): void {
        this.graphics.clear();
        this.graphics.fill(this.color);
        this.graphics.rect(0, 0, this.width, this.height);
        this.graphics.fill();

    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.graphics.position.set(x, y);
    }

    getArea(): number {
        return this.width * this.height;
    }
}