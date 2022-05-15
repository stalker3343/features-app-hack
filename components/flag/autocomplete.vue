<template>
  <server-autocomplete
    :graph-select="graphSelect"
    :item-text="itemText"
    :value="value"
    :repository="repository"
    :is-local-search="isLocalSearch"
    :search-field="searchField"
    :search-input="search"
  >
    <template #default="{ isLoading, localItems, onFocus, menuProps }">
      <server-autocompplete-ui
        :is-required="isRequired"
        :rules="rules"
        v-bind="$attrs"
        :icis-type="icisType"
      >
        <template #default="{ bindedAttrs }">
          <v-autocomplete
            :menu-props="menuProps"
            :items="localItems"
            :search-input.sync="search"
            :loading="isLoading"
            :item-text="itemText"
            hide-details="auto"
            return-object
            :value="value"
            v-bind="bindedAttrs"
            no-data-text="Нет данных"
            :icis-type="icisType"
            v-on="$listeners"
            @focus="onFocus"
            @input="onAutocompleteInput"
          >
            <template #no-data>
              <div class="px-3">
                <slot :search="search" :loading="isLoading" name="no-data" />
              </div>
            </template>
            <template #prepend-inner>
              <slot name="prepend-inner" />
            </template>
            <template v-if="$scopedSlots.selection" #selection="scope">
              <slot name="selection" v-bind="scope" />
            </template>
            <template v-if="$scopedSlots.item" #item="scope">
              <slot name="item" v-bind="scope" />
            </template>
          </v-autocomplete>
        </template>
      </server-autocompplete-ui>
    </template>
  </server-autocomplete>
</template>

<script>
/*
  TODO устранить повторение кода в autocomplete и combobox
 */
import { defineComponent, ref } from '@nuxtjs/composition-api'

import ServerAutocomplete from './functional/ServerAutocomplete.vue'
import ServerAutocomppleteUi from './functional/ServerAutocomppleteUi.vue'
export default defineComponent({
  components: {
    ServerAutocomplete,
    ServerAutocomppleteUi,
  },
  inheritAttrs: false,
  props: {
    icisType: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'transparent', 'white'].includes(value)
      },
    },
    repository: {
      required: true,
      type: Object,
    },
    isLocalSearch: {
      type: Boolean,
      default: false,
    },
    searchField: {
      type: String,
      default: 'search',
    },
    value: {
      type: [Object, Array],
      default: () => null,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    graphSelect: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const search = ref('')
    const onAutocompleteInput = (vall) => {
      search.value = ''
      emit('input', vall)
    }
    return {
      search,
      onAutocompleteInput,
    }
  },
})
</script>
