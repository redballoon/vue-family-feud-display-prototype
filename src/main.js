import Vue from 'vue';

import { Loading, Toast } from 'buefy';

import App from './App.vue';

import store from './store';

import './styles/main.scss';


Vue.use(Loading);
Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
