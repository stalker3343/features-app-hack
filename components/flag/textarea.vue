<template>
  <v-textarea
    ref="input"
    :rules="innerRules"
    :class="{
      [`icis-textarea_type_${icisType}`]: icisType,
    }"
    hide-details="auto"
    color="dark-main"
    v-bind="bindedAttrs"
    outlined
    v-on="$listeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icisType: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'transparent', 'white'].includes(value)
      },
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    typeConfig() {
      const conf = {
        default: {
          // 'background-color': 'dark-grey-3',
        },
        transparent: {
          // 'background-color': 'transparent',
        },
        white: {
          // 'background-color': 'dark-white',
        },
      }
      return conf[this.icisType]
    },
    bindedAttrs() {
      return {
        solo: true,
        flat: true,
        ...this.typeConfig,
        ...this.$attrs,
      }
    },

    innerRules() {
      const rules = this.rules
      if (this.isRequired) {
        rules.push((v) => !!v || 'Заполните поле')
      }
      return rules
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-text-field__details {
    margin: 0px !important;
    padding: 0px !important;
  }
  .v-input__slot {
    border: 1px solid var(--v-dark-grey-2-base) !important;
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
}

.icis-textarea_type {
  &_transparent {
    ::v-deep {
      .v-input__slot {
        padding: 0px !important;
        margin-bottom: 0px;
        border: none !important;
      }
      .v-input__control {
        min-height: initial;
      }
    }
  }
}
</style>
