<template>
  <v-input :rules="innerRules" hide-details="auto" :value="innerValue">
    <input
      ref="input"
      v-model.lazy="innerValue"
      type="text"
      class="mascable-input"
      v-bind="$attrs"
      @change="$emit('change', innerValue)"
      @focus="onFocus"
    />
  </v-input>
</template>
<script>
export default {
  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      required: true,
    },

    maskOptions: {
      type: Object,
      default: () => ({}),
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },

    // если вдруг над будет нормить сначение снаружитто пробросим эту функцию сюда и
    // в watch перед сравнение тоже надо нормализовывать
    // normalizedFunction: {
    // 	type: Function,
    // 	default: null,
    // },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  computed: {
    innerRules() {
      const rules = this.rules
      if (this.isRequired) {
        rules.push((v) => !!v || 'Заполните поле')
      }
      return rules
    },
  },
  mounted() {
    import('inputmask').then((obg) => {
      const Inputmask = obg.default
      new Inputmask({
        placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        // fix mask issue on paste
        // https://github.com/RobinHerbots/Inputmask/issues/1677#event-1338623502
        // isComplete: (buffer, opts) => {
        //   // console.log(buffer)
        //   this.innerValue = buffer.join('')
        //   this.$emit('input', this.innerValue)
        // },
        ...this.maskOptions,
      }).mask(this.$refs.input)
      // console.log(this.value, 'пРИшло this.value')
      // if (this.value !== '') {
      // console.log('Вызвалось setValue')
      Inputmask.setValue(this.$refs.input, this.value)
      this.innerValue = this.$refs.input.value

      this.$emit('input', this.innerValue) // если там было дерьмо какое-то то мы заэмитим нормальное
      // console.log(this.innerValue, 'ушло this.innerValue')
      // }

      // Не всегда ипморт успевает закончится когда вызывается watch
      this.$watch('value', function () {
        if (this.innerValue != this.value) {
          // BUG. if this.value i zero , this.$refs.input.value return 1 in rank filters
          if (this.value === 0) {
            this.innerValue = 0
          } else {
            Inputmask.setValue(this.$refs.input, this.value)
            this.innerValue = this.$refs.input.value
          }

          this.$emit('input', this.innerValue)
        }
      })
      //   костыль т.к. маска убивает @blur на input
      this.$refs.input.addEventListener('blur', () => {
        this.$emit('blur')
      })
      this.$refs.input.addEventListener('change', (e) => {
        this.changeHandler(e)
      })
    })
  },

  methods: {
    onFocus() {
      this.$emit('focus')
    },
    changeHandler(e) {
      // console.log('вызывался change', e.target.value)
      this.$emit('input', this.innerValue)
      // const unmaskValue = this.$refs.input.inputmask.unmaskedvalue()
      // console.log(this.value, unmaskValue, 'inputHandler')
      // console.log(e.target.value, 'changeHandler e.target.value')
      // console.log(this.innerValue, 'changeHandler innerValue')
      // this.$emit('input', this.innerValue)
    },
  },
}
</script>
<style lang="scss" scoped>
.mascable-input {
  width: 100%;
}
</style>
