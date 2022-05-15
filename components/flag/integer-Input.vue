<template>
  <icis-maskable-input
    inputmode="decimal"
    v-bind="$attrs"
    :mask-options="maskOptions"
    v-on="$listeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    // если значение input 0 или пустая строка то маски не будет
    // по дефолту маски нет если значение 0 или пустая строка
    showMaskOnEmtyInput: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maskOptions: {
        alias: 'integer',
        prefix: '',
        placeholder: '0',
        rightAlign: false,
        autoUnmask: true,
        unmaskAsNumber: true,
        digitsOptional: false,
        allowMinus: false,
        // Самая важна строка не показывать маску когда нет значения
        // заставяет setValue в маске преобразовавать 0 в ""
        clearMaskOnLostFocus: !this.showMaskOnEmtyInput,
      },
    }
  },
  computed: {
    localListeners() {
      return {
        ...this.$listeners,
        input: (value) => {
          this.$emit('input', value)
        },
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss"></style>
