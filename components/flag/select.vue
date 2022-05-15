<template>
  <v-select
    :menu-props="menuProps"
    :items="localItems"
    class="icis-select"
    :loading="loading || innerLoading"
    v-bind="bindedAttrs"
    :rules="innerRules"
    hide-details="auto"
    outlined
    item-color="#000"
    v-on="$listeners"
    @focus="onFocus"
  >
    <template v-if="$scopedSlots.selection" #selection="scope">
      <slot name="selection" v-bind="scope" />
    </template>
    <template v-if="$scopedSlots.item" #item="scope">
      <slot name="item" v-bind="scope" />
    </template>
  </v-select>
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
    items: {
      type: Array,
      default: () => [],
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    repository: {
      default: null,
      type: Object,
    },
    isServerItemsLoad: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadedItems: [],
      isItemsLoaded: false,
      innerLoading: false,
      menuProps: {
        value: false,
      },
    }
  },
  computed: {
    typeConfig() {
      const conf = {
        default: {
          // 'background-color': 'dark-grey-3',
          color: 'dark-main',
        },
        transparent: {
          'background-color': 'transparent',
          class: 'icis-select__transparent',
        },
        white: {
          // 'background-color': 'dark-white',
          class: 'icis-select__white',
        },
      }
      return conf[this.icisType]
    },

    bindedAttrs() {
      let attrs = {
        solo: true,
        flat: true,
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

          // class: [attrs.class, 'icis_disable-min-height'],
        }
      }

      return attrs
    },
    /*
    Если есть value но нет item, то сетим в item это значение. 
    */
    localItems() {
      if (this.$attrs.value && !this.items.length && !this.loadedItems.length) {
        if (Array.isArray(this.$attrs.value)) {
          return [...this.$attrs.value]
        } else {
          return [this.$attrs.value]
        }
      } else {
        return this.isServerItemsLoad ? this.loadedItems : this.items
      }
    },

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
  },
  created() {
    if ('multiple' in this.$attrs && this.$attrs.height) {
      console.error(
        'Вы задали фиксированную высоту для Autocomplete при множественном выборе. Это плохо скажется на UI'
      )
    }
  },
  methods: {
    async loadAllItems() {
      if (this.isItemsLoaded) {
        return
      }
      this.innerLoading = true

      try {
        const { data } = await this.repository.index({
          params: { take: 1000 },
        })
        this.loadedItems = data
        this.isItemsLoaded = true
      } catch (error) {
        console.error(error)
      } finally {
        this.innerLoading = false
      }
    },
    async onFocus() {
      if (this.isServerItemsLoad) await this.loadAllItems()
      this.menuProps.value = true
      delete this.menuProps.value
    },
  },
}
</script>

<style lang="scss" scoped>
.icis-select {
  &__transparent {
    border: none;
    ::v-deep {
      .v-input__slot {
        padding: 0px !important;
        margin-bottom: 0px;
        border: none !important;
      }
      .v-text-field__details {
        padding: 0px;
        margin: 0px;
      }
    }
  }
}

::v-deep {
  .v-input__slot {
    border: 1px solid var(--v-dark-grey-2-base) !important;

    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
  .v-select__selections {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: var(--v-dark-main-base) !important;
  }
}
</style>
