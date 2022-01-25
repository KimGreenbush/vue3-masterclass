<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard v-if="!edit && authUser" :user="authUser" />
        <!-- <UserProfileCard v-else-if="!edit && !authUser" :user="user" /> -->
        <UserProfileCardEditor v-else :user="authUser" />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ authUser.username || user.username }}'s recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <PostList v-if="authUser" :posts="authUser.posts" />
        <!-- <PostList v-else :posts="user.posts" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList"
import UserProfileCard from "@/components/UserProfileCard"
import UserProfileCardEditor from "@/components/UserProfileCardEditor"
import { mapGetters } from "vuex"

export default {
  name: "Profile",
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ authUser: "authUser" }),
    //...mapGetters({ user: "user" }),
  },
}
</script>

<style>
</style>