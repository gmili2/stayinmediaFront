import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Vérifie si l'utilisateur est en cours de chargement
  if (!JSON.parse(localStorage.getItem("user"))?.isLogin ) {
    if (to.name !== 'Login') {
      next('login')
    } else {
      next()
    }
  } else {
    if (to.name == 'Login') {
      router.go(-1)
    }
    else {
      next()
    }
  }
})

export default function (app: App) {
  app.use(router)
}

export { router }
