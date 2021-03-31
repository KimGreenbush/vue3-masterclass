<template>
  <div class="profile-card">
    <p class="text-center">
      <img
        :src="user.avatar"
        alt="`{user.name} profile picture`"
        class="avatar-xlarge"
      />
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead">{{ user.name }}</p>

    <p class="text-justify">{{ user.bio || "No bio specified" }}</p>

    <span class="online">{{ user.username }} is Online.</span>

    <div class="stats">
      <span>{{ userPostsCount }} posts</span>
      <span>{{ userThreadsCount }} threads</span>
    </div>

    <hr />

    <p v-if="user.website" class="text-large text-center">
      <i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a>
    </p>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "UserProfileCard",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({ user: "authUser"})
  },
};
</script>

<style scoped>
</style>