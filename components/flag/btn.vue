<template>
  <v-btn
    depressed
    class="acis-btn"
    v-bind="bindedAttrs"
    :outlined="outlined"
    :style="{
      color: vutifyTextColor,
      'font-weight': fontWeight,
      '--rowColor': vutifyUnderlineRowColor,
    }"
    :class="{ 'acis-btn_outlined': outlined, 'pa-0': size }"
    v-on="$listeners"
  >
    <app-icon v-if="icisIcon" :name="icisIcon" :size="20" />
    <slot />
  </v-btn>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    textColor: {
      type: String,
      default: 'dark-base',
    },
    size: {
      type: Number,
      default: 0,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    fontWeight: {
      type: Number,
      default: 600,
    },
    icisIcon: {
      type: String,
      default: null,
    },
  },
  computed: {
    vutifyTextColor() {
      return this.$vuetify.theme.themes.light[this.textColor]
    },
    vutifyUnderlineRowColor() {
      return this.$vuetify.theme.themes.light[this.$attrs.color]
    },
    sizeAttrs() {
      if (this.size)
        return {
          'min-width': this.size,
          height: this.size,
          width: this.size,
          class: 'pa-0',
        }
      return {}
    },
    bindedAttrs() {
      return {
        ...this.sizeAttrs,
        ...this.$attrs,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: initial;
  letter-spacing: unset;
  border-radius: 12px;

  &[aria-expanded='true'] {
    background-color: var(--v-primary-dark-base) !important;
    color: var(--v-dark-white-base);
  }
}
.gl-icon {
  margin-right: 5px;
}
.acis-btn_outlined {
  ::v-deep {
    .v-btn__content {
      flex: initial;
      position: relative;
      &::after {
        position: absolute;
        bottom: -3px;
        width: 100%;
        height: 1px;
        content: '';
        background-color: var(--rowColor);
      }
    }
  }
}
</style>
