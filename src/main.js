import Vue from "vue";
import App from "./App.vue";

import store from "./store";
import router from './router'
import vuetify from './plugins/vuetify';


import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
const socket = io("http://localhost:3000/");
Vue.use(VueSocketIOExt, socket);


Vue.config.productionTip = false;

new Vue({
    store,
    router,
    vuetify,

    render: function(h) {
        return h(App);
    }
}).$mount("#app");