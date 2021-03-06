import { createStore } from "vuex"
import sourceData from "@/data"
import { findById, upsert } from "@/helpers"

const makeAppendChildToParentMutation = ({ child, parent }) => {
	return (state, { childId, parentId }) => {
		const resource = findById(state[parent], parentId)
		resource[child] = resource[child] || []
		if (child === "posts") {
			resource.lastPostId = childId
		} else if (child !== "contributors") {
			resource.lastPostId = findById(state[child], childId).lastPostId
		}
		if (!resource[child].includes(childId)) {
			resource[child].push(childId)
		}
	}
}

export default createStore({
	state: {
		...sourceData,
		authId: "Miej9zSGMRZKDvMXzfxjVOyv3RF3",
	},
	getters: {
		authUser: (state) => {
			const user = findById(state.users, state.authId)
			if (!user) return null
			return {
				...user,
				// "get" keyword makes the functions accessible as properties
				get posts() {
					return state.posts.filter((post) => post.userId === user.id)
				},
				get postsCount() {
					return this.posts.length
				},
				get threads() {
					return state.threads.filter((thread) => thread.userId === user.id)
				},
				get threadsCount() {
					return this.threads.length
				},
			}
		},
		thread: (state) => {
			return (id) => {
				const thread = findById(state.threads, id)
				return {
					...thread,
					get author() {
						return findById(state.users, thread.userId)
					},
					get repliesCount() {
						return thread.posts.length - 1
					},
					get contributorsCount() {
						thread.contributors = thread.contributors || []
						return thread.contributors.length
					},
				}
			}
		},
	},
	actions: {
		// deconstructed {commit, etc } out of context
		//				  (       context,        payload)
		createPost({ commit, state }, post) {
			post.id = "ggg" + Math.random()
			post.userId = state.authId
			post.publishedAt = Math.floor(Date.now() / 1000)
			commit("setPost", { post })
			commit("appendPostToThread", { childId: post.id, parentId: post.threadId })
			const thread = findById(state.threads, post.threadId)
			if (thread.userId !== post.userId) {
				commit("appendContributorToThread", { childId: post.userId, parentId: post.threadId })
			}
		},
		async createThread({ commit, state, dispatch }, { text, title, forumId }) {
			const id = "ggg" + Math.random()
			const userId = state.authId
			const publishedAt = Math.floor(Date.now() / 1000)
			const thread = { forumId, publishedAt, title, userId, id }
			commit("setThread", { thread })
			commit("appendThreadToForum", { childId: id, parentId: forumId })
			commit("appendThreadToUser", { childId: id, parentId: userId })
			dispatch("createPost", { text, threadId: id })
			return findById(state.threads, id)
		},
		async updateThread({ commit, state }, { title, text, id }) {
			const thread = findById(state.threads, id)
			const post = findById(state.posts, thread.posts[0])
			const newThread = { ...thread, title }
			const newPost = { ...post, text }
			commit("setThread", { thread: newThread })
			commit("setPost", { post: newPost })
			return newThread
		},
		updateUser({ commit }, user) {
			commit("setUser", { user, userId: user.id })
		},
	},
	mutations: {
		setUser(state, { user, userId }) {
			const userIndex = state.users.findIndex((user) => user.id === userId)
			state.users[userIndex] = user
		},
		setPost(state, { post }) {
			upsert(state.posts, post)
		},
		setThread(state, { thread }) {
			upsert(state.threads, thread)
		},
		appendPostToThread: makeAppendChildToParentMutation({ child: "posts", parent: "threads" }),
		appendThreadToForum: makeAppendChildToParentMutation({ child: "threads", parent: "forums" }),
		appendThreadToUser: makeAppendChildToParentMutation({ child: "threads", parent: "users" }),
		appendContributorToThread: makeAppendChildToParentMutation({ child: "contributors", parent: "threads" }),
	},
})
