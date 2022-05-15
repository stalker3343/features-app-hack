<template>
  <v-bottom-sheet
    :value="value"
    :persistent="persistent"
    content-class="icis-right-sheet"
    v-bind="$attrs"
    :width="width"
    transition="app-sider-transition"
    @keydown="onKeyDown"
    v-on="$listeners"
    @click:outside="onClickOutside"
  >
    <template v-if="!isMobile">
      <div class="sider-close-desktop" @click="onCloseBtnClick">
        <app-icon :size="25" name="Close" />
      </div>
      <div v-if="showBackBtn" class="sider-back" @click="$emit('back')">
        <app-icon :size="25" name="Arrow-left" />
      </div>
    </template>

    <div class="dark-white icis-right-sheet__inner">
      <div v-if="isMobile" class="mobile-sheet-header">
        <div>
          <div
            v-if="showBackBtn"
            class="sider-back-mobile"
            @click="$emit('back')"
          >
            <app-icon :size="30" name="Arrow-left" />
          </div>
          <slot name="header" />
        </div>

        <div class="sider-close-mobile" @click="onCloseBtnClick">
          <!-- <app-icon :size="40" name="Close" /> -->
          <v-icon size="40">mdi-close</v-icon>
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div class="sheet-sticky-bottom">
      <slot name="bottom" />
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
    isMobile: {
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
.sheet-sticky-bottom {
  // position: sticky;
  // bottom: 0px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
}

.mobile-sheet-header {
  display: flex;
  padding: 10px 14px;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 2;
  // justify-content: space-between;
}
.sider-back {
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
.sider-back-mobile {
}
.sider-close-mobile {
  margin-left: auto;
}
.icis-right-sheet__inner {
  position: relative;
  overflow-y: auto !important;
  height: 100%;
  padding-bottom: 100px;
}
.icis-right-sheet__wrapper {
  position: relative;
}
.sider-close-desktop {
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: -40px;
  width: 32px;
  height: 32px;
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
