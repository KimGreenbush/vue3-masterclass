import { createStore } from "vuex";
import sourceData from "@/data";

export default createStore({
	state: {
		...sourceData,
		authId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
	},
	getters: {
		authUser: (state) => state.users.find((user) => user.id === state.authId),
	},
	actions: {
		createPost(context, post) {
			post.id = "ggg" + Math.random();
			context.commit("setPost", { post }); //set post
			context.commit("appendPostToThread", { postId: post.id, threadId: post.threadId }); //append post to thread
		},
	},
	mutations: {
		setPost(state, { post }) {
			state.posts.push(post);
		},
		appendPostToThread(state, { postId, threadId }) {
			const thread = state.threads.find((thread) => thread.id === threadId);
			thread.posts.push(postId);
		},
	},
});
