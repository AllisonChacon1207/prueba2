<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 100%; max-width: 400px">
      <div class="text-center q-mb-md">
        <img
          alt="Registro de la propiedad"
          src="https://i.imgur.com/AZVKoPU.png"
          style="width: 200px; height: 200px"
        />
      </div>
      <q-card>
        <q-card-section>
          <div class="text-h6">Inicio de Sesión</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="username"
            label="user"
            outlined
            dense
            :rules="[(val) => !!val || 'Por favor ingrese su usuario']"
          />
          <q-input
            v-model="password"
            label="1234"
            type="password"
            outlined
            dense
            class="q-mt-sm"
            :rules="[(val) => !!val || 'Por favor ingrese su contraseña']"
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
import { useQuasar } from 'quasar'

const $q = useQuasar()
const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  // Validar campos vacíos primero
  if (!username.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: 'Por favor ingrese su usuario y contraseña',
      position: 'top',
    })
    return
  }

  if (username.value === 'user' && password.value === '1234') {
    router.push('/proyecto-final/src/pages/R-V.vue')
  } else {
    $q.notify({
      type: 'negative',
      message: 'Usuario o contraseña incorrectos',
      position: 'top',
    })
  }
}
</script>
