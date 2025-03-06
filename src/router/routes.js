const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Ruta principal
      { path: '/prueba2/src/pages/MiDato.vue', component: () => import('src/pages/MiDato.vue') }, // Ruta para MiPrimero.vue
      { path: '/prueba2/src/pages/MiLector.vue', component: () => import('src/pages/MiLector.vue') }, // Ruta para MiSegundo.vue
      { path: '/prueba2/src/pages/TablaLibros.vue', component: () => import('src/pages/TablaLibros.vue') }, // Ruta para TablaLibros.vue

    ],

  },

  // Siempre deja esta última ruta para manejar rutas no encontradas (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;
