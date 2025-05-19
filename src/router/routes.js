const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/proyecto-final/src/pages/LectorNFC.vue',
        component: () => import('src/pages/LectorNFC.vue'),
      }, // Ruta para MiPrimero.vue
      {
        path: '/proyecto-final/src/pages/TablaQR.vue',
        component: () => import('src/pages/TablaQR.vue'),
      }, // Ruta para MiSegundo.vue
      {
        path: '/proyecto-final/src/pages/LibrosAPI.vue',
        component: () => import('src/pages/LibrosAPI.vue'),
      }, // Ruta para TablaLibros.vue
      {
        path: '/proyecto-final/src/pages/R-V.vue',
        component: () => import('src/pages/BienvenidaRV.vue'),
      }, // Ruta de Bienvenida
    ],
  },

  // Siempre deja esta última ruta para manejar rutas no encontradas (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
