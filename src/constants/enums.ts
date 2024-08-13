import { Circle, Triangle, Rectangle, Ellipse, Polygon, Shape } from '../models';


export enum ERandomRangeTriangleSize {
    MIN = 20,
    MAX = 40
}

export enum ERandomRangeRectangleSize {
    MIN_WIDTH = 20,
    MAX_WIDTH = 60,
    MIN_HEIGHT = 10,
    MAX_HEIGHT = 50
}

export enum ERandomRangeEllipseSize {
    MIN = 10,
    MAX = 20
}

export enum ERandomRangePolygonSize {
    MIN = 20,
    MAX = 50
}

export enum ERandomRangeCircleSize {
    MIN = 10,
    MAX = 30
}

export enum EModels {
    CIRCLE = 0,
    TRIANGLE = 1,
    RECTANGLE = 2,
    ELLIPSE = 3,
    POLYGON = 4
}

export type ShapeConstructorMap = {
    [key: number]: new (...args: any[]) => Shape;
};

export const SHAPE_CONSTRUCTORS: ShapeConstructorMap = {
    0: Circle,
    1: Triangle,
    2: Rectangle,
    3: Ellipse,
    4: Polygon,
};