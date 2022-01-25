<template>
  <div class="col-large push-top">
    <router-link
      :to="{ name: 'Forum', params: { id: thread.forumId } }"
      tag="button"
    >
      Back to Forum
    </router-link>
    <h1>
      {{ thread.title }}

      <router-link
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" />
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
      >
        {{ thread.repliesCount }}
        {{ thread.repliesCount == 1 ? "reply" : "replies" }} by
        {{ thread.contributorsCount }}
        {{ thread.contributorsCount == 1 ? "contributor" : "contributors" }}
      </span>
    </p>

    <PostList :posts="threadPosts" />
    <PostEditor @save="addPost" />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
import { firestore } from "@/main";
import { doc, onSnapshot } from "firebase/firestore";

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
    thread() {
      return this.$store.getters.thread(this.id);
    },
    threadPosts() {
      return this.$store.state.posts.filter(
        (post) => post.threadId === this.id
      );
    },
  },
  methods: {
    addPost(eventData) {
      const post = { ...eventData.post, threadId: this.id };
      this.$store.dispatch("createPost", post);
    },
  },
  created() {
    // fetch firebase data
    // thread
    onSnapshot(doc(firestore, "threads", this.id), (doc) => {
      const thread = { ...doc.data(), id: doc.id };
      this.$store.commit("setThread", { thread });

      // thread users
      onSnapshot(doc(firestore, "users", thread.userId), (doc) => {
        const user = { ...doc.data(), id: doc.id };
        this.$store.commit("setUser", { user });
      });

      // thread posts
      thread.posts.forEach((postId) => {
        onSnapshot(doc(firestore, "posts", postId), (doc) => {
          const post = { ...doc.data(), id: doc.id };
          this.$store.commit("setPost", { post });

          // thread posts users
          onSnapshot(doc(firestore, "users", post.userId), (doc) => {
            const user = { ...doc.data(), id: doc.id };
            this.$store.commit("setUser", { user });
          });
        });
      });
    });
  },
};
</script>

<style scoped></style>
