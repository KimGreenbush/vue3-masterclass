<template>
  <div class="col-large push-top">
    <router-link :to="{ name: 'Home' }">Back to Threads</router-link>
    <h1>{{ thread.title }}</h1>

    <PostList :posts="threadPosts" />

    <form @submit.prevent="addPost">
      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          class="form-input"
          name="content"
          v-model="newPostText"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">
          Publish
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import PostList from "@/components/PostList";

export default {
  name: "ThreadShow",
  components: {
    PostList,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      newPostText: ""
    };
  },
  computed: {
    thread() {
      return this.threads.find((thread) => thread.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    }
  },
  methods: {
    addPost() {
      const postId = "ggg" + Math.random()
      const post = {
        id: postId,
        text: this.newPostText,
        publishedAt: Math.floor(Date.now()/1000),
        threadId: this.id,
        userId: "Miej9zSGMRZKDvMXzfxjVOyv3RF3"
      }
    this.posts.push(post)
    this.thread.posts.push(postId)
    this.newPostText = ""
    },
  }
};
</script>

<style scoped>
</style>