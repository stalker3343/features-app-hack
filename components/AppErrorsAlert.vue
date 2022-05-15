<template>
  <v-alert type="error" class="mb-2">
    <div v-for="(error, idx) in errors" :key="idx" class="mb-1">
      {{ error }}
    </div>
  </v-alert>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.$emit('mounted')
  },
}
</script>

<style></style>
