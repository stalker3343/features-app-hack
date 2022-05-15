export default ($axios) => (resource) => ({
  index(params) {
    return $axios.$get(`${resource}`, params)
  },

  show(id, params) {
    return $axios.$get(`${resource}${id}/`, params)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$put(`${resource}${id}/`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}${id}/`)
  },
  bulk(payload) {
    return $axios.$put(`${resource}/bulk`, payload)
  },
})
