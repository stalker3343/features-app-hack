<template>
  <div class="form-item">
    <div class="d-flex align-center mb-1">
      <div class="flagman-h1-medium mr-1">{{ label }}</div>

      <v-menu v-if="helpText" open-on-hover offset-y>
        <template #activator="{ on, attrs }">
          <v-btn x-small v-bind="attrs" icon v-on="on">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <div class="help-sheet">
          {{ helpText }}
        </div>
      </v-menu>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    helpText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.form-item {
  // margin-bottom: 15px;
}

.help-sheet {
  background-color: white;
  padding: 5px 10px;
}
</style>
