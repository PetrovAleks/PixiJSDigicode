import { Shape, Circle, Triangle, Rectangle, Polygon, Ellipse } from '../models';
import { ShapeView } from '../view/index';
import { Culler } from 'pixi.js';

// utilse
import { randomColor, randomInRange, randomPolygonSides } from '../utils';

// constants
import {
    ERandomRangeCircleSize,
    ERandomRangeRectangleSize,
    ERandomRangeTriangleSize,
    ERandomRangeEllipseSize,
    ERandomRangePolygonSize,
    SHAPE_COUNT,
    GRAVITY_COUNT,
    SHAPES_COUNT_ELEMENT,
    SURFACE_AREA_ELEMENT,
    DEFAULT_SHAPE_PER_SECOND,
    DEFAULT_GRAVITY,
    EModels,
    SHAPE_CONSTRUCTORS,
    START_SHAPE_POSITION,
    SECONDS,
    END_SHAPE_POSITION
} from '../constants'

export class ShapeController {
    private view: ShapeView;
    private gravity: number = DEFAULT_GRAVITY;
    private shapesPerSecond: number = DEFAULT_SHAPE_PER_SECOND;
    private culler: Culler;
    private rect: DOMRect;

    constructor(view: ShapeView) {
        this.view = view;
        this.rect = this.view.app.canvas.getBoundingClientRect();
        this.culler = new Culler();
        this.startShapeCreation();
        this.addClickListener();
        this.animate();
    }

    private animate() {
        this.update();
        this.view.app.render();
        requestAnimationFrame(() => this.animate());
    }

    private addClickListener() {
        this.view.app.canvas.addEventListener('click', () => {
            const { x, y } = this.view.getMousePosition();
            const shape = this.view.checkShapeAtPosition();
            if (!shape) {
                this.createRandomShape(x, y);
            } else {

                this.view.changeAllShapesColor(shape, randomColor());
                this.view.removeShape(shape);

            }
        });
    }

    createRandomShape(x: number, y: number) {
        const shapeType = Math.floor(Math.random() * Object.keys(EModels).length / 2);
        const ShapeConstructor = SHAPE_CONSTRUCTORS[shapeType];
        let shape: Shape;

        switch (shapeType) {
            case EModels.CIRCLE:
                shape = new ShapeConstructor(
                    x,
                    y,
                    randomInRange(ERandomRangeCircleSize.MIN, ERandomRangeCircleSize.MAX),
                    randomColor()
                );
                break;
            case EModels.TRIANGLE:
                shape = new ShapeConstructor(
                    x,
                    y,
                    randomInRange(ERandomRangeTriangleSize.MIN, ERandomRangeTriangleSize.MAX),
                    randomColor()
                );
                break;
            case EModels.RECTANGLE:
                shape = new ShapeConstructor(
                    x,
                    y,
                    randomInRange(ERandomRangeRectangleSize.MAX_WIDTH, ERandomRangeRectangleSize.MAX_WIDTH),
                    randomInRange(ERandomRangeRectangleSize.MIN_HEIGHT, ERandomRangeRectangleSize.MAX_HEIGHT),
                    randomColor()
                );
                break;
            case EModels.ELLIPSE:
                shape = new ShapeConstructor(
                    x,
                    y,
                    randomInRange(ERandomRangeEllipseSize.MIN, ERandomRangeEllipseSize.MAX),
                    randomInRange(ERandomRangeEllipseSize.MIN, ERandomRangeEllipseSize.MAX),
                    randomColor()
                );
                break;
            case EModels.POLYGON:
                shape = new ShapeConstructor(
                    x,
                    y,
                    randomPolygonSides(),
                    randomInRange(ERandomRangePolygonSize.MIN, ERandomRangePolygonSize.MAX),
                    randomColor()
                );
                break;
            default:
                shape = new Circle(
                    x,
                    y,
                    randomInRange(ERandomRangeCircleSize.MIN, ERandomRangeCircleSize.MAX),
                    randomColor()
                );
        }
        this.view.addShape(shape);
    }

    private update() {
        if (!this.gravity) return;

        const children = this.view.app.stage.children;

        for (let i = children.length - 1; i >= 0; i--) {
            const graphics = children[i] as any;
            graphics.y += this.gravity * (this.rect.height / this.view.app.canvas.height);

            if (graphics.y > this.rect.height + END_SHAPE_POSITION) {
                this.view.app.stage.removeChild(graphics);
            }
        }

        const viewport = { x: 0, y: 0, width: this.rect.width, height: this.rect.height };
        this.culler.cull(this.view.app.stage, viewport);
        this.updateUI();
    }

    setGravity(value: number) {
        if (value <= 0) return;
        this.gravity = Number(value.toFixed(1));
    }

    setShapesPerSecond(value: number) {
        if (value <= 0) return;
        this.shapesPerSecond = value;
    }

    getShapesPerSecond() {
        return this.shapesPerSecond;
    }

    getGravity() {
        return this.gravity;
    }

    private updateUI() {
        SHAPE_COUNT.innerHTML = this.shapesPerSecond.toString();
        GRAVITY_COUNT.innerHTML = this.gravity.toString();

        const shapesCount = this.view.app.stage.children.length;
        const surfaceArea = this.view.app.stage.children.reduce((total, graphics: any) => {
            const shape = graphics.shape as Shape;
            return total + shape?.getArea();
        }, 0);

        SHAPES_COUNT_ELEMENT.value = shapesCount.toString();
        SURFACE_AREA_ELEMENT.value = surfaceArea.toFixed(2);
    }

    private startShapeCreation() {
        let lastTime = 0;
        let shapesToCreate = this.shapesPerSecond;
        const createShapes = (time: number) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            shapesToCreate += (deltaTime / SECONDS) * this.shapesPerSecond;
            const shapesCount = Math.floor(shapesToCreate);
            shapesToCreate -= shapesCount;

            for (let i = 0; i < shapesCount; i++) {
                const x = Math.random() * this.rect.width;
                const y = START_SHAPE_POSITION;
                this.createRandomShape(x, y);
            }
            requestAnimationFrame(createShapes);
        };
        requestAnimationFrame(createShapes);
    }
}