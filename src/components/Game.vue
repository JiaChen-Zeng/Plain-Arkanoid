<template>
    <v-stage
        ref="stage"
        :config="stageSize"
        @mousemove="onMouseMove"
        @touchmove="onTouchMove"
    >
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
import io from 'socket.io-client';
import Bar from './Bar.vue';
import Ball from './Ball.vue';
import { STAGE_SIZE } from '../configs/GameConfig.js';

let player = NaN;

const socket = io('https://Plain-Arkanoid--sh1noka.repl.co');

socket.on('player-enter', data => {
    player = data.player;
    console.log(player);
});

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
            mouse: [
                {
                    x: NaN,
                    y: NaN
                },
                {
                    x: NaN,
                    y: NaN
                }
            ]
        };
    },
    mounted() {
        new Konva.Animation(
            frame => this.onTick.call(this, frame),
            this.$refs.stage.getStage().getLayer()
        ).start();

        // test code
        socket.on('bar-move-ok', data => {
            this.mouse[data.player] = data.mouse;
        });
        setTimeout(this.start, 1000);
    },
    methods: {
        start() {
            for (const ball of this.$refs.balls) {
                ball.start();
            }
        },
        onTick(frame) {
            this.$refs.bars.forEach((bar, index) => {
                if (isNaN(this.mouse[index].x)) return;
                bar.moveTowards(this.mouse[index].x, frame.timeDiff);
            });

            for (const ball of this.$refs.balls) {
                ball.move(frame.timeDiff);
            }
        },
        onMouseMove(event) {
            socket.emit('bar-move', {
                x: event.evt.clientX,
                y: event.evt.clientY
            });
            // this.mouse = { x: event.evt.offsetX, y: event.evt.offsetY };
        },
        onTouchMove(event) {
            socket.emit('bar-move', {
                x: event.evt.targetTouches[0].clientX,
                y: event.evt.targetTouches[0].clientY
            });
        }
    }
};
</script>
