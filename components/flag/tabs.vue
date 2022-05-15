<template>
  <v-tabs
    :height="vertical ? 'auto' : 34"
    :vertical="vertical"
    :show-arrows="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-tab
      v-for="(tab, idx) in tabs"
      :key="idx"
      class="icis-tab"
      :class="{ 'icis-tab_vertical': vertical }"
      :ripple="false"
    >
      <template v-if="typeof tab === 'object'">
        <app-icon v-if="tab.icon" :size="18" :name="tab.icon" class="icon" />
        <span>{{ tab.label }}</span>
      </template>
      <span v-else>{{ tab }}</span>
      <slot :name="'tab-' + idx" />
    </v-tab>
    <slot />
  </v-tabs>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'change',
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    vertical: {
      type: Boolean,
      dafault: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icis-tab_vertical {
  justify-content: flex-start;
}
::v-deep {
  .v-slide-group__prev {
    display: none !important;
  }
  .v-tab {
    padding: 0 13px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-transform: none;
    color: var(--v-dark-main-base) !important;
    letter-spacing: initial;
    &.v-tab--active {
      color: var(--v-primary-main-base) !important;
    }
    &.icis-tab_vertical {
      padding: 0 32px;
      &.v-tab--active {
        background-color: var(--v-primary-opacity-5-base);
      }
    }
  }
  // TODO
  // .v-tabs-bar {
  //   height: 34px;
  // }

  .v-tabs--vertical > .v-tabs-bar {
    height: auto;
  }
  .icon {
    margin-right: 4px;
  }
}
</style>
