import { Shape } from "./Shape";
export class Polygon extends Shape {
    public sides: number;
    public radius: number;
    private angle: number;

    constructor(x: number, y: number, sides: number, radius: number, color: number) {
        super(x, y, color);
        this.sides = sides;
        this.radius = radius;
        this.draw();
        this.setPosition(x, y);
        this.angle = Math.PI * 2 / this.sides;

    }

    draw(): void {
        const points = [];
        for (let i = 0; i < this.sides; i++) {
            points.push(
                0 + this.radius * Math.cos(i * this.angle),
                0 + this.radius * Math.sin(i * this.angle)
            );
        }
        this.graphics.clear();
        this.graphics.fill(this.color);
        this.graphics.poly(points);
        this.graphics.fill();

    }

    public getSides(): number {
        return this.sides;
    }

    public getRadius(): number {
        return this.radius;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.graphics.position.set(x, y);
    }

    getArea(): number {
        return 0.5 * this.sides * this.radius * this.radius * Math.sin(this.angle);
    }
}
