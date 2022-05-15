<template>
  <div>
    <h2 class="mb-4">Финансовый результат</h2>
    <general-list-page
      ref="generalListPage"
      class="mb-6"
      delete-confirm-text="Заявка"
      :headers="headers"
      :repository="customResultsRepository"
    >
      <template #date="{ item }">
        {{ item.date | normalizeDate }}
      </template>
    </general-list-page>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import { normalizeDate } from '@/utils'

export default {
  components: {
    GeneralListPage,
  },
  filters: {
    normalizeDate,
  },
  data() {
    return {
      headers: [
        {
          text: 'Дата',
          value: 'date',
        },
        {
          text: 'Значение',
          value: 'value',
        },

        {
          text: 'Цена покупки',
          value: 'lastPrice',
        },
        {
          text: 'Цена продажи',
          value: 'currentPrice',
        },
        {
          text: 'Кол-во контрактов  ',
          value: 'count',
        },
      ],
    }
  },
  computed: {
    customResultsRepository() {
      return {
        ...this.$resultsRepository,
        index: () => {
          return this.$resultsRepository.index({
            params: {
              requestIdUser: this.user.id,
            },
          })
        },
      }
    },

    store() {
      return useAuthStore(this.$pinia)
    },
    user() {
      return this.store.user
    },
  },
}
</script>

<style></style>
