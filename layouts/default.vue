<template>
  <v-app id="inspire">
    <v-app-bar flat app color="white">
      <!-- <div class="flagman-h2-bold">Сохраненные стратегии</div> -->

      <v-spacer />
      <!-- <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn class="mr-3" icon>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn> -->

      <!-- <v-menu offset-y>
        <template #activator="{ on, attrs }"> -->

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" class="d-flex align-center" v-on="on">
            <v-avatar class="mr-3" color="grey darken-1" size="32" />
            <user-block class="mr-3" :user-id="user.id">
              <template #subtitle>
                {{ roleToText[user.role] }}
              </template>
            </user-block>

            <!-- <div>{{ user.name }} ({{ fiveNumbersId }}) {{ user.role }}</div> -->
            <v-icon>mdi-menu-down</v-icon>
          </div>
        </template>
        <v-list>
          <!-- <v-list-item :to="{ name: 'account' }">
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item> -->
          <v-list-item @click="logout">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Пункт меню</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>

    <v-navigation-drawer class="app-nav-drawer" permanent fixed app>
      <!-- <img src="@/assets/images/logo.svg" class="logo__img" /> -->
      <div class="page-title">Биржа</div>

      <v-spacer />
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.name"
          exact
          :to="{ name: link.name }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> {{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="app-main-wrapper">
      <v-container class="py-3 px-5" fluid>
        <!-- <v-row>
          <v-col cols="12"> -->

        <nuxt />
        <!-- <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1" />

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider v-if="n !== 6" :key="`divider-${n}`" inset />
                </template>
              </v-list>
            </v-card> -->
        <!-- </v-col>
        </v-row> -->
      </v-container>
    </v-main>

    <app-confirm-modal />
    <app-notification />
  </v-app>
</template>

<script>
import jsCookies from 'js-cookie'
import AppConfirmModal from '@/plugins/confirmation/AppConfirmModal.vue'
import AppNotification from '@/plugins/notification/AppNotification.vue'
import { useAuthStore } from '@/stores/auth.js'

export default {
  name: 'DefaultLayout',
  components: {
    AppConfirmModal,
    AppNotification,
  },
  data: () => ({
    roleToText: {
      buyer: 'Покупатель',
      seller: 'Продавец',
    },
  }),
  // fetch() {
  //   this.store.user = this.store.users[1]
  // },

  computed: {
    user() {
      return this.store.user
    },
    store() {
      const store = useAuthStore(this.$pinia)
      return store
    },
    links() {
      const list = [
        {
          name: 'index',
          icon: 'mdi-currency-usd',
          text: 'Рынок',
        },
        {
          name: 'account',
          icon: 'mdi-account',
          text: 'Личный кабинет',
        },
      ]

      if (this.user.role === 'admin') {
        list.push({
          name: 'users',
          icon: 'mdi-account-group',
          text: 'Пользователи',
        })
      } else {
        list.push({
          name: 'application',
          icon: 'mdi-file-outline',
          text: 'Мои заявки',
        })
      }

      return list
    },
    fiveNumbersId() {
      switch (String(this.user.id).length) {
        case 1:
          return '0000' + this.user.id

        case 2:
          return '000' + this.user.id

        case 3:
          return '00' + this.user.id

        case 4:
          return '0' + this.user.id

        default:
          return this.user.id
      }
    },
  },
  methods: {
    logout() {
      jsCookies.remove('user')
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
<style lang="scss" scoped>
.accoun-name {
  text-decoration: none;
  color: var(--v-primary-dark-base);
}
.logo__img {
  width: 206px;
  margin: 21px auto;
  display: block;
}

.app-nav-drawer {
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.014),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.app-main-wrapper {
  background-color: #f5f6f8;
}
::v-deep {
  .v-toolbar__content {
    padding: 4px 43px;
  }
}

.v-list-item__icon {
  margin-right: 10px !important;
}
::v-deep {
  .v-list-item__icon {
    margin-right: 10px !important;
  }
}
.page-title {
  padding-top: 15px;
  font-family: 'Roboto';
  font-size: 25px;
  font-weight: 600;
  text-align: center;
}
</style>
