<template>
    <v-group> <v-rect ref="body" :config="bar" /> </v-group>
</template>

<script>
import { BAR_DEFAULT, BAR_DEFAULT_SPECIFIED } from '../configs/BarConfig.js';

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
            const dx = x - this.bar.x;
            const vx = this.velocity * time;
            this.bar.x += vx < Math.abs(dx) ? Math.sign(dx) * vx : dx; // When out of reach, move at a <velocity> speed; or to the destination
        }
    }
};
</script>
