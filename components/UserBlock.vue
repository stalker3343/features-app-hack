<template>
  <div class="">
    <div class="icis-body-title">
      {{ usersDict[userId].name }}
    </div>
    <div class="icis-body-caption-1 dark-grey-1--text">
      {{ fiveNumbersId }}
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'

export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    usersDict() {
      return this.store.usersDict
    },
    store() {
      return useAuthStore(this.$pinia)
    },
    fiveNumbersId() {
      switch (String(this.userId).length) {
        case 1:
          return '0000' + this.userId

        case 2:
          return '000' + this.userId

        case 3:
          return '00' + this.userId

        case 4:
          return '0' + this.userId

        default:
          return this.userId
      }
    },
  },
}
</script>

<style></style>
