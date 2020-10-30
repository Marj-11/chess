<template>
  <div id="app" @mousedown="this.prevent">
    <Game />
  </div>
</template>

<script>
import Game from './Game.vue';

export default {
  name: 'App',
  components: {
    Game,
  },
  methods: {
    prevent(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
html {
  background-color: rgb(41, 41, 41);
  height: 100vh;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  margin: 0;
  height: 100%;
}
</style>
