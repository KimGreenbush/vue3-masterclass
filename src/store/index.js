import { createStore } from "vuex"
import { findById, upsert } from "@/helpers"
import { firestore } from "@/main"
import { doc, onSnapshot } from "firebase/firestore"

const makeAppendChildToParentMutation = ({ child, parent }) => {
	return (state, { childId, parentId }) => {
		const resource = findById(state[parent], parentId)
		resource[child] = resource[child] || []
		if (child === "posts") {
			resource.lastPostId = childId
			resource.lastPostAt = findById(state[child], childId).publishedAt
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
		categories: [],
		forums: [],
		threads: [],
		posts: [],
		users: [],
		authId: "Miej9zSGMRZKDvMXzfxjVOyv3RF3",
	},
	getters: {
		authUser: (state, getters) => {
			return getters.user(state.authId)
		},
		user: (state) => {
			return (id) => {
				const user = findById(state.users, id)
				if (!user) return null
				return {
					...user,
					// "get" keyword makes the functions accessible as properties
					// think C# {get;}
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
			post.id = "nsg" + Math.random()
			post.userId = state.authId
			post.publishedAt = Math.floor(Date.now() / 1000)
			commit("setItem", { resource: "posts", item: post })
			commit("appendPostToThread", { childId: post.id, parentId: post.threadId })
			commit("appendContributorToThread", { childId: post.userId, parentId: post.threadId })
		},
		async createThread({ commit, state, dispatch }, { text, title, forumId }) {
			const id = "ggg" + Math.random()
			const userId = state.authId
			const publishedAt = Math.floor(Date.now() / 1000)
			const thread = { forumId, publishedAt, title, userId, id }
			commit("setItem", { resource: "threads", item: thread })
			commit("appendThreadToUser", { childId: id, parentId: userId })
			commit("appendThreadToForum", { childId: id, parentId: forumId })
			dispatch("createPost", { text, threadId: id })
			return findById(state.threads, id)
		},
		async updateThread({ commit, state }, { title, text, id }) {
			const thread = findById(state.threads, id)
			const post = findById(state.posts, thread.posts[0])
			const newThread = { ...thread, title }
			const newPost = { ...post, text }
			commit("setItem", { resource: "threads", item: newThread })
			commit("setItem", { resource: "posts", item: newPost })
			return newThread
		},
		updateUser({ commit }, user) {
			commit("setItem", { resource: "users", item: user })
		},
		fetchForum({ dispatch }, { id }) {
			return dispatch("fetchItem", { resource: "forums", id })
		},
		fetchThread({ dispatch }, { id }) {
			return dispatch("fetchItem", { resource: "threads", id })
		},
		fetchUser({ dispatch }, { id }) {
			return dispatch("fetchItem", { resource: "users", id })
		},
		fetchPost({ dispatch }, { id }) {
			return dispatch("fetchItem", { resource: "posts", id })
		},
		fetchItem({ commit }, { resource, id }) {
			return new Promise((resolve) => {
				onSnapshot(doc(firestore, resource, id), (doc) => {
					const item = { ...doc.data(), id: doc.id }
					commit("setItem", { resource, item })
					resolve(item)
				})
			})
		},
	},
	mutations: {
		setItem(state, { resource, item }) {
			upsert(state[resource], item)
		},
		appendPostToThread: makeAppendChildToParentMutation({ child: "posts", parent: "threads" }),
		appendThreadToForum: makeAppendChildToParentMutation({ child: "threads", parent: "forums" }),
		appendThreadToUser: makeAppendChildToParentMutation({ child: "threads", parent: "users" }),
		appendContributorToThread: makeAppendChildToParentMutation({ child: "contributors", parent: "threads" }),
	},
})
