<template>
  <v-app id="app" @mousedown="this.prevent">
    <v-main>
      <router-view>
        <Home />
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue';
import GameLocal from './components/Game_local.vue';
import GameGlobal from './components/Game_global.vue';
import Modal from './components/Modal.vue';
import ModalResign from './components/ModalResign.vue';

export default {
  name: 'App',
  components: {
    GameLocal,
    GameGlobal,
    Home,
    Modal,
    ModalResign
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
  background-color: rgb(41, 41, 41);
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
