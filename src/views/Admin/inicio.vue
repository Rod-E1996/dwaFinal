<template>
  <div class="pt-28 min-h-screen">

    <!-- SECCIÓN HERO -->
    <section class="text-center py-20">
      <h1 class="text-4xl font-extrabold text-blue-700 mb-4">
        Bienvenido al sistema de inventario
      </h1>

      <p class="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
        Gestiona fácilmente los productos de tu almacén. Agrega, busca, edita y elimina
        productos de manera rápida y sencilla.
      </p>

      <button @click="scrollToInventario"
        class="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition">
        Ir al Inventario
      </button>
    </section>


    <!-- INVENTARIO -->
    <section id="inventario" class="container mx-auto px-4 py-12">

      <!-- BUSCAR PRODUCTO -->
      <div class="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">Buscar producto</h2>

        <input v-model="busqueda" type="text"
          class="border w-full p-3 rounded"
          placeholder="Buscar por nombre...">
      </div>

      <!-- TABLA PRODUCTOS -->
      <div class="bg-white shadow-md rounded-xl p-6">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">Vista previa</h2>

        <div class="overflow-x-auto">
          <table class="w-full text-center border-collapse">
            <thead class="bg-gray-200 text-gray-800">
              <tr>
                <th class="py-2 px-3">Nombre</th>
                <th class="py-2 px-3">Cantidad</th>
                <th class="py-2 px-3">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, i) in productosFiltrados" :key="i"
                  class="border-b hover:bg-gray-50 cursor-pointer"
                  @click="verDetalles(producto)">
                <td class="py-2">{{ producto.nombre }}</td>
                <td class="py-2">{{ producto.cantidad }}</td>
                <td class="py-2 text-green-600 font-medium">
                  ${{ producto.precio.toFixed(2) }}
                </td>
              </tr>

              <tr v-if="productosFiltrados.length === 0">
                <td colspan="3" class="py-4 text-gray-500">
                  No se encontraron productos
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>


    <!-- MODAL DETALLES -->
    <div v-if="modalAbierto"
         class="fixed inset-0 bg-black/40 flex justify-center items-center">
      
      <div class="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h3 class="text-lg font-bold text-gray-800 mb-3">Detalles del Producto</h3>

        <textarea v-model="detalleActivo"
          class="w-full border rounded p-2 h-28" readonly>
        </textarea>

        <div class="text-right mt-4">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            @click="modalAbierto = false">
            Cerrar
          </button>
        </div>
      </div>

    </div>


  </div>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'

interface Producto {
  nombre: string
  cantidad: number
  precio: number
  detalles: string
}

const busqueda = ref('')
const modalAbierto = ref(false)
const detalleActivo = ref('')

const productos = ref<Producto[]>([
  { nombre: "Café", cantidad: 12, precio: 3.50, detalles: "Café tostado de El Salvador." },
  { nombre: "Leche", cantidad: 20, precio: 1.20, detalles: "Leche entera, 1L." },
  { nombre: "Huevos", cantidad: 30, precio: 2.10, detalles: "Cartón de 12 unidades." }
])

const productosFiltrados = computed(() => {
  return productos.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function verDetalles(producto: Producto) {
  detalleActivo.value = producto.detalles
  modalAbierto.value = true
}

function scrollToInventario() {
  const element = document.getElementById("inventario")
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}
</script>
