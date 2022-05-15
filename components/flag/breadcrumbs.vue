<template>
  <v-breadcrumbs class="pa-0" v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-breadcrumbs>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-breadcrumbs__divider {
    padding: 0px 6px !important;
  }
  .v-breadcrumbs__item {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    &.v-breadcrumbs__item--disabled {
      font-weight: 500;
    }
    // color: var(--v-dark-grey-base);
  }

  li:nth-child(1) {
    .v-breadcrumbs__item {
      color: rgba(27, 29, 33, 0.7);
      font-weight: 600;
    }
  }
}

.v-breadcrumbs__item--disabled {
  color: red;
}
</style>
