<template>
  <div class="min-h-screen px-4 pt-28">

    <!-- Título -->
    <h1 class="text-center text-3xl font-extrabold text-blue-700 mb-8">
      Catálogo de Productos
    </h1>

    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

      <!-- FORMULARIO AGREGAR PRODUCTO -->
      <div class="lg:col-span-2 bg-white shadow-md rounded-xl p-6">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">Agregar producto</h2>

        <form @submit.prevent="agregarProducto" class="space-y-4">
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

          <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Agregar
          </button>
        </form>
      </div>

      <!-- BUSQUEDA + TABLA -->
      <div class="lg:col-span-3 flex flex-col gap-6">
        
        <!-- Buscar producto -->
        <div class="bg-white shadow-md rounded-xl p-6">
          <h2 class="text-xl font-semibold text-blue-600 mb-3">Buscar producto</h2>
          <input v-model="busqueda" type="text" class="w-full border rounded p-2"
            placeholder="Buscar por nombre...">
        </div>

        <!-- Tabla Inventario -->
        <div class="bg-white shadow-md rounded-xl p-6">
          <h2 class="text-xl font-semibold text-blue-600 mb-4">Inventario</h2>

          <div class="overflow-x-auto">
            <table class="w-full border-collapse text-center">
              <thead class="bg-gray-200 text-gray-700">
                <tr>
                  <th class="py-2 px-3">Nombre</th>
                  <th class="py-2 px-3">Cantidad</th>
                  <th class="py-2 px-3">Precio</th>
                  <th class="py-2 px-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(producto, index) in productosFiltrados" :key="index"
                    class="border-b hover:bg-gray-50">
                  <td class="py-2 px-3">{{ producto.nombre }}</td>
                  <td class="py-2 px-3">{{ producto.cantidad }}</td>
                  <td class="py-2 px-3 text-green-600 font-medium">
                    ${{ producto.precio.toFixed(2) }}
                  </td>
                  <td class="py-2 flex justify-center gap-2">
                    <button class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      @click="abrirDetalles(producto)">
                      Detalles
                    </button>

                    <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      @click="eliminarProducto(index)">
                      Eliminar
                    </button>
                  </td>
                </tr>

                <tr v-if="productosFiltrados.length === 0">
                  <td class="py-4 text-gray-500" colspan="4">No se encontraron productos</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DETALLES -->
    <div v-if="modalAbierto" class="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div class="bg-white w-96 rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-2">
          Editar Detalles
        </h3>

        <textarea v-model="productoEditable.detalles"
          class="w-full border rounded p-2 h-24"></textarea>

        <div class="flex justify-end gap-2 mt-4">
          <button class="px-4 py-2 bg-gray-500 text-white rounded"
            @click="cerrarModal">
            Cancelar
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded"
            @click="guardarDetalles">
            Guardar
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<!-- SCRIPT PARA PONER A PRUEBA LA VIEW-->
<script>
export default {
  name: "CatalogoAdmin",

  data() {
    return {
      busqueda: "",
      modalAbierto: false,
      productoEditable: null,

      nuevo: {
        nombre: "",
        cantidad: 1,
        precio: 0,
        detalles: ""
      },

      productos: [
        { nombre: "Café", cantidad: 12, precio: 3.50, detalles: "Café de El Salvador" },
        { nombre: "Leche", cantidad: 20, precio: 1.20, detalles: "Entera, 1 litro" }
      ]
    }
  },

  computed: {
    productosFiltrados() {
      return this.productos.filter(p =>
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
    }
  },

  methods: {
    agregarProducto() {
      this.productos.push({ ...this.nuevo })
      this.nuevo = { nombre: "", cantidad: 1, precio: 0, detalles: "" }
    },

    eliminarProducto(index) {
      this.productos.splice(index, 1)
    },

    abrirDetalles(producto) {
      this.productoEditable = producto
      this.modalAbierto = true
    },

    guardarDetalles() {
      this.modalAbierto = false
    },

    cerrarModal() {
      this.modalAbierto = false
    }
  }
}
</script>
