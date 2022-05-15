import { ref } from '@nuxtjs/composition-api'
const defaultValues = () => ({
  text: 'Are you sure?',
  confirmBtnText: 'Подтвердить',
  rejectBtnText: 'Отмена',
  textStyleType: '',
})
const mergeOptins = (oldOption, newOptions) => {
  if (!newOptions) return { ...oldOption }
  return { ...oldOption, ...newOptions }
}
const visible = ref(false)
let resolveFn = () => ({})
const modalOptions = ref(defaultValues())

export function useConfirmationModal() {
  const confirm = (newModalOptions) => {
    visible.value = true
    modalOptions.value = mergeOptins(defaultValues(), newModalOptions)

    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }

  const sendResponse = (value) => {
    visible.value = false
    resolveFn(value)
  }

  return {
    visible,
    modalOptions,
    confirm,
    sendResponse,
  }
}
