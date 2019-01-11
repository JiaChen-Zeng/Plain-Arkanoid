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
            <v-text
                v-if="watcher"
                text="Two players are ready. You can only watch the game."
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

const socket = io('https://Plain-Arkanoid--sh1noka.repl.co');

export default {
    name: 'Game',
    components: {
        Bar,
        Ball
    },
    data() {
        return {
            show: true,
            player: NaN,
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
    computed: {
        watcher() {
            return 2 <= this.player;
        }
    },
    created() {
        socket.on('player-enter', data => {
            this.player = data.player;
            console.log(this.player);
        });
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
            if (this.watcher) return;

            socket.emit('bar-move', {
                x: event.evt.clientX,
                y: event.evt.clientY
            });
            // this.mouse = { x: event.evt.offsetX, y: event.evt.offsetY };
        },
        onTouchMove(event) {
            if (this.watcher) return;

            socket.emit('bar-move', {
                x: event.evt.targetTouches[0].clientX,
                y: event.evt.targetTouches[0].clientY
            });
        }
    }
};
</script>
