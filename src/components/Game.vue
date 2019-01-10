<template>
    <v-stage ref="stage" :config="stageSize" @mousemove="onMouseMove">
        <v-layer>
            <bar
                ref="bars"
                v-for="(bar, index) of bars"
                :key="'bar-' + index"
                v-bind="bar"
            />
            <ball
                ref="balls"
                v-for="(ball, index) of balls"
                :key="'ball-' + index"
                v-bind="ball"
            />
        </v-layer>
    </v-stage>
</template>

<script>
import Konva from 'konva';
import Bar from './Bar.vue';
import Ball from './Ball.vue';
import { STAGE_SIZE } from './GameConfig.js';

let player = 0;

export default {
    name: 'Game',
    components: {
        Bar,
        Ball
    },
    data() {
        return {
            stageSize: STAGE_SIZE,
            bars: [{ player: 0 }, { player: 1 }],
            balls: [{ player: 0 }, { player: 1 }],
            mouse: {
                x: NaN,
                y: NaN
            }
        };
    },
    mounted() {
        new Konva.Animation(
            frame => this.onTick.call(this, frame),
            this.$refs.stage.getStage().getLayer()
        ).start();

        // test code
        setTimeout(
            () =>
                this.$refs.balls.forEach(ball => {
                    ball.start();
                }),
            1000
        );
    },
    methods: {
        onTick(frame) {
            for (const bar of this.$refs.bars) {
                bar.moveTowards(this.mouse.x, frame.timeDiff);
            }

            for (const ball of this.$refs.balls) {
                ball.move(frame.timeDiff);
            }
        },
        onMouseMove(event) {
            this.mouse = { x: event.evt.offsetX, y: event.evt.offsetY };
        }
    }
};
</script>
