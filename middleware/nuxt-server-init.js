import { useAuthStore } from '@/stores/auth'

export default async function ({ $pinia }) {
  if (process.server) {
    const store = useAuthStore($pinia)
    await store.nuxtServerInit()
  }
}

// Add this file to nuxt.config.js
// { router: { middleware: ['nuxt-server-init'] } }
