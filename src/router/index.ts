import { createRouter, createWebHistory } from 'vue-router'

// Route structure mirrors how a student thinks about the app:
// a formula reference ("wzornik") and per-subject calculators,
// each subject namespaced so new subjects/topics slot in without
// restructuring the router later.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/wzornik/:subject?',
      name: 'wzornik',
      component: () => import('../views/WzornikView.vue'),
      props: true
    },
    {
      path: '/kalkulatory/:subject?',
      name: 'kalkulatory',
      component: () => import('../views/KalkulatoryView.vue'),
      props: true
    },
    {
      path: '/kalkulatory/:subject/:formula',
      name: 'solver',
      component: () => import('../views/SolverView.vue'),
      props: true
    },
    {
      path: '/historia',
      name: 'historia',
      component: () => import('../views/HistoriaView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
