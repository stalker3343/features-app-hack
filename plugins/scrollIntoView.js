import Vue from 'vue'
export default function (ctx, inject) {
  const scrollIntoView = (el) => {
    Vue.nextTick(() => {
      window.requestIdleCallback(() => {
        if (el) {
          el.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          })
        } else {
          console.warn('[$scrollIntoView] Елемент не был найден')
        }
      })
    })
  }

  inject('scrollIntoView', scrollIntoView)
}
