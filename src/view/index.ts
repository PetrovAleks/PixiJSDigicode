import * as PIXI from 'pixi.js';
import { Shape, Polygon } from '../models';

export class ShapeView {
    public app: PIXI.Application;
    private shapesMap = new Map<Shape, PIXI.Graphics>();
    private mousePosition: { x: number, y: number } = { x: 0, y: 0 };

    constructor(app: PIXI.Application) {
        this.app = app;
        this.setMousePosition();
    }

    changeAllShapesColor(selectedShape: Shape, newColor: number) {
        const shapeType = selectedShape.constructor;
        for (const [shape, graphics] of this.shapesMap) {
            if (shape instanceof Polygon && selectedShape instanceof Polygon) {
                if (shape.getSides() === selectedShape.getSides()) {
                    graphics.tint = newColor;
                }
            } else if (shape.constructor === shapeType) {
                graphics.tint = newColor;
            }
        }
    }

    setMousePosition() {
        this.app.stage.on('mousemove', (event) => {
            this.mousePosition.x = event.global.x;
            this.mousePosition.y = event.global.y;
        });
    }

    addShape(shape: Shape) {
        const graphics = shape.graphics;
        graphics.interactive = true;
        (graphics as any).shape = shape;
        this.app.stage.addChild(graphics);
        this.shapesMap.set(shape, graphics);
        return graphics;
    }

    getGraphics(shape: Shape): PIXI.Graphics | undefined {
        return this.shapesMap.get(shape);
    }

    removeShape(shape: Shape) {
        const graphics = this.shapesMap.get(shape);
        if (graphics) {
            this.app.stage.removeChild(graphics);
            this.shapesMap.delete(shape);
        }
    }

    getMousePosition(): { x: number, y: number } {
        return this.mousePosition;
    }

    checkShapeAtPosition(): Shape | null {
        const point = new PIXI.Point(this.mousePosition.x, this.mousePosition.y);
        for (const [shape, graphics] of this.shapesMap) {
            const localPoint = graphics.toLocal(point);
            if (graphics.containsPoint(localPoint)) {
                return shape;
            }
        }
        return null;
    }
}
