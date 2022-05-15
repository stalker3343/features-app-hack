<template>
  <login-register-form-wrapper title="Вход">
    <div class="mx-auto">
      <v-form ref="form" @submit.prevent="login">
        <flag-text-field
          ref="emailInput"
          v-model="form.username"
          name="username"
          autocomplete="on"
          class="form-field"
          placeholder="Логин"
          label="Логин"
        />

        <flag-text-field
          v-model="form.password"
          :error-messages="[...passswordErrors]"
          class="form-field"
          placeholder="Пароль"
          autocomplete="on"
          label="Пароль"
          name="password"
          type="password"
        />

        <flag-btn
          :loading="loading"
          type="submit"
          :height="56"
          color="primary-main"
          block
        >
          Войти
        </flag-btn>
        <!-- <div class="d-flex justify-center align-center mt-4">
          <div class="mr-2">Забыли пароль?</div>
          <flag-btn
            color="dark-base"
            outlined
            :to="{
              name: 'restore-password',
              query: {
                username: form.username,
              },
            }"
          >
            Восстановить
          </flag-btn>
        </div> -->
      </v-form>
    </div>
  </login-register-form-wrapper>
</template>

<script>
import Cookies from 'js-cookie'
import LoginRegisterFormWrapper from './LoginRegisterFormWrapper.vue'
import getSuite from './suite'
import { getErrorInformation } from '@/utils/proccesErrors'
// import { USER_ROLES_DICTIONARY } from '@/modules/users/const'
import { useAuthStore } from '@/stores/auth.js'

export default {
  components: {
    LoginRegisterFormWrapper,
  },
  layout: 'clear',
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      loading: false,
      loadingEmailValidation: false,
      validationRes: null,
      validationSuite: null,
      passswordErrors: [],
    }
  },
  async fetch() {
    const users = await this.$usersRepository.index()
    this.store.users = users
  },
  computed: {
    store() {
      const store = useAuthStore(this.$pinia)
      return store
    },
  },

  created() {
    // this.$commonRepository
    this.validationSuite = getSuite({}, this.$notify)
    this.validationRes = this.validationSuite.get()
  },
  methods: {
    validate(name) {
      this.passswordErrors = []
      return new Promise((resolve, reject) => {
        this.validationRes = this.validationSuite(
          this.form,
          name,
          this.validationSuite
        )
        if (name === 'username') {
          this.loadingEmailValidation = true
        }

        this.validationRes.done((res) => {
          this.loadingEmailValidation = false
          this.validationRes = res
          resolve()
        })
      })
    },

    async login() {
      if (!this.form.password || !this.form.username) {
        return
      }
      const authStore = useAuthStore(this.$pinia)

      // try {
      this.loading = true
      try {
        const serverUser = await this.$usersRepository.checkUser({
          login: this.form.username,
          password: this.form.password,
        })

        if (!serverUser) {
          this.passswordErrors = ['Логин или пароль неправильные']
          return
        }
        const user = serverUser

        Cookies.set('user', user.login, {
          expires: 1 / 24,
          sameSite: 'Lax',
        })
        authStore.user = user
        this.loading = false

        this.$router.push({ name: 'index' })
      } catch (error) {
        this.passswordErrors = ['Логин или пароль неправильные']
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 20px !important;
}
</style>
