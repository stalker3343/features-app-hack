<template>
  <div>
    <flag-btn @click="getUserScooters"> getUserScooters </flag-btn>
    <general-list-page
      ref="generalListPage"
      :show-create="true"
      :show-edit="true"
      delete-confirm-text="Самокат"
      :headers="headers"
      :repository="$scootersRepository"
    >
      <template #rentStartTime="{ item }">
        <template v-if="item.rentStartTime !== '0'">
          {{ new Date(item.rentStartTime * 1000).toLocaleString() }}
        </template>
        <template v-else> - </template>
      </template>

      <template #rentBy="{ item }">
        <template v-if="item.rentBy !== $options.EMPTY_ADRESS">
          {{ item.rentBy }}
        </template>
        <template v-else> - </template>
      </template>

      <template #actions="{ item }">
        <flag-btn v-if="!item.isRent" :loading="rentLoading" icon>
          <v-icon class="mr-2" @click="onAtemptRentItem(item)">
            mdi-hand-back-right-outline
          </v-icon>
        </flag-btn>

        <flag-btn v-if="item.isRent" :loading="rentFinishLoading" icon>
          <v-icon class="mr-2" @click="onFinishRentItem(item)">
            mdi-check
          </v-icon>
        </flag-btn>
      </template>
      <template #create-edit-sheet="{ editedItem, onUpdateList }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Самоката"
          :repository="$scootersRepository"
          :default-item="defaultScooter"
          @success-create="onUpdateList"
          @success-edit="onUpdateList"
        >
          <template #default="{ item }">
            <form-item class="mb-2" label="Название самоката">
              <flag-text-field
                v-model="item.name"
                :height="40"
                placeholder="Название самоката"
              />
            </form-item>
            <form-item label="ID самока в севисе геолокации">
              <flag-text-field
                v-model="item.geoId"
                :height="40"
                placeholder="ID самока в севисе геолокации"
              />
            </form-item>
          </template>
        </create-edit-sheet>
      </template>
    </general-list-page>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import { Scooter } from '@/entities/Scooter.js'
export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
  },
  EMPTY_ADRESS: '0x0000000000000000000000000000000000000000',

  data() {
    return {
      headers: [
        {
          text: 'Имя',
          value: 'name',
        },
        {
          text: 'id геолокации',
          value: 'geoId',
        },
        {
          text: 'Статус аренды',
          value: 'isRent',
        },
        {
          text: 'Кем орендован',
          value: 'rentBy',
        },
        {
          text: 'Время начала аренды',
          value: 'rentStartTime',
        },
      ],
      defaultScooter: Scooter.getDefaultValue(),
      rentLoading: false,
      rentFinishLoading: false,
    }
  },
  mounted() {
    // this.$scootersContract.events.PayScooterRent({}, async (_, event) => {
    // })
  },

  methods: {
    async onAtemptRentItem(scooter) {
      this.rentLoading = true
      try {
        await this.$scootersRepository.checkRentPossibility(scooter.id)
        await this.$scootersRepository.rentScooter(scooter.id)

        // await this.payRent(scooter.id)

        this.$refs.generalListPage.reload()
      } catch (error) {
        console.error(error)
      } finally {
        this.rentLoading = false
      }
    },

    async onFinishRentItem(scooter) {
      this.rentFinishLoading = true
      const currentTime = new Date()
      const rentStartTime = new Date(scooter.rentStartTime * 1000)
      const diffMs = currentTime - rentStartTime
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
      // console.log(diffMins)
      await this.payRent(scooter.id, diffMins * 5)
      this.rentFinishLoading = false
    },
    async payRent(scooterId, summ) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })

      const appPaymentId = +new Date()
      const res = await fetch('/api/yandex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: {
            value: parseFloat(summ).toFixed(2),
            currency: 'RUB',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: `http://localhost:3000/succes-pay/?appPaymentId=${appPaymentId}&user=${accounts[0]}&scooter=${scooterId}`,
          },
          metadata: {
            appPaymentId: +new Date(),
          },
          description: 'Заказ №1',
        }),
      })
      const paymentObject = await res.json()

      if (paymentObject.type === 'error') {
        this.$notify.error({
          text: `[${paymentObject.code}]: ${paymentObject.description}`,
        })
        return
      }
      window.open(paymentObject.confirmation.confirmation_url, '_blank')
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
