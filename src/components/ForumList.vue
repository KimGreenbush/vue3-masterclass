<template>
  <div class="forum-list col-full">
    <h2 class="list-title">
      <router-link
        v-if="categoryId"
        :to="{ name: 'Category', params: { id: categoryId } }"
      >{{ title }}</router-link>
      <span v-else>{{ title }}</span>
    </h2>

    <div class="forum-listing" v-for="forum in forums" :key="forum.id">
      <div class="forum-details">
        <router-link
          class="text-xlarge"
          :to="{ name: 'Forum', params: { id: forum.id } }"
        >{{ forum.name }}</router-link>
        <p>{{ forum.description }}</p>
      </div>

      <div class="threads-count">
        <p>
          <span class="count">{{ forum.threads?.length || 0 }}</span>
          {{ forum.threads?.length == 1 ? "thread" : "threads" }}
        </p>
      </div>

      <div class="last-thread">
        <img
          class="avatar"
          src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg"
          alt
        />
        <div class="last-thread-details"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "Forums",
    },
    categoryId: {
      required: false,
      type: String,
    },
  },
};
</script>

<style scoped>
</style>