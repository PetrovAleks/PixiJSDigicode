const MIN_POLIGON_SIDES = 4;

export const randomInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export const randomPolygonSides = (): number => {
    return Math.floor(Math.random() * 3) + MIN_POLIGON_SIDES;
}

export const randomColor = (): number => {
    return Math.floor(Math.random() * 0xffffff);
}