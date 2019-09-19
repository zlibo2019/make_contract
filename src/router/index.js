import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Main  from '@/views/Main/Main';
Vue.use(Router)
const router = new Router({
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/Main',
			name: 'Main',
			component: Main,
		},
		{
			path: '/Main/:user/:pwd',
			name: 'Main',
			component: Main,
		},
	]
})
export default router;
