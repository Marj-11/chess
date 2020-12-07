import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import GameLocal from '../components/Game_local.vue';
import GameGlobal from '../components/Game_global.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/local',
        name: 'GameLocal',
        component: GameLocal,
    },
    {
        path: '/global',
        name: 'GameGlobal',
        component: GameGlobal,
    },
    // {
    // path: '/about',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    // },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;