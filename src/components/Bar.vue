<template>
    <v-group> <v-rect ref="body" :config="bar" /> </v-group>
</template>

<script>
import { STAGE_SIZE } from './GameConfig.js';

export const BAR_Y = 40;

const BAR_DEFAULT = {
    offsetX: 50,
    width: 100,
    height: 20,
    cornerRadius: 10,
    strokeWidth: 3
};

const BAR_DEFAULT_SPECIFIED = [
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
let barCount = 0;

export default {
    name: 'Bar',
    props: {
        player: Number
    },
    data() {
        return {
            bar: Object.assign(
                {},
                BAR_DEFAULT,
                BAR_DEFAULT_SPECIFIED[barCount++]
            ),
            velocity: 0.5
        };
    },
    computed: {
        x: {
            get() {
                return this.bar.x;
            },
            set(x) {
                this.bar.x = x;
            }
        }
    },
    methods: {
        moveTowards(x, time) {
            if (isNaN(x)) return;

            const dx = x - this.bar.x;
            const vx = this.velocity * time;
            this.bar.x += vx < Math.abs(dx) ? Math.sign(dx) * vx : dx; // When out of reach, move at a <velocity> speed; or to the destination
        }
    }
};
</script>
