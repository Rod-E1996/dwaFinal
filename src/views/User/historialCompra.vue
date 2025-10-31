<template>
  <div class="min-h-screen bg-gray-50">

    <div class="container mx-auto pt-28 px-4">
      <h1 class="text-3xl font-extrabold text-center text-emerald-700 mb-10 tracking-tight">
        Mis Compras
      </h1>

      <div class="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 class="text-xl font-bold text-emerald-600 mb-5 flex items-center gap-2">
          <img src="../images/carritoHecho.png" alt="histoCompra" class="h-6 w-6 object-contain">
          Historial de compras
        </h2>

        <div class="overflow-x-auto rounded-lg">
          <table class="min-w-full border-separate border-spacing-y-2">
            <thead class="bg-emerald-100 text-emerald-700 text-sm uppercase font-semibold sticky top-0 z-10 shadow-sm">
              <tr>
                <th class="py-3 px-4 text-center">#</th>
                <th class="py-3 px-4 text-left">Productos</th>
                <th class="py-3 px-4 text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(compra, index) in historial"
                :key="index"
                class="bg-white border border-gray-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <td class="py-3 px-4 text-center font-medium text-gray-600">{{ index + 1 }}</td>

                <td class="py-3 px-4 text-left">
                  <ul class="space-y-1">
                    <li v-for="(producto, i) in compra.productos" :key="i"
                      class="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <span>{{ producto.nombre }}</span>
                      <span class="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                        x{{ producto.cantidad }}
                      </span>
                    </li>
                  </ul>
                </td>

                <td class="py-3 px-4 text-center font-bold text-green-600">
                  ${{ compra.total }}
                </td>
              </tr>

              <tr v-if="historial.length === 0">
                <td colspan="3" class="py-6 text-center text-gray-500">
                  No tienes compras registradas todavía
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useFirestore } from '../../firebase/firestore'
import { searchQuery } from '../../composables/useSearch'

export default {
  setup() {
    const historialData = ref([]);

    const loadFirestoreData = async () => {
      try {
        const data = await useFirestore.getCollection('history');
        historialData.value = data;
      } catch (error) {
        console.error('Error al cargar datos de Firestore:', error);
      }
    };

    const historial = computed(() => {
      const q = (searchQuery.value || '').toString().trim().toLowerCase();
      if (!q) return historialData.value;
      
      return historialData.value.filter(h => {
        // Search in products array
        const productosMatch = h.productos.some(p => 
          p.nombre.toLowerCase().includes(q) || 
          p.cantidad.toString().toLowerCase().includes(q)
        );
        // Search in total
        const totalMatch = h.total.toString().toLowerCase().includes(q);
        return productosMatch || totalMatch;
      });
    });

    onMounted(() => {
      loadFirestoreData();
    });

    return {
      historial
    };
  }
};
</script>