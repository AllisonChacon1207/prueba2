<template>
  <q-layout view="lHh Lpr lff">
    <!-- Encabezado -->
    <q-header elevated class="bg-blue-3 text-white">
      <q-toolbar>
        <q-toolbar-title>DEPARTAMENTO DE ALMACEN DE DIGITALIZACIÓN</q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <!-- Menú lateral -->
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
      <!-- Sección de perfil en la parte superior -->
      <div
        class="absolute-top bg-blue-4 text-white"
        style="
          height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 10px;
        "
      >
        <q-avatar size="85px" class="q-mb-sm">
          <img src="/logo.jpeg" />
        </q-avatar>
        <div class="text-weight-bold">Allison Chacon</div>
        <div>Almacen de Digitalización</div>
      </div>

      <!-- Lista de navegación -->
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item
            :active="selectedOption === 'QR'"
            clickable
            v-ripple
            @click="selectOption('QR')"
            to="/proyecto-final/src/pages/TablaQR.vue"
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>
            <q-item-section>Datos en QR</q-item-section>
          </q-item>

          <q-item
            :active="selectedOption === 'NFC'"
            clickable
            v-ripple
            @click="selectOption('NFC')"
            to="/proyecto-final/src/pages/LectorNFC.vue"
          >
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>
            <q-item-section>Mi NFC</q-item-section>
          </q-item>

          <q-item
            :active="selectedOption === 'API'"
            clickable
            v-ripple
            @click="selectOption('API')"
            to="/proyecto-final/src/pages/LibrosAPI.vue"
          >
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>
            <q-item-section>Mi API</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Área principal de contenido -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      selectedOption: null,
    }
  },
  mounted() {
    // Forzamos que el menú esté cerrado al montar el componente
    this.drawer = false
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
    },
  },
}
</script>
