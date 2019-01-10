import { STAGE_SIZE } from './GameConfig.js';

export const BALL_ORIGIN_Y = 40 + 150; // CodeSanbox's BUG: https://stackoverflow.com/questions/54103871/named-import-is-undefined-when-default-export-and-named-export-are-both-used
// export const BALL_ORIGIN_Y = BAR_Y + 150;

export const CIRCLE_DEFAULT = {
    x: STAGE_SIZE.width / 2,
    radius: 8,
    fill: 'orange',
    stroke: 'black',
    strokeWidth: 1
};

export const CIRCLE_DEFAULT_SPECIFIED = [
    { y: BALL_ORIGIN_Y },
    { y: STAGE_SIZE.height - BALL_ORIGIN_Y }
];
