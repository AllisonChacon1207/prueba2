<template>
  <div>
    <q-layout>
      <!-- Encabezado -->
      <q-header bordered class="bg-blue-5 text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn-icons-png.flaticon.com/128/5371/5371682.png" />
            </q-avatar>
            Datos en QR
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <!-- Contenido principal -->
      <q-page-container>
        <!-- Tabla de datos -->
        <q-table
          title="Mi Tabla"
          :rows="rows"
          :columns="columns"
          row-key="name"
          @row-click="onRowClick"
        />

        <!-- Diálogo para información y QR -->
        <q-dialog v-model="dialogVisible">
          <q-card>
            <q-card-section>
              <div class="text-h6">Información de la Celda</div>
            </q-card-section>

            <q-card-section>
              {{ cellInfo }}
            </q-card-section>

            <!-- Sección de generación de QR -->
            <q-card-section>
              <q-btn label="Generar QR" color="primary" @click="generateQR" />
            </q-card-section>

            <!-- Visualización del QR -->
            <q-card-section v-if="qrCodeVisible">
              <div ref="qrCodeElement">
                <qrcode-vue :value="qrValue" :size="200" level="H" />
              </div>
            </q-card-section>

            <!-- Descarga del QR -->
            <q-card-section v-if="qrCodeVisible">
              <q-btn label="Descargar QR" color="secondary" @click="downloadQR" />
            </q-card-section>

            <!-- Acciones del diálogo -->
            <q-card-actions align="right">
              <q-btn flat label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'

export default {
  name: 'PrimerComponente',
  components: {
    QrcodeVue,
  },
  setup() {
    // Estados reactivos
    const dialogVisible = ref(false)
    const cellInfo = ref('')
    const qrCodeVisible = ref(false)
    const qrValue = ref('')
    const qrCodeElement = ref(null)

    // Configuración de columnas
    const columns = [
      {
        name: 'name',
        label: 'Nombre',
        field: 'name',
        align: 'left',
      },
      {
        name: 'age',
        label: 'Edad',
        field: 'age',
        align: 'left',
      },
      {
        name: 'address',
        label: 'Dirección',
        field: 'address',
        align: 'left',
      },
    ]

    // Datos de la tabla
    const rows = [
      { name: 'Allison', age: 20, address: 'La Joya 789' },
      { name: 'Fabiola', age: 32, address: 'Arboleda 456' },
      { name: 'Carlos', age: 42, address: 'Kennedy 789' },
      { name: 'David', age: 38, address: 'Cañada 123' },
      { name: 'Nivia', age: 30, address: 'Pedregal 456' },
    ]

    // Métodos
    const onRowClick = (evt, row) => {
      cellInfo.value = `Nombre: ${row.name}, Edad: ${row.age}, Dirección: ${row.address}`
      qrCodeVisible.value = false
      dialogVisible.value = true
    }

    const generateQR = () => {
      qrValue.value = cellInfo.value
      qrCodeVisible.value = true
    }

    const downloadQR = () => {
      html2canvas(qrCodeElement.value).then((canvas) => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'qr-code.png'
        link.click()
      })
    }

    // Exposición de propiedades y métodos
    return {
      columns,
      rows,
      dialogVisible,
      cellInfo,
      qrCodeVisible,
      qrValue,
      qrCodeElement,
      onRowClick,
      generateQR,
      downloadQR,
    }
  },
}
</script>
