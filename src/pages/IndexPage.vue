<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 100%; max-width: 400px">
      <div class="text-center q-mb-md">
        <img alt="Quasar logo" src="/vehicular.png" style="width: 200px; height: 200px" />
      </div>
      <q-card>
        <q-card-section>
          <div class="text-h6">Inicio de Sesión</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="username" label="Usuario" outlined dense />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
            dense
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Ingresar" color="primary" @click="login" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  if (username.value === 'user' && password.value === '1234') {
    router.push('/proyecto-final/src/pages/R-V.vue') // redirige a la página de inicio
  } else {
    alert('Usuario o contraseña incorrectos')
  }
}
</script>
