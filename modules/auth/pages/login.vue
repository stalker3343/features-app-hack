<template>
  <v-row justify="center">
    <v-col cols="4">
      <login-form />
    </v-col>
  </v-row>
</template>

<script>
import loginForm from '../components/loginForm.vue'
export default {
  components: {
    loginForm,
  },
  layout: 'auth',
  auth: 'guest',
}
</script>

<style></style>
