// window.Vue = require('vue');
// import {store} from './store/index';

// const files = require.context('./components', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// store.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(store.state));
// });

// new Vue({
//     store,
//     beforeCreate() {
//         this.$store.commit('initializeState');
//     },
// }).$mount('#app');

interface Point {
    x: number;
    y: number;
    z: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}, ${p.z}`);
}

const point = { x: 1, y: 2, z: 3 };
logPoint(point);