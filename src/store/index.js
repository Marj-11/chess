import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        playerOne: '',
        playerTwo: '',
        player: '',
        state: false,
    },
    mutations: {
        SET(state, payload) {
            state.playerOne = payload.playerOne;
            state.playerTwo = payload.playerTwo;
        },
        DIALOG(state, payload) {
            state.player = payload.player;
            state.state = payload.state;
        },
    },
    actions: {
        set_players({ commit }, payload) {
            commit('SET', payload);
        },
        dialog({ commit }, payload) {
            commit('DIALOG', payload);
        },
    },
    getters: {},
});