<template>
  <q-page class="flex flex-center">
    <q-btn
      color="primary"
      label="Leer NFC"
      @click="readNFC"
    />
    <q-btn
      v-if="nfcMessage"
      color="secondary"
      :label="showTable ? 'Ocultar tabla' : 'Mostrar tabla'"
      @click="showTable = !showTable"
    />

    <q-table
      v-if="nfcMessage && showTable"
      title="Información NFC"
      :rows="tableData"
      :columns="columns"
      row-key="key"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
/* eslint-env browser */
export default {
  data() {
    return {
      nfcMessage: null,
      showTable: false,
      columns: [
        { name: 'key', label: 'Propiedad', field: 'key', align: 'left' },
        { name: 'value', label: 'Valor', field: 'value', align: 'left' }
      ]
    };
  },
  computed: {
    tableData() {
      if (!this.nfcMessage) return [];
      return [
        { key: 'Mensaje', value: this.nfcMessage },
        { key: 'Fecha', value: new Date().toLocaleString() }
      ];
    }
  },
  methods: {
    async readNFC() {
      if (!('NDEFReader' in window)) {
        alert('Web NFC no es compatible con este navegador.');
        return;
      }

      try {
        // eslint-disable-next-line no-undef
        const reader = new NDEFReader();
        await reader.scan();

        reader.onreading = (event) => {
          const decoder = new TextDecoder();
          this.nfcMessage = decoder.decode(event.message.records[0].data);
          console.log('Mensaje NFC leído:', this.nfcMessage);
          this.showTable = true; // Mostrar tabla automáticamente al leer
        };

        reader.onreadingerror = (error) => {
          console.error('Error al leer NFC:', error);
          alert('Error al leer NFC. Intenta de nuevo.');
        };
      } catch (error) {
        console.error('Error al iniciar la lectura NFC:', error);
        alert('No se pudo iniciar la lectura NFC.');
      }
    }
  }
};
</script>

<style>
.q-table {
  max-width: 600px;
  margin: 0 auto;
}
</style>
