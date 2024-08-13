import { Application } from 'pixi.js';
import { ShapeController } from '../controller';
import { ShapeView } from '../view';

// constants
import {
    APP_ELEMENT,
    DECREASE_GRAVITY_BUTTON,
    DECREASE_SHAPES_BUTTON,
    INCREASE_GRAVITY_BUTTON,
    INCREASE_SHAPES_BUTTON,
    BACKGROUND_STAGE_COLOR,
    DEFAULT_SET_SHAPE_PER_SECOND,
    DEFAULT_SET_GRAVITY
} from '../constants';


const initialize = async () => {
    const app = new Application();

    await app.init({
        antialias: true,
        sharedTicker: true,
        autoDensity: true,
        eventMode: "static",
        backgroundColor: BACKGROUND_STAGE_COLOR,
        resolution: devicePixelRatio,
    });
    APP_ELEMENT?.appendChild(app.canvas);
    app.stage.hitArea = app.screen;
    const view = new ShapeView(app);
    const controller = new ShapeController(view);

    INCREASE_SHAPES_BUTTON?.addEventListener('click', () => {
        controller.setShapesPerSecond(controller.getShapesPerSecond() + DEFAULT_SET_SHAPE_PER_SECOND);
    });

    DECREASE_SHAPES_BUTTON?.addEventListener('click', () => {
        controller.setShapesPerSecond(controller.getShapesPerSecond() - DEFAULT_SET_SHAPE_PER_SECOND);
    });

    INCREASE_GRAVITY_BUTTON?.addEventListener('click', () => {
        controller.setGravity(controller.getGravity() + DEFAULT_SET_GRAVITY);
    });

    DECREASE_GRAVITY_BUTTON?.addEventListener('click', () => {
        controller.setGravity(Math.max(DEFAULT_SET_GRAVITY, controller.getGravity() - DEFAULT_SET_GRAVITY));
    });

}

initialize().catch(console.error);