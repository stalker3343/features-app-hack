<template>
  <v-app>
    <v-main>
      <v-container class="d-flex flex-column h-100">
        <v-row>
          <v-col class="py-0">
            <div class="main-title">Биржа</div>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center h-100">
          <nuxt />
        </v-row>

        <v-row justify="center">
          <v-col class="py-0">
            <div class="text-center license-text">
              Эксперт-Система Юг © 2022 ВСЕ ПРАВА ЗАЩИЩЕНЫ
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'auth',
}
</script>
<style lang="scss" scoped>
.main-title {
  padding-top: 100px;
  font-family: 'Roboto';
  font-size: 40px;
  font-weight: 600;
  text-align: center;
}

.h-100 {
  height: 100%;
}
.logo__img {
  max-width: 250px;
  margin-top: 70px;
  margin-bottom: 56px;
  display: block;

  @media (max-width: 1264px) {
    margin-top: 35px;
    margin-bottom: 28px;
  }
}
.license-text {
  margin-top: 103px;
  margin-bottom: 43px;
}
</style>
