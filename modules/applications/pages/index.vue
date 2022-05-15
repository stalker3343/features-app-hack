<template>
  <div>
    <h2 class="mb-4">Мои заявки</h2>
    <h3>Первичные заявки</h3>
    <general-list-page
      class="mb-6"
      :show-delete="true"
      :show-edit="true"
      :show-create="true"
      delete-confirm-text="Заявка"
      :headers="headers"
      :repository="primaryUserAplicationsRepository"
    >
      <template #price="{ item }">
        {{ item.price | numberWithSpaces }}
      </template>

      <template #date="{ item }">
        {{ item.date | normalizeDate }}
      </template>
      <template #idUser="{ item }">
        <user-block :user-id="item.idUser" />
      </template>

      <template #create-btn-text>
        Создать заявку на {{ createBtnText }}
      </template>

      <template #create-edit-sheet="{ editedItem, onUpdateList, onCancel }">
        <create-edit-sheet
          :item-id="editedItem"
          :header-title="'заявки на ' + createBtnText"
          :repository="$bidsRepository"
          :default-item="defaultBid"
          @success-create="onUpdateList"
          @success-edit="onUpdateList"
          @cancel="onCancel"
        >
          <template #default="{ item }">
            <form-item class="mb-3" label="Объем в контрактах">
              <flag-text-field
                v-model="item.count"
                :height="40"
                placeholder="Объем в контрактах"
              />
            </form-item>
            <form-item label="Цена за контракт (тонну), руб.">
              <flag-text-field
                v-model="item.price"
                :height="40"
                placeholder="Цена за контракт (тонну), руб."
              />
            </form-item>
          </template>
        </create-edit-sheet>
      </template>
    </general-list-page>

    <h3 class="mb-5">Вторичные заявки</h3>

    <general-list-page
      class="mb-6"
      :show-delete="true"
      :show-edit="true"
      delete-confirm-text="Заявка"
      :headers="headers"
      :repository="secondaryUserAplicationsRepository"
    >
      <template #price="{ item }">
        {{ item.price | numberWithSpaces }}
      </template>

      <template #date="{ item }">
        {{ item.date | normalizeDate }}
      </template>
      <template #idUser="{ item }">
        <user-block :user-id="item.idUser" />
      </template>
    </general-list-page>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
// import FormItem from '@/modules/CRUD/components/FormItem.vue'
import { useAuthStore } from '@/stores/auth.js'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import { numberWithSpaces, normalizeDate } from '@/utils'

export default {
  components: {
    FormItem,
    createEditSheet,
    GeneralListPage,
  },
  filters: {
    numberWithSpaces,
    normalizeDate,
  },
  data() {
    return {
      headers: [
        // {
        //   text: 'id',
        //   value: 'id',
        // },
        {
          text: 'Дата, время выставления заявки',
          value: 'date',
        },
        // {
        //   text: 'Участник торгов (Идентификатор)',
        //   value: 'idUser',
        // },
        {
          text: 'Объем (количество контрактов)',
          value: 'count',
        },
        {
          text: 'Цена за контракт (тонну), руб.',
          value: 'price',
        },
      ],
    }
  },
  // idObligation
  fetch() {},
  computed: {
    userRole() {
      return this.store.user.role
    },
    userId() {
      return this.store.user.id
    },
    store() {
      return useAuthStore(this.$pinia)
    },
    primaryUserAplicationsRepository() {
      return {
        ...this.userAplicationsRepository,
        index: async () => {
          const all = await this.userAplicationsRepository.index()
          return all.filter((el) => !el.idObligation)
        },
      }
    },
    secondaryUserAplicationsRepository() {
      return {
        ...this.userAplicationsRepository,
        index: async () => {
          const all = await this.userAplicationsRepository.index()
          return all.filter((el) => el.idObligation)
        },
      }
    },
    userAplicationsRepository() {
      return {
        ...this.$bidsRepository,
        index: async () => {
          const sell = await this.$bidsRepository.index({
            params: {
              requestType: 'sell',
            },
          })

          const buy = await this.$bidsRepository.index({
            params: {
              requestType: 'buy',
            },
          })

          const all = [...sell, ...buy]
          return all.filter((el) => el.idUser === this.userId)
        },
      }
    },

    defaultBid() {
      const roleToBidType = {
        buyer: 'buy',
        seller: 'sell',
      }
      return {
        idUser: this.store.user.id,
        count: '',
        price: '',
        type: roleToBidType[this.store.user.role], // buy/sell
        idObligation: null,
      }
    },
    createBtnText() {
      const roleToText = {
        buyer: 'покупку',
        seller: 'продажу',
      }
      return roleToText[this.userRole]
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: white;

  border-radius: 10px;
  padding: 10px 20px;
}
</style>
