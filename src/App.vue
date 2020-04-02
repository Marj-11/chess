<template>
  <div id="app">
    <Board />
  </div>
</template>

<script>
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    Board
  }
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
