<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  inheritAttrs: false,
  props: {
    icisType: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'transparent', 'white'].includes(value)
      },
    },
    rules: {
      type: Array,
      default: () => [],
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    innerRules() {
      const rules = this.rules
      if (this.isRequired) {
        const validateFn = (value) => {
          if (!value) return 'Заполните поле'
          if ('multiple' in this.$attrs && value.length === 0)
            return 'Заполните поле'
          return true
        }

        rules.push(validateFn)
      }
      return rules
    },

    bindedAttrs() {
      let attrs = {
        solo: true,
        flat: true,
        rules: this.innerRules,
        ...this.typeConfig,
        ...this.$attrs,
      }
      if (this.$attrs.height) {
        attrs = {
          ...attrs,
          class: [attrs.class, 'icis_disable-min-height'],
        }
      }
      if (this.$attrs['min-height']) {
        attrs = {
          ...attrs,
          style: {
            ...attrs.style,
            minHeight: this.$attrs['min-height'] + 'px',
          },
          class: [attrs.class, 'icis_min-height-inherit'],
        }
      }
      return attrs
    },

    typeConfig() {
      const conf = {
        default: {
          'background-color': 'dark-grey-3',
        },
        transparent: {
          'background-color': 'transparent',
          class: 'icis-autocomplete_type_transparent',
        },
        white: {
          'background-color': 'dark-white',
          class: 'icis-autocomplete_type_white',
        },
      }
      return conf[this.icisType]
    },
  },
  created() {
    if (
      'multiple' in this.$attrs &&
      this.$attrs.height &&
      this.$attrs.height !== 'auto'
    ) {
      console.error(
        'Вы задали фиксированную высоту для Autocomplete при множественном выборе. Это плохо скажется на UI'
      )
    }
  },
  render() {
    return this.$scopedSlots.default({
      bindedAttrs: this.bindedAttrs,
    })
  },
})
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
.icis-autocomplete_type {
  &_transparent {
    border: none !important;
    ::v-deep {
      .v-input__slot {
        padding: 0px !important;
        border: none !important;

        margin-bottom: 0px;
      }
      .v-input__control {
        min-height: initial;
      }
      .v-text-field__details {
        padding: 0px;
        margin: 0px;
      }
    }
  }
  &_white {
    border: 1px solid var(--v-dark-grey-2-base);
  }
}
</style>
