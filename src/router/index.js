import PageHome from "@/components/PageHome";
import PageThreadShow from "@/components/PageThreadShow";
import PageNotFound from "@/components/PageNotFound";
import { createRouter, createWebHistory } from "vue-router";
import sourceData from "@/data.json";

const routes = [
	{
		path: "/",
		name: "Home",
		component: PageHome
	},
	{
		path: "/thread/:id",
		name: "ThreadShow",
		component: PageThreadShow,
		props: true,
		beforeEnter (to, from, next) {
			// check if thread exists
			const threadExists = sourceData.threads.find(t => t.id === to.params.id)
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
					hash: to.hash
				})
			}
		}
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: PageNotFound
	},
];

export default  createRouter({
	history: createWebHistory(),
	routes,
});
