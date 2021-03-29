<template>
  <div class="col-full">
    <form @submit.prevent="save">
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
export default {
  name: "PostEditor",
  data() {
    return {
      newPostText: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: "Miej9zSGMRZKDvMXzfxjVOyv3RF3",
      };
      this.$emit("save", { post }); // accessible object with kv pair: eventData.post
      this.newPostText = "";
    },
  },
};
</script>

<style scoped>
</style>