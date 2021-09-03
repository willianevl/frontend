import Vue from 'vue'
import VueRouter from 'vue-router'

import StudentList from '../views/StudentList.vue';
import StudentCE from '../views/StudentCE.vue';

Vue.use(VueRouter)

const routes = [
	{
		name: "Home",
		path: "/",
		redirect: "/student/list"
	},
	{
		name: "Students List",
		path: "/student/list",
		component: StudentList,
	},
	{
		name: "Create Student",
		path: "/student/create",
		component: StudentCE,
	},
	{
		name: "Edit Student",
		path: "/student/edit/:ra",
		component: StudentCE
	},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
