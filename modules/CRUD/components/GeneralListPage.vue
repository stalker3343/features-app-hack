<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <!-- <v-container> -->
    <slot name="top" />
    <v-row v-if="showCreate">
      <v-col class="d-flex" cols="12">
        <v-spacer />
        <flag-btn color="primary-main" @click="onCreateItem">
          <v-icon>mdi-plus</v-icon>

          <slot name="create-btn-text"> Создать </slot>
        </flag-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="page-wrapper">
          <v-alert v-if="$fetchState.error" class="py-4" type="error">
            Ошибка: {{ $fetchState.error.message }}
          </v-alert>
          <!-- <table-list-action-bar
              :is-shown="isActionBarShow"
              @delete="onMultipleDelete"
            /> -->
          <app-form-wrapper ref="formWrapper" :request-errors="[400, 404]">
            <template #default="{ isLoading }">
              <flag-table
                v-model="selected"
                :item-class="itemClass"
                :loading="$fetchState.pending || isLoading"
                :show-select="isShowSelect"
                :hide-default-footer="true"
                :items="items"
                :headers="innerActions"
              >
                <template v-if="$scopedSlots.date" #item.date="{ item }">
                  <slot name="date" :item="item" />
                </template>

                <template v-if="$scopedSlots.price" #item.price="{ item }">
                  <slot name="price" :item="item" />
                </template>
                <template v-if="$scopedSlots.idUser" #item.idUser="{ item }">
                  <slot name="idUser" :item="item" />
                </template>
                <template v-if="$scopedSlots.idBuyer" #item.idBuyer="{ item }">
                  <slot name="idBuyer" :item="item" />
                </template>
                <template
                  v-if="$scopedSlots.idSeller"
                  #item.idSeller="{ item }"
                >
                  <slot name="idSeller" :item="item" />
                </template>

                <template #item.actions="{ item }">
                  <slot name="actions" :item="item" />

                  <v-icon
                    v-if="showEdit"
                    class="mr-2"
                    @click="onEditItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon v-if="showDelete" @click="onDeleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
                <template #no-data>
                  <v-btn color="primary" @click="initialize"> Reset </v-btn>
                </template>
              </flag-table>
            </template>
          </app-form-wrapper>
        </div>
      </v-col>
    </v-row>
    <!-- </v-container> -->
    <flag-right-sheet v-model="isCreateEditSheetOpen" width="40%">
      <template v-if="isCreateEditSheetOpen">
        <slot
          name="create-edit-sheet"
          :edited-item="editedUserId"
          :on-update-list="unUpdateList"
          :on-cancel="() => (isCreateEditSheetOpen = false)"
        />
      </template>
    </flag-right-sheet>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    deleteConfirmText: {
      type: String,
      required: true,
    },
    repository: {
      type: Object,
      required: true,
    },
    showCreate: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    isShowSelect: {
      type: Boolean,
      default: false,
    },
    itemClass: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      items: [],
      selected: [],
      isCreateEditSheetOpen: false,
      editedUserId: null,
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.items = await this.repository.index()

    this.$emit('update-items', this.items)
  },
  computed: {
    innerActions() {
      return [
        ...this.headers,
        {
          value: 'actions',
          sortable: false,
          align: 'right',
          width: 200,
        },
      ]
    },
  },
  methods: {
    onCreateItem() {
      this.editedUserId = null
      this.isCreateEditSheetOpen = true
    },
    onEditItem(item) {
      this.isCreateEditSheetOpen = true
      this.editedUserId = item.id
    },

    async deleteEntity(id) {
      const res = await this.$refs.formWrapper.makeRequest(
        async () => await this.repository.delete(id)
      )
      if (res) {
        this.$notify.success({ text: 'Удаление прошло успешно' })
        this.$fetch()
      }
    },

    onDeleteItem(item) {
      this.$confirm({
        text: `Вы уверенны, что хотите удалить ${this.deleteConfirmText}?`,
      }).then((res) => {
        if (res) {
          this.deleteEntity(item.id)
        }
      })
    },
    async unUpdateList() {
      this.isCreateEditSheetOpen = false
      await this.$fetch()
    },
    async reload() {
      await this.$fetch()
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
