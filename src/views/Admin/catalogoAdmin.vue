<template>
  <div class="min-h-screen px-4">
    <h1 class="text-center text-3xl font-extrabold text-indigo-700 mb-8">
      Catálogo de Productos
    </h1>

    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div class="lg:col-span-5 flex justify-end mb-4">
        <button
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
          @click="modalAgregarAbierto = true"
        >
          Agregar Producto
        </button>
      </div>

      <!-- Tabla Inventario -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div class="bg-white shadow-md rounded-xl p-6">
          <h2 class="text-xl font-semibold text-indigo-600 mb-4">Inventario</h2>
    
          <div class="overflow-x-auto">
            <table
              id="catalogTable"
              class="w-full text-center border-collapse"
            >
              <thead class="border-b text-sm font-medium text-gray-100 uppercase bg-indigo-800 text-center">
                <tr>
                  <th class="px-5 py-3">ID</th>
                  <th class="px-5 py-3">Nombre</th>
                  <th class="px-5 py-3">Precio</th>
                  <th class="px-5 py-3">Cantidad</th>
                  <th class="px-5 py-3">Imagen</th>
                  <th class="px-5 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in paginatedProducts"
                  :key="item.id"
                  class="hover:bg-gray-200"
                >
                  <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">{{ currentPage === 1 ? index+1 : index + 1 + ((currentPage - 1) * itemsPerPage) }}</td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                    {{ editingProduct !== item.id ? item.nombre : '' }}
                    <input 
                      v-if="editingProduct === item.id"
                      type="text"
                      v-model="item.nombre"
                      class="w-full border rounded p-1 text-center"
                    >
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                    {{ editingProduct !== item.id ? '$' + item.precio.toFixed(2) : '' }}
                    <input 
                      v-if="editingProduct === item.id"
                      type="number"
                      v-model.number="item.precio"
                      class="w-full border rounded p-1 text-center"
                      min="0"
                      step="0.01"
                    >
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                    {{ editingProduct !== item.id ? item.cantidad : '' }}
                    <input 
                      v-if="editingProduct === item.id"
                      type="number"
                      v-model.number="item.cantidad"
                      class="w-full border rounded p-1 text-center"
                      min="0"
                    >
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                    <img v-if="item.image_url" :src="item.imagen" alt="Imagen del producto" class="w-16 h-16 object-cover mx-auto">
                    <img
                      v-else
                      src="https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10951.jpg?ga=GA1.1.1872113362.1761862159&semt=ais_hybrid&w=740&q=80"
                      alt="Imagen del producto"
                      class="w-16 h-16 object-cover mx-auto"
                    ></img>
                  </td>
                  <td class="px-6 text-lg text-gray-700 border-b text-center">
                    <template v-if="editingProduct === item.id">
                      <button
                        class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2 inline-flex items-center justify-center h-[36px] w-[36px]"
                        @click="guardarCambios(item)"
                      >
                        <svg
                          class="w-4 h-4 m-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z">
                          </path>
                        </svg>
                      </button>
                      <button
                        class="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 mr-2 inline-flex items-center justify-center h-[36px] w-[36px]"
                        @click="cancelarEdicion"
                      >
                        <svg
                          class="w-4 h-4 m-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z">
                          </path>
                        </svg>
                      </button>
                    </template>
                    <template v-else>
                      <button
                        id="updateProductBtn"
                        class="bg-lime-400 text-white px-2 py-1 rounded hover:bg-lime-500 mr-2 inline-flex items-center justify-center h-[36px] w-[36px]"
                        @click="iniciarEdicion(item)"
                      >
                        <svg
                          class="w-4 h-4 m-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.5293 15.3193C18.7058 14.8934 19.2942 14.8934 19.4707 15.3193L19.7236 15.9307C20.1556 16.9735 20.9615 17.8062 21.9746 18.2568L22.6914 18.5762C23.1022 18.7589 23.1022 19.3564 22.6914 19.5391L21.9326 19.877C20.9449 20.3163 20.1534 21.1194 19.7139 22.1279L19.4668 22.6934C19.2863 23.1075 18.7136 23.1075 18.5332 22.6934L18.2861 22.1279C17.8466 21.1194 17.0551 20.3163 16.0674 19.877L15.3076 19.5391C14.8974 19.3562 14.8974 18.759 15.3076 18.5762L16.0254 18.2568C17.0385 17.8062 17.8444 16.9735 18.2764 15.9307L18.5293 15.3193ZM16.4346 3.21193C16.8251 2.82141 17.4591 2.82141 17.8496 3.21193L20.6777 6.04103C21.0681 6.43157 21.0682 7.06464 20.6777 7.45509L7.24219 20.8897H3V16.6475L16.4346 3.21193ZM5 17.4756V18.8897H6.41406L15.7275 9.57618L14.3135 8.16212L5 17.4756ZM15.7275 6.74806L17.1426 8.16212L18.5566 6.74806L17.1426 5.334L15.7275 6.74806Z">
                          </path>
                        </svg>
                      </button>
                      <button
                        id="detailProductBtn"
                        class="bg-sky-400 text-white px-2 py-1 rounded hover:bg-sky-500 mr-2 inline-flex items-center justify-center h-[36px] w-[36px]"
                        @click="abrirDetalles(item)"
                      >
                        <svg
                          class="w-4 h-4 m-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z">
                          </path>
                        </svg>
                      </button>
                      <button
                        id="deleteProductBtn"
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 inline-flex items-center justify-center h-[36px] w-[36px]"
                        @click="confirmDelete(index)"
                      >
                        <svg
                          class="w-4 h-4 m-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z">
                          </path>
                        </svg>
                      </button>
                    </template>
                  </td>
                </tr>
                <tr v-if="filteredProducts.length === 0 && !loadingData">
                  <td colspan="6" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                    <LoadingAndEmptyState
                      :loading="false"
                      empty-message="No hay productos que mostrar"
                      class="py-4"
                    />
                  </td>
                </tr>
                <tr v-if="loadingData">
                  <td colspan="6" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                    <LoadingAndEmptyState
                      :loading="true"
                      empty-message=""
                      class="py-4"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Paginations -->
            <div
              v-if="filteredProducts.length > 0"
              id="paginationContainer"
              class="mt-8"
            >
              <div class="mt-4">
                <div class="flex justify-between items-center px-4">
                    <div class="text-sm text-gray-700">
                    Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} de {{ filteredProducts.length }} productos
                    </div>
                  <div class="flex px-4 overflow-x-auto bg-white rounded-md">
                    <div class="flex rounded">
                      <button
                        @click="goToFirstPage"
                        :disabled="currentPage === 1"
                        :class="`px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`"
                      ><span><<</span></button>
                      
                      <template v-for="page in calculateTotalPages" :key="page">
                        <button
                          v-if="page === currentPage || 
                                page === 1 || 
                                page === calculateTotalPages || 
                                (page >= currentPage - 1 && page <= currentPage + 1)"
                          @click="goToPage(page)"
                          :class="`px-3 py-2 leading-tight border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white
                            ${currentPage === page ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-700'}`"
                        >
                          {{ page }}
                        </button>
                        <span 
                          v-else-if="page === currentPage - 2 || page === currentPage + 2"
                          class="px-3 py-2 leading-tight text-gray-500 bg-white border border-r-0 border-gray-200"
                        >...</span>
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
      </div>
    </div>
  </div>

  <!-- Modal Agregar Producto -->
  <SharedModal :show="modalAgregarAbierto" title="Agregar Producto" @close="modalAgregarAbierto = false">
    <form @submit.prevent="insertNewProduct" class="space-y-4">
      <div>
        <label class="text-gray-700">Nombre</label>
        <input v-model="nuevo.nombre" type="text" class="w-full border rounded p-2" required>
      </div>

      <div>
        <label class="text-gray-700">Cantidad</label>
        <input v-model.number="nuevo.cantidad" type="number" min="1" class="w-full border rounded p-2" required>
      </div>

      <div>
        <label class="text-gray-700">Precio</label>
        <input v-model.number="nuevo.precio" type="number" min="0" step="0.01" class="w-full border rounded p-2" required>
      </div>

      <div>
        <label class="text-gray-700">Detalles</label>
        <textarea v-model="nuevo.detalles" class="w-full border rounded p-2" rows="3"></textarea>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          class="px-4 py-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
          @click="modalAgregarAbierto = false"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        >
          Agregar
        </button>
      </div>
    </form>
  </SharedModal>
  <!-- Modal Confirmar Eliminar -->
  <SharedModal :show="modalConfirmarEliminar" title="Confirmar eliminación" @close="cancelarEliminar">
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-800 mb-2">
        ¿Desea eliminar este producto?
      </h3>
      <div v-if="productoAEliminar">
        <div class="mb-2"><b>Nombre:</b> {{ productoAEliminar.nombre }}</div>
        <div class="mb-2"><b>Precio:</b> ${{ productoAEliminar.precio }}</div>
        <div class="mb-2"><b>Cantidad:</b> {{ productoAEliminar.cantidad }}</div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button class="px-4 py-2 bg-gray-500 text-white rounded" @click="cancelarEliminar">Cancelar</button>
        <button class="px-4 py-2 bg-red-600 text-white rounded" @click="deleteProduct">Eliminar</button>
      </div>
    </div>
  </SharedModal>
  <!-- Modal Ver Detalles -->
  <SharedModal :show="modalVerDetalles" title="Detalles del producto" @close="modalVerDetalles = false">
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-800 mb-2">
        Detalles del producto
      </h3>
      <div v-if="productoEnDetalle">
        <div class="mb-2"><b>Nombre:</b> {{ productoEnDetalle.nombre }}</div>
        <div class="mb-2"><b>Precio:</b> ${{ productoEnDetalle.precio }}</div>
        <div class="mb-2"><b>Cantidad:</b> {{ productoEnDetalle.cantidad }}</div>
        <div class="mb-2"><b>Imagen:</b> {{ productoEnDetalle.imagen }}</div>
        <div class="mb-2"><b>Detalles:</b> {{ productoEnDetalle.detalles }}</div>
      </div>
    </div>
  </SharedModal>
  <!-- Toast de éxito o error -->
  <div class="fixed bottom-4 right-4 z-50">
    <Alerts
      v-if="toast.visible"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<script setup lang="ts">
  import { useFirestore } from '../../firebase/firestore'
  import { ref, onMounted, computed } from 'vue'
  import { Producto } from '../../composables/useTableData'
  import SharedModal from '../../components/SharedModal.vue'
  import Alerts from '../../components/Alerts.vue'
  import { searchQuery } from '../../composables/useSearch'
  import LoadingAndEmptyState from '../../components/LoadingAndEmptyState.vue'
  
  
  type FirebaseProduct = {
    [key: string]: any;
  }
  const modalConfirmarEliminar = ref(false)
  const modalAgregarAbierto = ref(false)
  const modalVerDetalles = ref(false)
  const productoAEliminar = ref<FirebaseProduct | null>(null)
  const productoEnDetalle = ref<FirebaseProduct | null>(null)
  const firebaseProducts = ref<FirebaseProduct[]>([])
  const editingProduct = ref<string | null>(null)
  let loadingData = ref<boolean>(false)
  
  // Funciones de paginación
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  
  // Filtrado según la búsqueda global
  const filteredProducts = computed(() => {
    loadingData.value = false
    const q = (searchQuery.value || '').toString().trim().toLowerCase()
    if (!q) return firebaseProducts.value
    return firebaseProducts.value.filter(p => {
      const nombre = (p.nombre || '').toString().toLowerCase()
      const precio = (p.precio || '').toString().toLowerCase()
      const cantidad = (p.cantidad || '').toString().toLowerCase()
      return nombre.includes(q) || precio.includes(q) || cantidad.includes(q)
    })
  })

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredProducts.value.slice(start, end)
  })

  const calculateTotalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value)
  })
  function goToPage(page: number) {
    if (page >= 1 && page <= calculateTotalPages.value) {
      currentPage.value = page
    }
  }
  function goToFirstPage() {
    currentPage.value = 1
  }
  function goToLastPage() {
    currentPage.value = calculateTotalPages.value
  }

  // Toast state
  const toast = ref({
    visible: false,
    title: '',
    message: '',
    type: 'success',
    timeout: null as null | ReturnType<typeof setTimeout>
  })

  // Form state
  const nuevo = ref<Producto>({
    nombre: '',
    cantidad: 1,
    precio: 0,
    detalles: ''
  })

  const loadFirestoreData = async () => {
    try {
      loadingData.value = true
      const data = await useFirestore.getCollection('productos');
      if (data.length === 0 || data === null) {
        loadingData.value = false
        console.log('No hay datos en la colección historial');
      }
      firebaseProducts.value = data
    } catch (error) {
      console.error('Error al cargar datos de Firestore:', error)
    }
  }

  onMounted(() => {
    loadFirestoreData()
  })

  async function insertNewProduct() {
    try {
      await useFirestore.addDocument('productos', nuevo.value)
      nuevo.value = {
        nombre: '',
        cantidad: 1,
        precio: 0,
        detalles: ''
      }
      modalAgregarAbierto.value = false
      loadFirestoreData()
      showToast({
        title: 'Hecho!',
        message: 'Producto agregado correctamente.',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      console.error('Error al agregar el producto:', error)
      showToast({
        title: 'Error',
        message: 'No se pudo agregar el producto.',
        type: 'error',
        duration: 3000
      })
    }
  }

  // Mostrar modal de confirmación antes de eliminar
  function confirmDelete(index: number) {
    productoAEliminar.value = firebaseProducts.value[index]
    modalConfirmarEliminar.value = true
  }

  async function deleteProduct() {
    if (!productoAEliminar.value) return
    try {
      await useFirestore.deleteDocument('productos', productoAEliminar.value.id)
      // Eliminar del array local
      const idx = firebaseProducts.value.findIndex(p => p.id === productoAEliminar?.value?.id)
      if (idx !== -1) firebaseProducts.value.splice(idx, 1)
      await loadFirestoreData()
      showToast({
        title: 'Hecho!',
        message: 'Producto eliminado correctamente.',
        type: 'error',
        duration: 3000
      })
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
      showToast({
        title: 'Error',
        message: 'No se pudo eliminar el producto.',
        type: 'error',
        duration: 3000
      })
    } finally {
      modalConfirmarEliminar.value = false
      productoAEliminar.value = null
    }
  }

  function cancelarEliminar() {
    modalConfirmarEliminar.value = false
    productoAEliminar.value = null
  }

  // carece de sentido esta funcion debido a que todos los detalles son visibles en tabla
  function abrirDetalles(producto: FirebaseProduct) {
    modalVerDetalles.value = true
    productoEnDetalle.value = producto
  }

  // function guardarDetalles() {
  //   modalVerDetalles.value = false
  // }

  // Variable para guardar el estado original del producto en edición
  let productoOriginal: FirebaseProduct | null = null

  function iniciarEdicion(producto: FirebaseProduct) {
    // Guardar una copia del producto original
    productoOriginal = { ...producto }
    editingProduct.value = producto.id
  }

  function cancelarEdicion() {
    if (productoOriginal && editingProduct.value) {
      const index = firebaseProducts.value.findIndex(p => p.id === editingProduct.value)
      if (index !== -1) {
        firebaseProducts.value[index] = { ...productoOriginal }
      }
    }
    editingProduct.value = null
    productoOriginal = null
  }

  async function guardarCambios(producto: FirebaseProduct) {
    try {
      await useFirestore.updateDocument('productos', producto.id, producto)
      editingProduct.value = null
      productoOriginal = null
      await loadFirestoreData()
      showToast({
        title: 'Hecho!',
        message: 'Producto actualizado correctamente.',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
      cancelarEdicion()
        showToast({
          title: 'Error',
          message: 'No se pudo actualizar el producto.',
          type: 'error',
          duration: 3000
        })
    }
  }

  function showToast({ title, message, type = 'success', duration = 3000 }: { title: string, message: string, type?: string, duration?: number }) {
    toast.value.title = title
    toast.value.message = message
    toast.value.type = type
    toast.value.visible = true
    if (toast.value.timeout) clearTimeout(toast.value.timeout)
    toast.value.timeout = setTimeout(() => {
      toast.value.visible = false
    }, duration)
  }
</script>
