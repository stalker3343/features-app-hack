<template>
  <flag-dialog v-model="visible" :max-width="480">
    <div class="confirm-text mb-9" :class="textStyleType">
      {{ modalOptions.text }}
    </div>
    <div class="d-flex justify-center">
      <flag-btn
        color="dark-main"
        class="mr-3"
        large
        outlined
        @click="sendResponse(false)"
      >
        {{ modalOptions.rejectBtnText }}
      </flag-btn>
      <flag-btn large color="primary-main" @click="sendResponse(true)">
        {{ modalOptions.confirmBtnText }}
      </flag-btn>
    </div>
  </flag-dialog>
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useConfirmationModal } from './useConfirmationModal'

export default defineComponent({
  setup() {
    const { visible, modalOptions, sendResponse } = useConfirmationModal()

    const textStyleType = computed(() => {
      if (modalOptions.value.textStyleType === 'small') {
        return ['confirm-text-small', 'confirm-text_small']
      }
      return ['text-center', 'flagman-h2-bold']
    })

    return {
      visible,
      modalOptions,
      sendResponse,
      textStyleType,
    }
  },
})
</script>
<style lang="scss" scoped>
.confirm-text {
  max-width: 305px;
  margin: 0 auto;
  &_small {
    max-width: 355px;
  }
}
.confirm-text-small {
  font-size: 16px;
  line-height: 24px;
}
</style>
