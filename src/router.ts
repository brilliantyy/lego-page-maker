import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/project/create',
			name: 'create',
			component: () => import('./views/project/Project.vue')
		},
		{
			path: '/project/detail/:id',
			name: 'detail',
			component: () => import('./views/project/Project.vue')
		},
	],
})
