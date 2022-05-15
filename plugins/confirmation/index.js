import { useConfirmationModal } from './useConfirmationModal'

export default function (ctx, inject) {
  const { confirm } = useConfirmationModal()

  inject('confirm', confirm)
}
