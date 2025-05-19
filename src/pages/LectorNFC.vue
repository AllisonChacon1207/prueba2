<template>
  <q-page class="flex flex-center">
    <!-- Botón para leer NFC -->
    <q-btn
      color="primary"
      label="Leer NFC"
      @click="readNFC"
    />

    <!-- Botón para mostrar/ocultar tabla -->
    <q-btn
      v-if="nfcMessage"
      color="secondary"
      :label="showTable ? 'Ocultar tabla' : 'Mostrar tabla'"
      @click="showTable = !showTable"
      class="q-ml-sm"
    />

    <!-- Tabla de información NFC -->
    <q-table
      v-if="nfcMessage && showTable"
      title="Información NFC"
      :rows="tableData"
      :columns="columns"
      row-key="key"
      class="q-mt-md custom-table"
    />
  </q-page>
</template>

<script>
/* eslint-env browser */
export default {
  name: 'NFCReaderComponent',
  data() {
    return {
      nfcMessage: null,
      showTable: false,
      columns: [
        {
          name: 'key',
          label: 'Propiedad',
          field: 'key',
          align: 'left'
        },
        {
          name: 'value',
          label: 'Valor',
          field: 'value',
          align: 'left'
        }
      ]
    }
  },
  computed: {
    tableData() {
      if (!this.nfcMessage) return []

      return [
        {
          key: 'Mensaje',
          value: this.nfcMessage
        },
        {
          key: 'Fecha',
          value: new Date().toLocaleString()
        }
      ]
    }
  },
  methods: {
    async readNFC() {
      // Verificar compatibilidad con Web NFC
      if (!('NDEFReader' in window)) {
        this.showError('Web NFC no es compatible con este navegador.')
        return
      }

      try {
        // eslint-disable-next-line no-undef
        const reader = new NDEFReader()
        await reader.scan()

        // Configurar manejadores de eventos
        reader.onreading = this.handleNFCReading
        reader.onreadingerror = this.handleNFCError

      } catch (error) {
        console.error('Error al iniciar la lectura NFC:', error)
        this.showError('No se pudo iniciar la lectura NFC.')
      }
    },

    handleNFCReading(event) {
      const decoder = new TextDecoder()
      this.nfcMessage = decoder.decode(event.message.records[0].data)
      console.log('Mensaje NFC leído:', this.nfcMessage)
      this.showTable = true // Mostrar tabla automáticamente
    },

    handleNFCError(error) {
      console.error('Error al leer NFC:', error)
      this.showError('Error al leer NFC. Intenta de nuevo.')
    },

    showError(message) {
      alert(message)
    }
  }
}
</script>

<style>
.custom-table {
  max-width: 600px;
  margin: 0 auto;
}
</style>
