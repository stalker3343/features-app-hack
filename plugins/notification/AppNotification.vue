<template>
  <transition-group name="fade">
    <v-snackbar
      v-for="(notification, index) in notifications"
      :key="notification.id"
      :value="notification.isShown"
      v-bind="notification.config"
      :style="`margin-top: ${(notification.header ? 70 : 60) * index}px`"
      class="flagman-body-title"
      content-class="app-notiffication"
      @input="onSnackbarInput(notification.id, $event)"
    >
      <div
        class="app-notiffication__inner"
        @click="
          onNotificationClick(notification.config.onClick, notification.id)
        "
      >
        <div v-if="notification.header" class="flagman-body-title">
          {{ notification.header }}
        </div>
        {{ notification.text }}
      </div>

      <template #action="{ attrs }">
        <v-btn
          v-if="notification.hasCloseButton"
          v-bind="attrs"
          icon
          @click="onButtonClose(notification.id)"
        >
          <app-icon :size="24" name="Close" />
        </v-btn>
      </template>
    </v-snackbar>
  </transition-group>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { events } from '@/plugins/notification/events'

export default defineComponent({
  data() {
    return {
      notifId: 0,
      notifications: [],
    }
  },
  mounted() {
    events.$on('add', this.addNotification)
  },
  methods: {
    addNotification({ text, config, hasCloseButton, header }) {
      const defaultConfig = {
        app: true,
        timeout: 3000,
        top: true,
        right: true,
        color: 'primary-light',
        onClick: () => {},
      }

      this.notifications.push({
        text,
        header,
        id: this.notifId,
        hasCloseButton,
        isShown: true,
        config: {
          ...defaultConfig,
          ...config,
        },
      })
      this.notifId++
    },
    removeNotification(id) {
      const indexFordel = this.notifications.findIndex((el) => el.id === id)
      this.notifications.splice(indexFordel, 1)
    },

    onSnackbarInput(id, value) {
      if (value === false) {
        this.removeNotification(id)
      }
    },

    onButtonClose(id) {
      this.removeNotification(id)
    },
    onNotificationClick(clickCallback, id) {
      this.removeNotification(id)
      clickCallback()
    },
  },
  // setup() {
  //   const { notifications, removeNotification } = useNotifications()

  //   const onSnackbarInput = (id: number, value: boolean) => {
  //     if (value === false) {
  //       removeNotification(id)
  //     }
  //   }

  //   const onButtonClose = (id: number) => {
  //     removeNotification(id)
  //   }

  //   return {
  //     notifications,
  //     onSnackbarInput,
  //     onButtonClose,
  //   }
  // },
})
</script>

<style lang="scss" scoped>
::v-deep .v-snack {
  transition: margin-top 0.3s;
}
.app-notiffication__inner {
  padding: 8px 10px;
  max-height: 72px;
  overflow: hidden;
}
</style>

<style lang="scss">
.app-notiffication {
  padding: 0px !important;
}
</style>
