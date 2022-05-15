<template>
  <v-data-table
    loading-text=""
    no-data-text="Нет данных"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-data-table>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  inheritAttrs: false,
})
</script>

<style lang="scss" scoped>
// ::v-deep {
//   .v-data-table__wrapper {
//     height: 100%;
//   }
//   table {
//     height: 100%;
//   }
//   td {
//     border-bottom: none !important;
//     // font-weight: 500;
//     font-size: 14px;
//     line-height: 18px;
//     color: var(--v-dark-main-base);
//   }
//   tbody {
//     tr:nth-child(odd) {
//       background: var(--v-dark-grey-3-base);
//     }
//     tr:hover {
//       background: var(--v-dark-grey-2-base) !important;
//     }
//   }
//   thead {
//     th {
//       font-weight: normal;
//       font-size: 14px !important;
//       line-height: 24px;

//       border-bottom: none !important;
//       color: var(--v-dark-grey-1-base) !important;
//     }
//   }
//   .v-data-table__empty-wrapper {
//     height: 100%;
//     td {
//       font-family: 'Poppins', sans-serif;
//       font-style: normal;
//       font-weight: 500;
//       font-size: 24px !important;
//       line-height: 36px;
//       color: var(--v-primary-main-base);
//       background: var(--v-dark-white-base) !important;
//     }
//   }
// }
// .icis-table_tv {
//   ::v-deep {
//     tbody {
//       position: relative;
//     }
//     table {
//       height: initial;
//     }
//     thead {
//       th {
//         font-weight: bold;
//         font-size: 18px !important;
//         line-height: 23px;
//         color: var(--v-dark-main-base) !important;
//       }
//     }
//     td {
//       height: 91px !important;

//       font-weight: 600;
//       font-size: 18px !important;
//       line-height: 23px;
//     }
//     th {
//       height: 92px !important;
//     }

//     .v-data-table__empty-wrapper {
//       height: initial;
//       top: 55%;
//       position: relative;
//       td {
//         font-size: 24px !important;
//       }
//     }
//   }
// }
</style>
