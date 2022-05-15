<template>
  <v-bottom-sheet
    :value="value"
    :persistent="persistent"
    class="hehehe"
    content-class="icis-right-sheet"
    v-bind="$attrs"
    :width="width"
    transition="app-sider-transition"
    @keydown="onKeyDown"
    v-on="$listeners"
    @click:outside="onClickOutside"
  >
    <div class="sider__close" @click="onCloseBtnClick">
      <!-- <app-icon :size="25" name="Close" /> -->
      <v-icon> mdi-close </v-icon>
    </div>
    <div v-if="showBackBtn" class="sider__back" @click="$emit('back')">
      <app-icon :size="25" name="Arrow-left" />
    </div>

    <div class="dark-white icis-right-sheet__inner">
      <slot />
    </div>
  </v-bottom-sheet>
</template>

<script>
/*
Для организации закрытия после решения юзера, вешаем на компонент  isConfirmClose и слушаем try-close. 
если клиент согласен isCreateShowed = true иначе ничего
<icis-right-sheet
      v-model="isCreateShowed"
      :isConfirmClose="true"
      @try-close="onTryCloseCreateLead"
    >
*/
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  inheritAttrs: true,
  props: {
    isConfirmClose: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: '50%',
    },
    showBackBtn: {
      type: Boolean,
      default: false,
    },
  },
  // watch: {
  //   value() {
  //     const html = document.querySelector('html')
  //     if (this.value) {
  //       html.classList.add('fixed-body')
  //     } else {
  //       html.classList.remove('fixed-body')
  //     }
  //   },
  // },
  // beforeDestroy() {
  //   const html = document.querySelector('html')
  //   html.classList.remove('fixed-body')
  // },
  methods: {
    onKeyDown(e) {
      if (e.key === 'Escape') {
        this.isConfirmClose && this.$emit('try-close')
      }
    },
    onCloseBtnClick() {
      if (!this.isConfirmClose) {
        this.$emit('input', false)
      }
      this.isConfirmClose && this.$emit('try-close')
    },
    onClickOutside() {
      this.isConfirmClose && this.$emit('try-close')
    },
  },
})
</script>

<style lang="scss" scoped>
.icis-right-sheet__inner {
  position: relative;
  overflow-y: auto !important;
  height: 100%;
}
.sider__close {
  cursor: pointer;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 8px;
  left: -40px;
  background-color: var(--v-dark-white-base);
  border-radius: 12px;
  @include flex(row, center, center);
}
.sider__back {
  cursor: pointer;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 46px;
  left: -40px;
  background-color: var(--v-dark-white-base);
  border-radius: 12px;
  @include flex(row, center, center);
}
</style>
<style lang="scss">
.icis-right-sheet {
  position: relative;
  // overflow-y: auto !important;
  align-self: flex-start !important;
  margin-left: auto !important;
  max-height: 100% !important;
  height: 100% !important;
  .btns-wrapper {
    position: fixed !important;
    width: 100%;
  }
}
</style>
<style>
.fixed-body {
  overflow: hidden !important;
  position: fixed;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
