<template>
  <div>
    <template v-if="userRole === 'admin'">
      <flag-btn color="primary" block> Полная кабзда </flag-btn>
    </template>
    <template v-else>
      <h2 class="mb-3">Список обязательств</h2>

      <general-list-page
        ref="generalListPage"
        delete-confirm-text="Обязательства"
        :headers="headers"
        :repository="customObligationRepository"
      >
        <template #create-btn-text>
          Создать заявку на {{ createBtnText }}
        </template>
        <template #price="{ item }">
          {{ item.price | numberWithSpaces }}
        </template>

        <template #idBuyer="{ item }">
          <user-block :user-id="item.idBuyer" />
        </template>
        <template #idSeller="{ item }">
          <user-block :user-id="item.idSeller" />
        </template>

        <template #idUser="{ item }">
          <user-block :user-id="item.idUser" />
        </template>

        <template #date="{ item }">
          {{ item.date | normalizeDate }}
        </template>

        <template #actions="{ item }">
          <flag-btn @click="onOpenConfigSellObligation(item)">
            Продать обязательство
          </flag-btn>

          <!-- <flag-btn v-if="item.isRent" :loading="rentFinishLoading" icon>
          <v-icon class="mr-2" @click="onFinishRentItem(item)">
            mdi-check
          </v-icon>
        </flag-btn> -->
        </template>
      </general-list-page>
      <finance-result class="mt-5" />

      <flag-dialog v-model="isSellObligationModalOpen" :max-width="480">
        <div v-if="selectedObligation" class="pa-4">
          <v-alert v-if="isOverflowError" type="error" class="mb-2">
            Не удалось создать заявку т.к. обьем выставленных заявок превышает
            обьем обязательства
          </v-alert>
          <div class="mb-2">
            Введите продаваемый объем (от 1 до {{ selectedObligation.count }})
          </div>

          <form-item class="mb-3" label="Объем в контрактах">
            <flag-text-field
              v-model="configBid.count"
              :height="40"
              placeholder="Объем в контрактах"
            />
          </form-item>
          <form-item label="Цена за контракт (тонну), руб.">
            <flag-text-field
              v-model="configBid.price"
              :height="40"
              placeholder="Цена за контракт (тонну), руб."
            />
          </form-item>

          <div class="d-flex mt-3 justify-center">
            <flag-btn
              color="dark-main"
              class="mr-3"
              large
              outlined
              @click="resetSellObligation"
            >
              Отмена
            </flag-btn>
            <flag-btn
              :loading="isLoadingConfirmBid"
              large
              color="primary-main"
              @click="onSellObligation"
            >
              Ок
            </flag-btn>
          </div>
        </div>
      </flag-dialog>
    </template>
  </div>
</template>

<script>
import FinanceResult from '../components/FinanceResult.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import { useAuthStore } from '@/stores/auth.js'
import { numberWithSpaces, normalizeDate } from '@/utils'
export default {
  components: {
    GeneralListPage,
    FormItem,
    FinanceResult,
  },
  filters: {
    numberWithSpaces,
    normalizeDate,
  },
  data() {
    return {
      headers: [
        {
          text: 'Дата, время заключения сделки',
          value: 'date',
        },
        {
          text: 'Идентификатор покупателя (принимающего зерно)',
          value: 'idBuyer',
        },
        {
          text: 'Идентификатор продавца (поставщика зерна)',
          value: 'idSeller',
        },
        {
          text: 'Объем в контрактах',
          value: 'count',
        },
        {
          text: 'Цена за контракт (тонну), руб.',
          value: 'price',
        },
      ],
      selectedObligation: null,
      isSellObligationModalOpen: false,
      isLoadingConfirmBid: false,
      configBid: null,
      isOverflowError: false,
    }
  },
  computed: {
    customObligationRepository() {
      return {
        ...this.$obligationRepository,
        index: async () => {
          const res = await this.$obligationRepository.index({
            params: {
              requestIdUser: this.store.user.id,
            },
          })
          return res.list
        },
      }
    },
    userRole() {
      return this.store.user.role
    },
    store() {
      return useAuthStore(this.$pinia)
    },
  },
  methods: {
    onOpenConfigSellObligation(obligation) {
      this.isSellObligationModalOpen = true
      this.selectedObligation = obligation
      this.configBid = {
        count: obligation.count,
        price: obligation.price,
      }
    },
    resetSellObligation() {
      this.isSellObligationModalOpen = false
      this.selectedObligation = null
      this.configBid = null
      this.isOverflowError = false
    },
    async onSellObligation() {
      this.isOverflowError = false

      this.isLoadingConfirmBid = true
      const roleToBidType = {
        buyer: 'sell',
        seller: 'buy',
      }

      try {
        const res = await this.$bidsRepository.create({
          idUser: this.store.user.id,
          count: this.configBid.count,
          price: this.configBid.price,
          type: roleToBidType[this.store.user.role], // buy/sell
          idObligation: this.selectedObligation.id,
        })
        if (!res) {
          this.isOverflowError = true
          return
        }
        this.resetSellObligation()
        this.$refs.generalListPage.reload()
        // this.$refs.generalListPageSell.reload()
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoadingConfirmBid = false
      }
    },
  },
}
</script>

<style></style>
