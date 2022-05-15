<template>
  <div>
    <v-progress-linear v-if="$fetchState.pending" indeterminate />
    <v-alert v-else-if="$fetchState.error" type="error">
      Ошибка: {{ $fetchState.error.message }}
    </v-alert>
    <div v-else>Оплата прошла успешно. Ожидайте перенаправления...</div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const { user, scooter, appPaymentId } = this.$route.query
    await this.$scootersRepository.finishRent(scooter)
    this.$router.push({ name: 'index' })

    console.log('Закончили фетч')
    /*
    {
  appPaymentId: '1652207869359',
  user: '0xd95d79bea5528e5dd9c8c74945c31724c4ece78d',
  scooter: '1'
}

    */
    // const appPaymentId = query.appPaymentId

    // if (!appPaymentId) return
    // const resp = await $axios.$get('/api/yandex-get-payments')
    // const appPaymentsIds = resp.map((el) => el.metadata.appPaymentId)
    //
    // console.log(appPaymentsIds)
  },
  fetchOnServer: false,
}
</script>

<style></style>
