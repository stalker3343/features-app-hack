<template>
  <div class="sheet-wrapper">
    <div class="sheet-header">
      <span class="flagman-h2-bold">{{ headerText }} </span>
    </div>
    <div class="sheet-wrapper-inner">
      <v-alert v-if="$fetchState.error" type="error">
        Ошибка: {{ $fetchState.error.message }}
      </v-alert>
      <v-progress-linear v-else-if="$fetchState.pending" indeterminate />

      <app-form-wrapper v-else ref="formWrapper">
        <template #default="{ isLoading }">
          <v-form
            ref="form"
            v-model="isFormValid"
            class="mt-4"
            @submit.prevent="onSave"
          >
            <slot :item="item" />
          </v-form>

          <div class="cropper-buttons mt-4">
            <flag-btn
              color="dark-main"
              class="mr-3"
              large
              outlined
              @click="$emit('cancel')"
            >
              Отмена
            </flag-btn>
            <flag-btn :loading="isLoading" color="primary-main" @click="onSave">
              Сохранить
            </flag-btn>
          </div>
        </template>
      </app-form-wrapper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemId: {
      type: Number,
      default: 0,
    },
    repository: {
      type: Object,
      required: true,
    },
    defaultItem: {
      type: Object,
      required: true,
    },
    headerTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      item: this.defaultItem,
      isFormValid: false,
      qestionType: null,
    }
  },
  async fetch() {
    if (this.itemId) {
      const res = await this.repository.show(this.itemId)
      this.item = res
    }
  },
  computed: {
    headerText() {
      return this.itemId
        ? `Редактирование ${this.headerTitle}`
        : `Создание ${this.headerTitle}`
    },
  },
  methods: {
    async onSave() {
      this.$refs.form.validate()
      if (!this.isFormValid) return
      if (this.itemId) {
        const res = await this.$refs.formWrapper.makeRequest(
          async () => await this.repository.update(this.itemId, this.item)
        )
        if (res) {
          this.$emit('success-edit', res)
        }
      } else {
        const res = await this.$refs.formWrapper.makeRequest(
          async () => await this.repository.create(this.item)
        )
        if (res) {
          this.$emit('success-create', res)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cropper-buttons {
  @include flex(row, right, center);
}

.sheet-wrapper-inner {
  padding: 20px 30px;
}

.sheet-wrapper {
  height: 100%;

  background: white;
}
.sheet-header {
  border-bottom: 1px solid var(--v-secondary-light-base);
  padding: 10px 30px;
}
</style>
