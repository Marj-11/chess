import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        black_player: '',
        playerOne: '',
        playerTwo: '',
        global_player: '',
        player: '',
        state: false,
    },
    mutations: {
        SET(state, payload) {
            state.playerOne = payload.playerOne;
            state.playerTwo = payload.playerTwo;
        },
        SET_GLOBAL_PLAYER(state, payload) {
            state.global_player = payload.global_player;
        },
        DIALOG(state, payload) {
            state.player = payload.player;
            state.state = payload.state;
        },
        SET_BLACK_PLAYER(state, payload) {
            state.black_player = payload
        }
    },
    actions: {
        set_players({ commit }, payload) {
            commit('SET', payload);
        },
        set_global_player({ commit }, payload) {
            commit('SET_GLOBAL_PLAYER', payload);
        },
        dialog({ commit }, payload) {
            commit('DIALOG', payload);
        },
        set_black_player({ commit }, payload) {
            commit('SET_BLACK_PLAYER', payload)
        }
    },
    getters: {},
});
