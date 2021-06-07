<template>
  <div class="col-large push-top">
    <router-link :to="{ name: 'Forum', params: { id: thread.forumId } }"
    tag="button">
      Back to Forum
    </router-link>
    <h1>
      {{ thread.title }}

    <router-link
    :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
    class="btn-green btn-small"
    tag="button">
      Edit Thread
    </router-link>

    </h1>


    <PostList :posts="threadPosts" />
    <PostEditor @save="addPost" />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";

export default {
  name: "ThreadShow",
  components: {
    PostList,
    PostEditor,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    threads() {
      return this.$store.state.threads;
    },
    posts() {
      return this.$store.state.posts;
    },
    thread() {
      return this.threads.find((thread) => thread.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
  methods: {
    addPost(eventData) {
      const post = { ...eventData.post, threadId: this.id };
      this.$store.dispatch("createPost", post);
    },
  },
};
</script>

<style scoped>
</style>