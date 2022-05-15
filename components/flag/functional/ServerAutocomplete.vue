<script>
import {
  defineComponent,
  ref,
  watch,
  computed,
  nextTick,
} from '@nuxtjs/composition-api'

import { debounce } from '@/utils/index'
export default defineComponent({
  props: {
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
    searchInput: {
      type: String,
      default: '',
    },
    graphSelect: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { attrs, emit }) {
    const isLoading = ref(false)
    const searchItems = ref([])
    const allItems = ref([])
    const search = computed(() => props.searchInput)
    const menuProps = ref({
      value: false,
    })

    const querySelections = debounce(async () => {
      isLoading.value = true
      try {
        let res = { data: [] }
        if (search.value !== '' && search.value.length > 2) {
          res = await props.repository.index({
            params: {
              [props.searchField]: search.value,
              take: 100,
              graphSelect: props.graphSelect,
            },
          })
        }

        searchItems.value = res.data
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }, 700)

    const loadAllItems = async () => {
      if (allItems.value.length > 1) {
        return
      }
      isLoading.value = true

      try {
        const { data } = await props.repository.index({
          params: { take: 1000 },
        })
        allItems.value = data
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    const onFocus = async () => {
      if (props.isLocalSearch) await loadAllItems()
      menuProps.value.value = true
      delete menuProps.value.value
    }

    const localItems = computed(() => {
      if (props.value && !allItems.value.length && !searchItems.value.length) {
        if (Array.isArray(props.value)) {
          return [...props.value]
        } else {
          return [props.value]
        }
      } else {
        if (props.isLocalSearch) return allItems.value

        return searchItems.value
      }
    })

    watch(
      () => search.value,
      () => {
        if (props.isLocalSearch) return
        if (
          search.value &&
          (!props.value || search.value !== props.value[props.itemText])
        ) {
          querySelections()
        }
        if (!search.value) {
          searchItems.value = []
        }
      }
    )
    // ONLY FOR COMBOBOX. Autocomplete don't have input listener on serverAutocomplete and v-autocomplete
    const onInput = (selectedItems) => {
      if (!props.isLocalSearch) return

      // fix broblem with create existing tag ob blure
      // if new tag exist in localItems, emit new 'input' with server tag insted new
      let isDublicateFound = false
      const normalizedSelectedItems = []
      selectedItems.forEach((selectedItem) => {
        const isNewItem = typeof selectedItem === 'string'
        if (isNewItem) {
          const serverItemAnalog = localItems.value.find(
            (el) => el.name === selectedItem
          )
          if (serverItemAnalog) {
            isDublicateFound = true
            normalizedSelectedItems.push(serverItemAnalog)
          }
        } else {
          normalizedSelectedItems.push(selectedItem)
        }
      })

      if (!isDublicateFound) return
      nextTick(() => {
        emit('input', normalizedSelectedItems)
      })
    }

    return {
      isLoading,
      localItems,
      onFocus,
      menuProps,
      onInput,
    }
  },
  render() {
    return this.$scopedSlots.default({
      isLoading: this.isLoading,
      localItems: this.localItems,
      onFocus: this.onFocus,
      menuProps: this.menuProps,
      onInput: this.onInput,
    })
  },
})
</script>
