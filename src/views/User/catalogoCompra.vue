<template>
  <div class="min-h-screen">

    <!-- CONTENIDO -->
    <div class="container mx-auto pt-28 px-4">
      <h1 class="text-2xl md:text-3xl text-center font-extrabold text-blue-700 mb-6">
        Catálogo de Compras
      </h1>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-semibold text-blue-600 mb-4">Productos disponibles</h2>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-center">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="py-2 px-3">Nombre</th>
                <th class="py-2 px-3">Cantidad</th>
                <th class="py-2 px-3">Precio</th>
                <th class="py-2 px-3">Agregar al carrito</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, index) in productos" :key="index" class="border-b hover:bg-gray-50">
                <td class="py-2 px-3">{{ producto.nombre }}</td>
                <td class="py-2 px-3">{{ producto.cantidad }}</td>
                <td class="py-2 px-3 font-semibold text-green-500">${{ producto.precio }}</td>
                <td class="py-2 px-3">
                  <button @click="agregarAlCarrito(producto)"
                          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Agregar
                  </button>
                </td>
              </tr>
              <tr v-if="productos.length === 0">
                <td colspan="4" class="py-4 text-gray-500">No hay productos disponibles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Toast / Notificación -->
      <transition name="fade">
        <div v-if="toastVisible" class="fixed top-20 right-3 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {{ toastMessage }}
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [
        { nombre: 'Producto A', cantidad: 10, precio: 15 },
        { nombre: 'Producto B', cantidad: 5, precio: 25 },
        { nombre: 'Producto C', cantidad: 8, precio: 10 },
      ],
      toastVisible: false,
      toastMessage: '',
    };
  },
  methods: {
    agregarAlCarrito(producto) {
      this.toastMessage = `${producto.nombre} agregado al carrito`;
      this.toastVisible = true;

      // Ocultar toast después de 2 segundos
      setTimeout(() => {
        this.toastVisible = false;
      }, 2000);

      // Aquí se agregará la lógica real para añadir el producto al carrito
      console.log('Producto agregado:', producto);
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
