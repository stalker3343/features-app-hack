<template>
  <v-dialog
    ref="modalRef"
    persistent
    content-class="icis-dialog-content"
    v-bind="$attrs"
    :max-width="maxWidth"
    transition="dialog-bottom-transition"
    v-on="$listeners"
  >
    <div v-if="$attrs.value" class="dark-white py-7">
      <div class="dialog-header">
        <slot name="header" />
        <v-btn v-if="closable" icon class="close-btn" @click="closeModal">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </div>

      <slot />
    </div>

    <!-- TODO add activator if needed 
     Help: https://gitlab.com/gitlab-org/gitlab-ui/-/blob/master/src/components/base/modal/modal.vue
    -->
    <!-- <slot slot="activator" :activator="{ on, attrs }" name="activator" /> -->
  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseModal',
  inheritAttrs: false,
  props: {
    maxWidth: {
      type: Number,
      default: 700,
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
    const modalRef = ref()
    const closeModal = () => {
      modalRef.value.onClickOutside()
      emit('input', false)
    }

    return { closeModal, modalRef }
  },
  watch: {
    '$attrs.value'() {
      this.$attrs.value ? this.$emit('open-modal') : this.$emit('close-modal')
    },
  },
})
</script>

<style scoped lang="scss">
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.dialog-header {
  @include flex(row, flex-end, center);
}
</style>

<style>
.icis-dialog-content {
  position: relative;
}
</style>
