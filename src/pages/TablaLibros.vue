<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Libros del Autor"
      :rows="books"
      :columns="columns"
      row-key="key"
      @row-click="onRowClick"
    />

    <!-- Diálogo para mostrar detalles -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Detalles del Libro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="selectedBook">
            <p><strong>Autor:</strong> {{ selectedBook.author }}</p>
            <p><strong>Título:</strong> {{ selectedBook.title }}</p>
            <p><strong>Temas:</strong> {{ selectedBook.subjects }}</p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Guardar en NFC"
            color="primary"
            @click="writeToNfc"
          />
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>

</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const books = ref([]);
    const showDialog = ref(false);
    const selectedBook = ref(null);

    const columns = [
      { name: 'author', label: 'Autor', field: 'author', align: 'left' },
      { name: 'title', label: 'Título', field: 'title', align: 'left' },
      { name: 'subjects', label: 'Subjects', field: 'subjects', align: 'left' }
    ];

    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/authors/OL1394244A/works.json?limit=5');
        books.value = response.data.entries.map(entry => ({
          author: "Cory Doctorow",
          title: entry.title,
          subjects: entry.subjects ? entry.subjects.join(', ') : 'No disponible'
        }));
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    const onRowClick = (evt, row) => {
      selectedBook.value = row;
      showDialog.value = true;

    };

    onMounted(fetchBooks);

    return {
      books,
      columns,
      showDialog,
      selectedBook,
      onRowClick
    };
  },
  data() {
    return {
      selectedBook1: {
        Autor: '---->Autor Cory Doctorow'
      }
    };
  },
  methods: {
    async writeToNfc() {
      try {
        if (!('NDEFReader' in window)) {
          alert('Web NFC no es compatible con este navegador.');
          return;
        }
        const ndef = new window.NDEFReader();
        await ndef.scan();
        await ndef.write({
          records: [{ recordType: "text", data: this.selectedBook1.Autor }]
        });
        console.log("Escritura en NFC exitosa");
      } catch (error) {
        console.error("Error al escribir en NFC:", error);
      }
    }
  }
};
</script>
