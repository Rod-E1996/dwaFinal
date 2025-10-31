<template>
  <div class="min-h-screen px-4">
    <h1 class="text-2xl md:text-3xl text-center font-extrabold text-blue-700 mb-6">
      Historial de compras
    </h1>

    <div class="container mx-auto px-4">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-lg font-semibold text-blue-600 mb-3">
          Todas las compras realizadas
        </h2>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-center">
            <thead class="text-gray-100 bg-indigo-800">
              <tr>
                <th class="py-2 px-3">#</th>
                <th class="py-2 px-3">Usuario</th>
                <th class="py-2 px-3">Productos</th>
                <th class="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="filteredHistorial.length > 0"
                v-for="(compra, index) in paginatedHistorial" :key="index" class="border-b hover:bg-gray-50">
                <td class="py-2 px-3">{{ ((currentPage - 1) * itemsPerPage) + index + 1 }}</td>
                <td class="py-2 px-3">{{ compra.usuario }}</td>
                <td class="py-2 px-3">{{ compra.productos }}</td>
                <td class="py-2 px-3 font-semibold text-green-500">${{ compra.total }}</td>
              </tr>
              <tr v-if="filteredHistorial.length === 0">
                <td colspan="4" class="py-4 text-gray-500">No hay registros</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div v-if="filteredHistorial.length > 0" id="paginationContainer" class="mt-6">
          <div class="flex justify-between items-center px-4">
            <div class="text-sm text-gray-700">
              Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredHistorial.length) }} de {{ filteredHistorial.length }} compras
            </div>
            <div class="flex px-4 bg-white rounded-md">
              <div class="flex rounded">
                <button
                  @click="goToFirstPage"
                  :disabled="currentPage === 1"
                  :class="`px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`"
                ><span><<</span></button>

                <template v-for="page in calculateTotalPages" :key="page">
                  <button
                    v-if="page === currentPage || page === 1 || page === calculateTotalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
                    @click="goToPage(page)"
                    :class="`px-3 py-2 leading-tight border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white ${currentPage === page ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-700'}`"
                  >
                    {{ page }}
                  </button>
                  <span v-else-if="page === currentPage - 2 || page === currentPage + 2" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-r-0 border-gray-200">...</span>
                </template>

                <button
                  @click="goToLastPage"
                  :disabled="currentPage === calculateTotalPages"
                  :class="`px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white ${currentPage === calculateTotalPages ? 'opacity-50 cursor-not-allowed' : ''}`"
                ><span>>></span></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useFirestore } from '../../firebase/firestore'
import { searchQuery } from '../../composables/useSearch'

const historialData = ref<any[]>([])

const loadFirestoreData = async () => {
    try {
      const data = await useFirestore.getCollection('historial');
      historialData.value = data
    } catch (error) {
      console.error('Error al cargar datos de Firestore:', error)
    }
  }

  onMounted(() => {
    loadFirestoreData()
  })

// Paginación
const currentPage = ref(1)
const itemsPerPage = ref(5)

// Filtrado por búsqueda global
const filteredHistorial = computed(() => {
  const q = (searchQuery.value || '').toString().trim().toLowerCase()
  if (!q) return historialData.value
  return historialData.value.filter(h => {
    const usuario = (h.usuario || '').toString().toLowerCase()
    const productos = (h.productos || '').toString().toLowerCase()
    const total = (h.total || '').toString().toLowerCase()
    return usuario.includes(q) || productos.includes(q) || total.includes(q)
  })
})

const paginatedHistorial = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredHistorial.value.slice(start, end)
})

const calculateTotalPages = computed(() => Math.ceil(filteredHistorial.value.length / itemsPerPage.value))

function goToPage(page: number) {
  if (page >= 1 && page <= calculateTotalPages.value) currentPage.value = page
}
function goToFirstPage() { currentPage.value = 1 }
function goToLastPage() { currentPage.value = calculateTotalPages.value }

// Asegurar que currentPage siempre sea válido si cambia el tamaño del historial
watch(calculateTotalPages, (newVal) => {
  if (currentPage.value > newVal) currentPage.value = newVal || 1
})
</script>