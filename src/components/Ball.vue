<template>
    <v-circle :config="circle" />
</template>

<script>
import {
    CIRCLE_DEFAULT,
    CIRCLE_DEFAULT_SPECIFIED
} from '../configs/BallConfig.js';
import { BAR_Y } from '../configs/BarConfig.js';

export const BALL_ORIGIN_Y = BAR_Y + 150;

export default {
    name: 'Ball',
    props: {
        player: Number
    },
    data() {
        return {
            circle: Object.assign(
                {},
                CIRCLE_DEFAULT,
                CIRCLE_DEFAULT_SPECIFIED[this.player]
            ),
            dx: 0,
            dy: 0,
            velocity: 2
        };
    },
    computed: {
        x: {
            get() {
                return this.circle.x;
            },
            set(x) {
                this.circle.x = x;
            }
        },
        y: {
            get() {
                return this.circle.y;
            },
            set(y) {
                this.circle.y = y;
            }
        }
    },
    methods: {
        start(velocity = this.velocity) {
            const direction = 2 * Math.PI * Math.random();
            this.dx = velocity * Math.cos(direction);
            this.dy = velocity * Math.sin(direction);
        },
        move(time) {
            this.x += this.dx;
            this.y += this.dy;
        }
    }
};
</script>
