<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">
          {{ userPostNum(post.userId) }} posts
        </p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>

      <div class="post-date" text-faded>
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>
import {findById} from "@/helpers"

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
      return findById(this.$store.state.users, userId);
    },
    userPostNum(userId) {
      return this.$store.state.posts.filter((u) => u.userId === userId).length;
    },
  },
};
</script>

<style scoped>
</style>