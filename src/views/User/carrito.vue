<template>
  <div class="min-h-screen px-4">
    <h1 class="text-center text-3xl font-extrabold text-indigo-700 mb-8">
      Mi Carrito de Compras
    </h1>

    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- Tabla del Carrito -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div class="bg-white shadow-md rounded-xl p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-indigo-600">Productos en el Carrito</h2>
            <div class="flex items-center space-x-4">
              <div class="text-xl font-bold text-indigo-700">
                Total: ${{ totalCarrito.toFixed(2) }}
              </div>
              <button
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                :disabled="loadingData || cartItems.length === 0"
                @click="confirmarCompra"
              >
                Confirmar Compra
              </button>
            </div>
          </div>
    
          <div class="overflow-x-auto">
            <table class="w-full text-center border-collapse">
              <thead class="border-b text-sm font-medium text-gray-100 uppercase bg-indigo-800 text-center">
                <tr>
                  <th class="px-5 py-3">Producto</th>
                  <th class="px-5 py-3">Precio Unitario</th>
                  <th class="px-5 py-3">Cantidad</th>
                  <th class="px-5 py-3">Total</th>
                  <th class="px-5 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="!loadingData && cartItems.length > 0">
                  <template v-if="filteredCartItems.length > 0">
                    <tr
                      v-for="item in filteredCartItems"
                      :key="item.productoId"
                      class="hover:bg-gray-100"
                    >
                      <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                        {{ item.nombre }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                        ${{ item.precio.toFixed(2) }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                        <div class="flex items-center justify-center space-x-2">
                          <button 
                            @click="actualizarCantidad(item, item.cantidad - 1)"
                            class="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded"
                            :disabled="item.cantidad <= 1"
                          >
                            -
                          </button>
                          <span>{{ item.cantidad }}</span>
                          <button 
                            @click="actualizarCantidad(item, item.cantidad + 1)"
                            class="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b text-center font-semibold">
                        ${{ item.total.toFixed(2) }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b text-center">
                        <button
                          @click="eliminarDelCarrito(item)"
                          class="text-red-600 hover:text-red-800"
                        >
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="5" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                      <LoadingAndEmptyState
                        :loading="false"
                        empty-message="No se encontraron coincidencias"
                        class="py-4"
                      />
                    </td>
                  </tr>
                </template>
                <tr v-else-if="!loadingData">
                  <td colspan="5" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                    <LoadingAndEmptyState
                      :loading="false"
                      empty-message="No hay productos en el carrito"
                      class="py-4"
                    />
                  </td>
                </tr>
                <tr v-if="loadingData">
                  <td colspan="5" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                    <LoadingAndEmptyState
                      :loading="true"
                      empty-message=""
                      class="py-4"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal confirmar compra -->
  <SharedModal :show="modalConfirmarCompra" title="Confirmar compra" @close="modalConfirmarCompra = false">
    <div class="p-4">
      <div class="text-lg font-semibold text-gray-800 mb-4">
        ¿Estás seguro de finalizar la compra?
      </div>
      <div class="text-gray-600 mb-4">
        Esta acción no se puede deshacer.
      </div>
      <div class="text-gray-800 mb-4">
        Total a pagar: <span class="font-bold">${{ totalCarrito.toFixed(2) }}</span>
      </div>
      <div class="flex justify-end gap-2 pt-4">
        <button 
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" 
          @click="modalConfirmarCompra = false"
        >
          Cancelar
        </button>
        <button 
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" 
          @click="procesarCompra"
        >
          Confirmar Compra
        </button>
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
  import { ref, onMounted, computed } from 'vue'
  import { useFirestore } from '../../firebase/firestore'
  import { useAuth } from '../../firebase/auth'
  import Alerts from '../../components/Alerts.vue'
  import LoadingAndEmptyState from '../../components/LoadingAndEmptyState.vue'
  import SharedModal from '../../components/SharedModal.vue'
  import { where } from 'firebase/firestore'
  import { searchQuery } from '../../composables/useSearch'

  interface CartItem {
    productoId: string;
    nombre: string;
    precio: number;
    cantidad: number;
    total: number;
  }

  interface CartDocument {
    id: string;
    emailUsuario: string;
    productos: CartItem[];
  }

  const cartItems = ref<CartItem[]>([])
  const loadingData = ref(true)
  const cartId = ref<string | null>(null)
  const modalConfirmarCompra = ref(false)

  // Filtered cart items based on search query
  const filteredCartItems = computed(() => {
    const query = searchQuery.value.toString().trim().toLowerCase()
    if (!query) return cartItems.value

    return cartItems.value.filter(item => {
      const nombre = item.nombre.toLowerCase()
      const precio = item.precio.toString()
      const cantidad = item.cantidad.toString()
      const total = item.total.toString()
      
      return nombre.includes(query) || 
             precio.includes(query) || 
             cantidad.includes(query) ||
             total.includes(query)
    })
  })

  const totalCarrito = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.total, 0)
  })


  const toast = ref({
    visible: false,
    title: '',
    message: '',
    type: 'success',
    timeout: null as null | ReturnType<typeof setTimeout>
  })
  // Cargar los productos del carrito del usuario actual
  const loadCartItems = async () => {
    const currentUser = useAuth.getCurrentUser()
    if (!currentUser?.email) {
      showToast({
        title: 'Error',
        message: 'Debes iniciar sesión para ver tu carrito',
        type: 'error',
        duration: 3000
      })
      return
    }

    try {
      loadingData.value = true
      const carritoData = await useFirestore.queryCollection(
        'cart',
        where('emailUsuario', '==', currentUser.email)
      ) as CartDocument[]

      if (carritoData && carritoData.length > 0) {
        cartId.value = carritoData[0].id
        cartItems.value = carritoData[0].productos || []
      } else {
        // Si no existe el carrito, lo creamos
        const nuevoCarrito = {
          emailUsuario: currentUser.email,
          productos: []
        }
          cartId.value = await useFirestore.addDocument('cart', nuevoCarrito)
        cartItems.value = []
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error)
      showToast({
        title: 'Error',
        message: 'No se pudo cargar el carrito',
        type: 'error',
        duration: 3000
      })
    } finally {
      loadingData.value = false
    }
  }

  // Actualizar la cantidad de un producto
  const actualizarCantidad = async (item: CartItem, nuevaCantidad: number) => {
    if (!cartId.value) return

    if (nuevaCantidad < 1) {
      nuevaCantidad = 1
    }

    try {
      const productoDoc = await useFirestore.getDocument('productos', item.productoId)
      const stockDisponible = productoDoc && (productoDoc as any).cantidad ? Number((productoDoc as any).cantidad) : null

      if (stockDisponible !== null) {
        if (nuevaCantidad > stockDisponible) {
          showToast({
            title: 'Advertencia',
            message: `No hay suficiente stock. Máximo disponible: ${stockDisponible}`,
            type: 'error',
            duration: 3000
          })
          nuevaCantidad = stockDisponible
        }
      }

      const productos = [...cartItems.value]
      const index = productos.findIndex(p => p.productoId === item.productoId)

      if (index === -1) return

      if (productos[index].cantidad === nuevaCantidad) return

      productos[index] = {
        ...productos[index],
        cantidad: nuevaCantidad,
        total: productos[index].precio * nuevaCantidad
      }

      await useFirestore.updateDocument('cart', cartId.value, { productos })
      cartItems.value = productos

      showToast({
        title: 'Éxito',
        message: 'Cantidad actualizada',
        type: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error('Error al actualizar cantidad:', error)
      showToast({
        title: 'Error',
        message: 'No se pudo actualizar la cantidad',
        type: 'error',
        duration: 3000
      })
    }
  }

  // Eliminar un producto del carrito
  const eliminarDelCarrito = async (item: CartItem) => {
    if (!cartId.value) return

    try {
      const productos = cartItems.value.filter(p => p.productoId !== item.productoId)
      await useFirestore.updateDocument('cart', cartId.value, { productos })
      cartItems.value = productos

      showToast({
        title: 'Éxito',
        message: 'Producto eliminado del carrito',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      showToast({
        title: 'Error',
        message: 'No se pudo eliminar el producto',
        type: 'error',
        duration: 3000
      })
    }
  }

  // Mostrar modal de confirmación de compra
  const confirmarCompra = async () => {
    if (!cartId.value) {
      showToast({ title: 'Error', message: 'Carrito no encontrado', type: 'error', duration: 3000 })
      return
    }

    if (!cartItems.value || cartItems.value.length === 0) {
      showToast({ title: 'Error', message: 'No hay productos en el carrito', type: 'error', duration: 3000 })
      return
    }

    modalConfirmarCompra.value = true
  }

  // Procesar la compra después de la confirmación
  const procesarCompra = async () => {
    modalConfirmarCompra.value = false

    try {
      loadingData.value = true

      const faltantes: string[] = []
      for (const item of cartItems.value) {
        const productoDoc: any = await useFirestore.getDocument('productos', item.productoId)
        const stock = productoDoc && productoDoc.cantidad ? Number(productoDoc.cantidad) : 0
        if (stock < item.cantidad) {
          faltantes.push(`${item.nombre} (disponible: ${stock})`)
        }
      }

      if (faltantes.length > 0) {
        showToast({ title: 'Error', message: `Stock insuficiente para: ${faltantes.join(', ')}`, type: 'error', duration: 5000 })
        return
      }

      for (const item of cartItems.value) {
        const productoDoc: any = await useFirestore.getDocument('productos', item.productoId)
        const stock = productoDoc && productoDoc.cantidad ? Number(productoDoc.cantidad) : 0
        const nuevoStock = Math.max(0, stock - item.cantidad)
        await useFirestore.updateDocument('productos', item.productoId, { cantidad: nuevoStock })
      }

      const currentUser = useAuth.getCurrentUser()
      const historyEntry = {
        emailUsuario: currentUser?.email || null,
        productos: cartItems.value.map(i => ({ productoId: i.productoId, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad, total: i.total })),
        total: totalCarrito.value,
        fecha: Date.now()
      }
      await useFirestore.addDocument('history', historyEntry)

      if (cartId.value) {
        await useFirestore.deleteDocument('cart', cartId.value)
      }
      cartItems.value = []
      cartId.value = null

      showToast({ title: 'Compra exitosa', message: 'Gracias por tu compra. Se actualizó el stock y se agregó al historial.', type: 'success', duration: 5000 })
    } catch (error) {
      console.error('Error al confirmar compra:', error)
      showToast({ title: 'Error', message: 'No se pudo completar la compra', type: 'error', duration: 3000 })
    } finally {
      loadingData.value = false
    }
  }

  onMounted(() => {
    loadCartItems()
  })

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
