import { events } from './events'

export default function (ctx, inject) {
  const notify = {
    success(params) {
      events.$emit('add', {
        ...params,
        config: {
          ...params.config,
          color: 'primary-light',
        },
      })
    },
    error(params) {
      events.$emit('add', {
        ...params,
        config: {
          ...params.config,
          color: 'accent-02-dark',
        },
      })
    },
    info(params) {
      events.$emit('add', {
        ...params,
        config: {
          ...params.config,
          color: 'accent-01-main',
        },
      })
    },
  }
  inject('notify', notify)
}
