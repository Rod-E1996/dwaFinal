<template>
  <div class="min-h-screen px-4">
    <h1 class="text-center text-3xl font-extrabold text-indigo-700 mb-8">
      Lista de Productos
    </h1>

    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- <div class="lg:col-span-5 flex justify-end mb-4">
        <button
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
          @click="modalAgregarAbierto = true"
        >
          Agregar Producto
        </button>
      </div> -->

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
                  <th class="px-5 py-3">Disponible</th>
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
                  <td class="px-6 py-4 text-lg text-gray-700 border-b text-center flex items-center justify-center gap-2">
                    <!-- {{ item.cantidad>0 ? 'Disponible' : 'No Disponible' }} -->
                    <svg
                      v-if="item.cantidad>0"
                      class="w-6 h-6 my-[1.27rem] text-lime-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                    </svg>
                    <svg
                      v-else
                      class="w-6 h-6 my-[1.27rem] text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                    </svg>
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
                    <button
                      id="addToCartBtn"
                      class="bg-lime-500 text-white px-2 py-1 rounded hover:bg-lime-600 inline-flex items-center justify-center h-[36px] w-[36px] mr-2"
                      :class="item.cantidad <= 0 ? 'opacity-50 cursor-not-allowed' : ''"
                      :disabled="item.cantidad <= 0"
                      @click="addToCart(item)"
                    >
                      <svg
                        class="w-4 h-4 m-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z">
                        </path>
                      </svg>
                    </button>
                    <button
                      id="detailProductBtn"
                      class="bg-sky-400 text-white px-2 py-1 rounded hover:bg-sky-500 inline-flex items-center justify-center h-[36px] w-[36px]"
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
  <!-- Modal Ver Detalles -->
  <SharedModal :show="modalVerDetalles" title="Detalles del producto" @close="modalVerDetalles = false">
    <div class="p-4">
      <div v-if="productoEnDetalle">
        <div v-if="productoEnDetalle.detalles" class="mb-2">{{ productoEnDetalle.detalles }}</div>
        <div v-else>
          Descripcion no disponible
        </div>
      </div>
    </div>
  </SharedModal>

  <!-- Modal Agregar al Carrito -->
  <SharedModal :show="modalCarrito" title="Agregar al Carrito" @close="modalCarrito = false">
    <div class="p-4">
      <div v-if="productoParaCarrito" class="space-y-4">
        <div class="text-lg font-semibold text-gray-800">
          {{ productoParaCarrito.nombre }}
        </div>
        <div class="text-gray-600">
          Precio: ${{ productoParaCarrito.precio.toFixed(2) }}
        </div>
        <div class="flex flex-col space-y-2">
          <label for="cantidad" class="text-gray-700">Cantidad:</label>
          <div class="flex items-center space-x-2">
            <button 
              @click="decrementarCantidad" 
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              :disabled="cantidadSeleccionada <= 1"
            >-</button>
            <input 
              type="number" 
              id="cantidad"
              v-model="cantidadSeleccionada"
              :max="productoParaCarrito.cantidad"
              min="1"
              class="w-20 px-2 py-1 text-center border rounded"
            >
            <button 
              @click="incrementarCantidad" 
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              :disabled="cantidadSeleccionada >= productoParaCarrito.cantidad"
            >+</button>
          </div>
          <span class="text-sm text-gray-500">
            Disponibles: {{ productoParaCarrito.cantidad }}
          </span>
        </div>
        <div class="text-lg font-bold text-indigo-600">
          Total: ${{ (productoParaCarrito.precio * cantidadSeleccionada).toFixed(2) }}
        </div>
        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            class="px-4 py-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100"
            @click="modalCarrito = false"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
            @click="confirmarAgregarAlCarrito"
          >
            Agregar al Carrito
          </button>
        </div>
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
  import { ref, onMounted, computed, onUnmounted } from 'vue'
  import { Producto, CartItem } from '../../composables/useTableData'
  import SharedModal from '../../components/SharedModal.vue'
  import Alerts from '../../components/Alerts.vue'
  import { searchQuery } from '../../composables/useSearch'
  import LoadingAndEmptyState from '../../components/LoadingAndEmptyState.vue'
  import { useAuth } from '../../firebase/auth'
  
  
  type FirebaseProduct = {
    [key: string]: any;
  }

  const modalAgregarAbierto = ref(false)
  const modalVerDetalles = ref(false)
  const modalCarrito = ref(false)
  const productoEnDetalle = ref<FirebaseProduct | null>(null)
  const productoParaCarrito = ref<FirebaseProduct | null>(null)
  const cantidadSeleccionada = ref(1)
  const firebaseProducts = ref<FirebaseProduct[]>([])
  const editingProduct = ref<string | null>(null)
  let loadingData = ref<boolean>(false)
  let productoOriginal: FirebaseProduct | null = null
  
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

  let unsubscribeProductos: (() => void) | null = null

  const loadFirestoreData = () => {
    try {
      loadingData.value = true
      unsubscribeProductos = useFirestore.listenCollection('productos', (data) => {
        firebaseProducts.value = data
        loadingData.value = false
      }) as () => void
    } catch (error) {
      console.error('Error al cargar datos de Firestore:', error)
      loadingData.value = false
    }
  }

  onMounted(() => {
    loadFirestoreData()
  })

  onUnmounted(() => {
    if (unsubscribeProductos) unsubscribeProductos()
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

  function abrirDetalles(producto: FirebaseProduct) {
    modalVerDetalles.value = true
    productoEnDetalle.value = producto
  }

  function addToCart(producto: FirebaseProduct) {
    modalCarrito.value = true
    productoParaCarrito.value = producto
    cantidadSeleccionada.value = 1
  }

  function incrementarCantidad() {
    if (productoParaCarrito.value && cantidadSeleccionada.value < productoParaCarrito.value.cantidad) {
      cantidadSeleccionada.value++
    }
  }

  function decrementarCantidad() {
    if (cantidadSeleccionada.value > 1) {
      cantidadSeleccionada.value--
    }
  }

  async function confirmarAgregarAlCarrito() {
    if (!productoParaCarrito.value) return

    const currentUser = useAuth.getCurrentUser()
    if (!currentUser || !currentUser.email) {
      showToast({
        title: 'Error',
        message: 'Debes iniciar sesión para agregar productos al carrito',
        type: 'error',
        duration: 3000
      })
      return
    }

    try {
      // Crear el nuevo producto a agregar
      const nuevoProducto = {
        productoId: productoParaCarrito.value.id,
        nombre: productoParaCarrito.value.nombre,
        precio: productoParaCarrito.value.precio,
        cantidad: cantidadSeleccionada.value,
        total: productoParaCarrito.value.precio * cantidadSeleccionada.value,
        fechaAgregado: Date.now()
      }

      // Importar where de firebase/firestore
      const { where } = await import('firebase/firestore')

      // Buscar si ya existe un carrito para este usuario
      const carritoExistente = await useFirestore.queryCollection(
        'cart',
        where('emailUsuario', '==', currentUser.email)
      ) as CartItem[]

      if (carritoExistente && carritoExistente.length > 0) {
        // Si existe, actualizar el array de productos
        const docId = carritoExistente[0].id
        const productosActuales = carritoExistente[0].productos || []
        
        // Verificar si el producto ya existe en el carrito
        const productoExistenteIndex = productosActuales.findIndex(
          (p: any) => p.productoId === nuevoProducto.productoId
        )

        if (productoExistenteIndex !== -1) {
          // Si el producto ya existe, actualizar la cantidad y total
          productosActuales[productoExistenteIndex].cantidad += cantidadSeleccionada.value
          productosActuales[productoExistenteIndex].total = 
            productosActuales[productoExistenteIndex].precio * 
            productosActuales[productoExistenteIndex].cantidad
        } else {
          // Si no existe, agregar el nuevo producto
          productosActuales.push(nuevoProducto)
        }

        await useFirestore.updateDocument('cart', docId, {
          productos: productosActuales
        })
      } else {
        // Si no existe, crear un nuevo documento para el usuario
        await useFirestore.addDocument('cart', {
          emailUsuario: currentUser.email,
          productos: [nuevoProducto]
        })
      }
      
      modalCarrito.value = false
      showToast({
        title: 'Éxito',
        message: 'Producto agregado al carrito correctamente',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
      showToast({
        title: 'Error',
        message: 'No se pudo agregar el producto al carrito',
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
