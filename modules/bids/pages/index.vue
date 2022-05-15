<template>
  <div>
    <h2 class="mb-4">Список заявок на продажу</h2>
    <general-list-page
      ref="generalListPageSell"
      :item-class="itemClassSell"
      class="mb-6"
      delete-confirm-text="Заявка"
      :headers="headers"
      :repository="sellRepository"
    >
      <template #price="{ item }">
        {{ item.price | numberWithSpaces }}
        <template v-if="item.idObligation">(Вторичная) </template>
      </template>

      <template #date="{ item }">
        {{ item.date | normalizeDate }}
      </template>
      <template #idUser="{ item }">
        <user-block :user-id="item.idUser" />
      </template>
      <template #actions="{ item }">
        <flag-btn
          v-if="userRole === 'buyer' && item.idUser !== user.id"
          @click="onBidConfirmModalOpen(item)"
        >
          <!-- <v-icon class="mr-2" @click="onAtemptRentItem(item)">
            mdi-hand-back-right-outline
          </v-icon> -->
          Купить
        </flag-btn>
      </template>
    </general-list-page>

    <h2 class="mb-4">Список заявок на покупку</h2>
    <general-list-page
      ref="generalListPageBuy"
      delete-confirm-text="Заявка"
      :headers="headers"
      :repository="buyRepository"
    >
      <template #price="{ item }">
        {{ item.price | numberWithSpaces }}
        <template v-if="item.idObligation">(Вторичная)</template>
      </template>

      <template #date="{ item }">
        {{ item.date | normalizeDate }}
      </template>
      <template #idUser="{ item }">
        <user-block :user-id="item.idUser" />
      </template>

      <template #actions="{ item }">
        <flag-btn
          v-if="userRole === 'seller' && item.idUser !== user.id"
          @click="onBidConfirmModalOpen(item)"
        >
          <!-- <v-icon class="mr-2" @click="onAtemptRentItem(item)">
            mdi-hand-back-right-outline
          </v-icon> -->
          Продать
        </flag-btn>
      </template>
    </general-list-page>

    <flag-dialog v-model="isConfirmBidConfigModalOpen" :max-width="480">
      <div v-if="isConfirmBidConfigModalOpen" class="pa-4">
        <div class="mb-2">
          Введите одобряемый объем (от 1 до {{ selectedBid.count }})
        </div>
        <form-item class="mb-3" label="Кол-во контрактов">
          <flag-text-field
            v-model="configBid.count"
            :height="40"
            placeholder="Кол-во контрактов"
          />
        </form-item>

        <div class="d-flex mt-3 justify-center">
          <flag-btn
            color="dark-main"
            class="mr-3"
            large
            outlined
            @click="resetBidConfirm"
          >
            Отмена
          </flag-btn>
          <flag-btn
            :loading="isLoadingConfirmBid"
            large
            color="primary-main"
            @click="onBidConfirm"
          >
            Ок
          </flag-btn>
        </div>
      </div>
    </flag-dialog>
  </div>
</template>

<script>
// import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
// import FormItem from '@/modules/CRUD/components/FormItem.vue'
import { useAuthStore } from '@/stores/auth.js'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import { numberWithSpaces, normalizeDate } from '@/utils'

export default {
  components: {
    FormItem,
    // createEditSheet,
    GeneralListPage,
  },
  filters: {
    numberWithSpaces,
    normalizeDate,
  },
  data() {
    return {
      headers: [
        {
          text: 'Дата, время выставления заявки',
          value: 'date',
        },
        {
          text: 'Участник торгов',
          value: 'idUser',
        },
        {
          text: 'Объем (количество контрактов)',
          value: 'count',
        },
        {
          text: 'Цена за контракт (тонну), руб.',
          value: 'price',
        },
      ],
      sellRepository: {
        ...this.$bidsRepository,
        index: () => {
          return this.$bidsRepository.index({
            params: {
              requestType: 'sell',
            },
          })
        },
      },
      buyRepository: {
        ...this.$bidsRepository,
        index: () => {
          return this.$bidsRepository.index({
            params: {
              requestType: 'buy',
            },
          })
        },
      },
      selectedBid: null,
      isConfirmBidConfigModalOpen: false,
      configBid: null,
      isLoadingConfirmBid: false,
    }
  },
  computed: {
    userRole() {
      return this.store.user.role
    },
    store() {
      return useAuthStore(this.$pinia)
    },
    user() {
      return this.store.user
    },
  },

  methods: {
    itemClassSell(item) {
      if (item.idUser === this.user.id) return 'class-user-row'
    },
    onBidConfirmModalOpen(bid) {
      this.isConfirmBidConfigModalOpen = true
      this.selectedBid = bid
      this.configBid = {
        count: bid.count,
      }
    },
    resetBidConfirm() {
      this.isConfirmBidConfigModalOpen = false
      this.selectedBid = null
      this.configBid = null
    },
    async onBidConfirm() {
      this.isLoadingConfirmBid = true
      try {
        await this.$obligationRepository.create({
          count: Number(this.configBid.count),
          idApplication: this.selectedBid.id,
          idUser: this.store.user.id,
        })
        this.resetBidConfirm()
        this.$refs.generalListPageBuy.reload()
        this.$refs.generalListPageSell.reload()
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoadingConfirmBid = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: white;

  border-radius: 10px;
  padding: 10px 20px;
}
</style>

<style lang="scss">
.class-user-row {
  background: var(--v-primary-opacity-10-base);
}
</style>
