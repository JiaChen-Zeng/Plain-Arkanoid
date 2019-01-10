import { STAGE_SIZE } from './GameConfig.js';

export const BAR_Y = 40;

export const BAR_DEFAULT = {
    offsetX: 50,
    width: 100,
    height: 20,
    cornerRadius: 10,
    strokeWidth: 3
};

export const BAR_DEFAULT_SPECIFIED = [
    {
        x: STAGE_SIZE.width / 2,
        y: STAGE_SIZE.height - BAR_Y,
        fill: 'lightgreen',
        stroke: 'green'
    },
    {
        x: STAGE_SIZE.width / 2,
        y: BAR_Y,
        fill: 'lightblue',
        stroke: 'blue',
        scaleY: -1
    }
];
