<template>
  <div>
    <!-- <errors-alert v-if="errors.length" ref="errContainer" :errors="errors" /> -->
    <v-alert v-if="error" ref="errContainer" type="error" class="mb-2">
      {{ error }}
    </v-alert>

    <slot :isLoading="loading" :isError="errors.length" />
  </div>
</template>

<script>
import { getErrorInformation } from '@/utils/proccesErrors'
// import ErrorsAlert from '@/components/AppErrorsAlert.vue'

export default {
  components: {
    // ErrorsAlert,
  },
  props: {
    requestErrors: {
      type: Array,
      default: () => [400, 403],
    },
    showsErrorsBlackList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      errors: [],
      error: null,
    }
  },
  methods: {
    async makeRequest(reqestFn, returnError = false) {
      try {
        this.error = null
        this.errors = []
        this.loading = true
        let res = await reqestFn()
        if (res === '') res = true

        return returnError ? { status: true, response: res, error: null } : res
      } catch (error) {
        const {
          errorCode,
          isErrorHandlingRequire,
          isRequestError,
          errorsList,
        } = getErrorInformation(error, this.requestErrors)

        if (!isErrorHandlingRequire) return

        if (isRequestError) {
          if (this.showsErrorsBlackList.includes(errorCode))
            return returnError
              ? { status: false, response: null, error }
              : false
          this.errors = errorsList

          this.error = error.response.data

          this.$nextTick(() => {
            this.$scrollIntoView(this.$refs.errContainer.$el)
          })
        } else {
          this.$notify.error({
            text: 'Произошла ошибка: ' + errorsList.join(';'),
          })
        }
        return returnError ? { status: false, response: null, error } : false
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
