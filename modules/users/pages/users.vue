<template>
  <div>
    <h2 class="mb-3">Список пользователей</h2>

    <general-list-page
      :show-create="true"
      delete-confirm-text="Пользователя"
      :headers="headers"
      :repository="$usersRepository"
    >
      <template #actions="{}">
        <!-- <flag-btn v-if="!item.isRent" :loading="rentLoading" icon>
          <v-icon class="mr-2" @click="onAtemptRentItem(item)">
            mdi-hand-back-right-outline
          </v-icon>
        </flag-btn>

        <flag-btn v-if="item.isRent" :loading="rentFinishLoading" icon>
          <v-icon class="mr-2" @click="onFinishRentItem(item)">
            mdi-check
          </v-icon>
        </flag-btn> -->
      </template>

      <template #create-edit-sheet="{ editedItem, onUpdateList, onCancel }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="пользователя"
          :repository="$usersRepository"
          :default-item="defaultUser"
          @success-create="onUpdateList"
          @success-edit="onUpdateList"
          @cancel="onCancel"
        >
          <template #default="{ item }">
            <form-item class="mb-3" label="Логин">
              <flag-text-field
                v-model="item.login"
                :height="40"
                placeholder="Логин"
              />
            </form-item>

            <form-item class="mb-3" label="Пароль">
              <flag-text-field
                v-model="item.password"
                :height="40"
                placeholder="Пароль"
              />
            </form-item>

            <form-item class="mb-3" label="Роль">
              <flag-select
                v-model="item.role"
                placeholder="Роль"
                :height="40"
                :items="rolesItems"
              />

              <!-- <flag-text-field
                v-model="item.role"
                :height="40"
                placeholder="role"
              /> -->
            </form-item>

            <form-item class="mb-3" label="Название">
              <flag-text-field
                v-model="item.name"
                :height="40"
                placeholder="Название"
              />
            </form-item>
          </template>
        </create-edit-sheet>
      </template>
    </general-list-page>
    <!-- <finance-result /> -->
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'

export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    // FinanceResult,
  },
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
        },
        {
          text: 'login',
          value: 'login',
        },
        // {
        //   text: 'password',
        //   value: 'password',
        // },
        {
          text: 'role',
          value: 'role',
        },
        {
          text: 'name',
          value: 'name',
        },
      ],
      rolesItems: [
        {
          text: 'Продавец',
          value: 'seller',
        },
        {
          text: 'Покупатель',
          value: 'buyer',
        },
        {
          text: 'Админ',
          value: 'admin',
        },
      ],
    }
  },
  computed: {
    defaultUser() {
      return {
        login: '',
        password: '',
        role: '',
        name: '',
      }
    },
  },
}
</script>

<style></style>
