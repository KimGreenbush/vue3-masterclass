<template>
  <span :title="humanDate()">{{ diffForHumans() }}</span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localDateTime from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localDateTime);

export default {
  name: "AppDate",
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  methods: {
    diffForHumans() {
      return dayjs.unix(this.timestamp).fromNow();
    },
    humanDate() {
      return dayjs.unix(this.timestamp).format("llll");
    },
  },
};
</script>

<style scoped>
</style>