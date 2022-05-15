<template>
  <div>
    <!-- <h1 class="form-header text-center">{{ title }}</h1> -->
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
.form-header {
  margin-bottom: 0px;
  font-size: 30px;
  @media (max-width: $flagman-md) {
    margin-bottom: 10px;
  }
}
</style>
