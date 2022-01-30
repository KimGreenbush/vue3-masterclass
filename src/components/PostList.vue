<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div v-if="userById(post.userId)" class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>

        <a href="#">
          <img class="avatar-large" :src="userById(post.userId).avatar" alt />
        </a>

        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }}
          {{ userById(post.userId).postsCount == 1 ? "post" : "posts" }}
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }}
          {{ userById(post.userId).threadsCount == 1 ? "thread" : "threads" }}
        </p>
      </div>

      <div class="post-content">
        <div>
          <p>{{ post.text }}</p>
        </div>
      </div>

      <div class="post-date" text-faded>
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    posts: {
      required: true,
      type: Array,
    },
  },
  methods: {
    userById(userId) {
      return this.$store.getters.user(userId);
    },
  },
};
</script>

<style scoped>
</style>