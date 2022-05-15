import { defineStore } from 'pinia'
import serverCookie from 'cookie'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore('auth', {
  // other options...
  state: () => ({
    user: null,
    users: [],
  }),
  getters: {
    usersDict: (state) => {
      const res = {}
      state.users.forEach((user) => {
        res[user.id] = user
      })

      return res
    },
  },

  actions: {
    async nuxtServerInit() {
      const users = await this.$nuxt.$usersRepository.index()
      this.$patch({
        users,
      })

      console.log(this.$nuxt.req.headers.cookie)
      if (!this.$nuxt.req.headers.cookie) {
        return
      }
      console.log('assa')

      const parsedCookies = serverCookie.parse(this.$nuxt.req.headers.cookie)
      const cookieUser = parsedCookies.user
      if (cookieUser) {
        const user = users.find((el) => el.login === cookieUser)
        this.$patch({
          user,
        })
      }
    },
  },
})
