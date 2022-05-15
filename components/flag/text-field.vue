<template>
  <v-text-field
    ref="input"
    :rules="innerRules"
    :height="height"
    v-bind="bindedAttrs"
    hide-details="auto"
    color="dark-main"
    outlined
    v-on="$listeners"
  >
    <template #prepend-inner>
      <slot name="prepend-inner" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    height: {
      type: Number,
      default: 56,
    },
    icisType: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'transparent', 'white'].includes(value)
      },
    },
    icisSize: {
      type: String,
      default: '',
      validator(value) {
        return ['lg', ''].includes(value)
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
      // because v-bind can't merge :class and v-bind classes. Only symple class="my-class"
      const classes = []
      this.icisSize && classes.push(`icis-text-field_size_${this.icisSize}`)
      this.icisType && classes.push(`icis-text-field_type_${this.icisType}`)

      let attrs = {
        solo: true,
        flat: true,
        class: classes,
        ...this.typeConfig,
        ...this.$attrs,
      }

      if (this.height) {
        attrs = {
          ...attrs,
          class: [...attrs.class, 'icis_disable-min-height'],
        }
      }
      return attrs
    },

    innerRules() {
      const rules = this.rules
      if (this.isRequired) {
        rules.push((v) => {
          return !!v || 'Заполните поле'
        })
      }
      return rules
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    validate() {
      this.$refs.input.validate()
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
.icis-text-field_type {
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

.icis-text-field_size {
  &_lg {
    ::v-deep {
      .v-label {
        font-family: 'Poppins', sans-serif;
        height: 100%;
        font-size: 32px;
        font-weight: 400;
        max-width: 100%;
      }

      input {
        padding: 0px !important;
        font-size: 32px;
        max-height: 100% !important;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
        &::placeholder {
          font-weight: 400;

          font-size: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          pointer-events: none;
        }
      }
      .v-text-field__details {
        padding: 0px;
      }
    }
  }
}
</style>
