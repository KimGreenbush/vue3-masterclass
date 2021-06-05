import { createStore } from "vuex";
import sourceData from "@/data";

export default createStore({
	state: {
		...sourceData,
		authId: "Miej9zSGMRZKDvMXzfxjVOyv3RF3",
	},
	getters: {
		authUser: (state) => {
			const user = state.users.find((user) => user.id === state.authId);
			if (!user) return null;
			return {
				...user,
				// "get" keyword makes the functions accessible as properties
				get posts() {
					return state.posts.filter((post) => post.userId === user.id);
				},
				get postsCount() {
					return this.posts.length;
				},
				get threads() {
					return state.threads.filter((thread) => thread.userId === user.id);
				},
				get threadsCount(){
					return this.threads.length;
				},
			};
		},
	},
	actions: {
		// deconstructed {commit} out of
		//				  (       context,        payload)
		createPost({ commit, state }, post) {
			post.id = "ggg" + Math.random();
			post.userId = state.authId;
			post.publishedAt = Math.floor(Date.now() / 1000);
			commit("setPost", { post });
			commit("appendPostToThread", { postId: post.id, threadId: post.threadId });
		},
		createThread({ commit, state, dispatch}, { text, title, forumId }) {
			const id = "ggg" + Math.random();
			const userId = state.authId;
			const publishedAt = Math.floor(Date.now() / 1000);
			const thread = { forumId, publishedAt, title, userId, id };
			commit("setThread", { thread })
			commit("appendThreadToUser", { userId, threadId: id })
			commit("appendThreadToForum", { forumId, threadId: id })
			dispatch("createPost", { text, threadId: id })
		},
		updateUser({ commit }, user) {
			commit("setUser", { user, userId: user.id });
		},
	},
	mutations: {
		setUser(state, { user, userId }) {
			const userIndex = state.users.findIndex((user) => user.id === userId);
			state.users[userIndex] = user;
		},
		setPost(state, { post }) {
			state.posts.push(post);
		},
		setThread(state, { thread }) {
			state.threads.push(thread);
		},
		appendPostToThread(state, { postId, threadId }) {
			const thread = state.threads.find((thread) => thread.id === threadId);
			thread.posts = thread.posts || []; // ensure posts array exists before adding posts
			thread.lastPostId = postId // update when adding new posts
			thread.posts.push(postId);
		},
		appendThreadToForum(state, {forumId, threadId}) {
			const forum = state.forums.find((forum) => forum.id === forumId);
			forum.threads = forum.threads || []; // ensure threads array exists before adding threads
			forum.lastPostId = state.threads.find((thread) => thread.id === threadId).lastPostId // update when adding new posts
			forum.threads.push(threadId);
		},
		appendThreadToUser(state, {userId, threadId}) {
			const user = state.users.find((user) => user.id === userId);
			user.threads = user.threads || []; // ensure threads array exists before adding threads
			user.lastPostId = state.threads.find((thread) => thread.id === threadId).lastPostId // update when adding new posts
			user.threads.push(threadId);
		},
	},
});