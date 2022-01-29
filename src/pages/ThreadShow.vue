<template>
  <div class="col-large push-top">
    <router-link :to="{ name: 'Forum', params: { id: thread.forumId } }" tag="button">Back to Forum</router-link>
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
        class="btn-green btn-small"
        tag="button"
      >Edit Thread</router-link>
    </h1>

    <p>
      By
      <a href="#" class="link-unstyled">{{ thread.author?.name }}</a>,
      <AppDate :timestamp="thread.publishedAt" />
      <span style="float: right; margin-top: 2px" class="hide-mobile text-faded text-small">
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
  async created() {
    // fetch firebase data
    const thread = await this.$store.dispatch("fetchThread", { id: this.id });

    // thread users
    this.$store.dispatch("fetchUser", { id: thread.userId })

    // thread posts
    thread.posts.forEach(async (postId) => {
      const post = await this.$store.dispatch("fetchPost", { id: postId })
      this.$store.dispatch("fetchUser", { id: post.userId })
    });
  },
};
</script>

<style scoped></style>
