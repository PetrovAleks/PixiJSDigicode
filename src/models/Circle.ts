import { Shape } from './Shape';

export class Circle extends Shape {
    public radius: number;

    constructor(x: number, y: number, radius: number, color: number) {
        super(x, y, color);
        this.radius = radius;
        this.setPosition(x, y);
        this.draw();

    }

    draw() {
        this.graphics.clear();
        this.graphics.fill(this.color);
        this.graphics.circle(0, 0, this.radius);
        this.graphics.fill();
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.graphics.position.set(x, y); // Устанавливаем позицию графического объекта
    }
}