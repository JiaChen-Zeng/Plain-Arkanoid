<template>
  <v-circle :config="circle" />
</template>

<script>
import { BAR_Y } from "./Bar.vue";
import { STAGE_SIZE } from "./GameConfig.js";

export const BALL_ORIGIN_Y = 40 + 150; // CodeSanbox's BUG: https://stackoverflow.com/questions/54103871/named-import-is-undefined-when-default-export-and-named-export-are-both-used
// export const BALL_ORIGIN_Y = BAR_Y + 150;

const CIRCLE_DEFAULT = {
  x: STAGE_SIZE.width / 2,
  radius: 8,
  fill: "orange",
  stroke: "black",
  strokeWidth: 1
};

const CIRCLE_DEFAULT_SPECIFIED = [
  { y: BALL_ORIGIN_Y },
  { y: STAGE_SIZE.height - BALL_ORIGIN_Y }
];

export default {
  name: "Ball",
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
