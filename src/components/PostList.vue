<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="user-info">
        <a href="#" class="user-name">{{
          userById(post.userId).name
        }}</a>

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

      <div class="post-date text-faded" :title="humanDate(post.publishedAt)">
        {{ diffForHumans(post.publishedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import localDateTime from "dayjs/plugin/localizedFormat"
dayjs.extend(relativeTime)
dayjs.extend(localDateTime)

export default {
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      users: sourceData.users,
    };
  },
  methods: {
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
    userPostNum(userId) {
      return sourceData.posts.filter(u => u.userId === userId).length
    },
    diffForHumans(timestamp) {
      return dayjs.unix(timestamp).fromNow()
    },
    humanDate(timestamp) {
      return dayjs.unix(timestamp).format("llll")
    },
  },
};
</script>

<style scoped>
</style>