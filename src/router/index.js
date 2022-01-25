import { createRouter, createWebHistory } from "vue-router"
import Home from "@/pages/Home"
import Forum from "@/pages/Forum"
import Category from "@/pages/Category"
import Profile from "@/pages/Profile"
import ThreadShow from "@/pages/ThreadShow"
import ThreadCreate from "@/pages/ThreadCreate"
import ThreadEdit from "@/pages/ThreadEdit"
import NotFound from "@/pages/NotFound"
import sourceData from "@/data.json"
import { findById } from "@/helpers/"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		meta: { toTop: true, smoothScroll: true },
	},
	{
		path: "/profile/edit",
		name: "ProfileEdit",
		component: Profile,
		props: { edit: true },
	},
	{
		path: "/category/:id",
		name: "Category",
		component: Category,
		props: true,
	},
	{
		path: "/forum/:id",
		name: "Forum",
		component: Forum,
		props: true,
	},
	{
		path: "/thread/:id",
		name: "ThreadShow",
		component: ThreadShow,
		props: true,
		beforeEnter(to, from, next) {
			// check if thread exists
			const threadExists = findById(sourceData.threads, to.params.id)
			// if exists
			if (threadExists) {
				return next()
			}
			// if Not Found
			else {
				next({
					name: "NotFound",
					params: { pathMatch: to.path.substring(1).split("/") },
					query: to.query,
					hash: to.hash,
				})
			}
		},
	},
	{
		//	path: "/thread/create",  this route is a direct route and can go after the prev one due to the updated router WARN: will not older vers of router
		path: "/forum/:forumId/thread/create",
		name: "ThreadCreate",
		component: ThreadCreate,
		props: true,
	},
	{
		path: "/thread/:id/edit",
		name: "ThreadEdit",
		component: ThreadEdit,
		props: true,
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: NotFound,
	},
]

export default createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to) {
		const scroll = {}
		// one line if statement
		if (to.meta.toTop) scroll.top = 0
		if (to.meta.smoothScroll) scroll.behavior = "smooth"
		return scroll
	},
})
