<template>
  <div
    class="icis-dropdown-item"
    :class="{
      'icis-dropdown-item_disabled': disabled,
    }"
    v-on="$listeners"
  >
    <app-icon
      v-if="iconName"
      :size="20"
      :name="iconName"
      class="icis-dropdown-item__icon"
    />

    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    // for sprite svg icon only
    iconName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.icis-dropdown-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  //   padding-left: 20px;
  padding: 10px 20px;
  //padding-left: 20px;
  border-bottom: 1px solid rgba(27, 29, 33, 0.04);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--v-dark-main-base);
  &:hover {
    background-color: var(--v-dark-grey-2-base);
  }
  &:last-child {
    border-bottom: 0 solid;
  }
  &_disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: initial;
  }
}
.icis-dropdown-item__icon {
  margin-right: 8px;
  color: var(--v-primary-main-base);
}
</style>
