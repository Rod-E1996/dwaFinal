<template>
  <div class="min-h-screen relative">

    <!-- CONTENIDO -->
    <div class="container mx-auto pt-28 px-4">
      <h1 class="text-2xl md:text-3xl text-center font-extrabold text-blue-700 mb-6">
        Carrito de Compras
      </h1>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-extrabold text-blue-600 mb-4">Productos en tu carrito</h2>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-center">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="py-2 px-3">Nombre</th>
                <th class="py-2 px-3">Cantidad</th>
                <th class="py-2 px-3">Precio</th>
                <th class="py-2 px-3">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, index) in carrito" :key="index" class="border-b hover:bg-gray-50">
                <td class="py-2 px-3">{{ producto.nombre }}</td>
                <td class="py-2 px-3">{{ producto.cantidad }}</td>
                <td class="py-2 px-3 font-semibold text-green-500">${{ producto.precio }}</td>
                <td class="py-2 px-3">
                  <button @click="eliminarProducto(index)"
                          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Eliminar
                  </button>
                </td>
              </tr>
              <tr v-if="carrito.length === 0">
                <td colspan="4" class="py-4 text-gray-500">No hay productos en el carrito</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 text-right">
          <h4 class="text-lg font-semibold">
            Total: <span class="text-green-600">${{ totalCarrito }}</span>
          </h4>
          <button @click="finalizarCompra"
                  class="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Finalizar compra
          </button>
        </div>

      </div>
    </div>

    <!-- TOAST -->
    <transition name="fade">
      <div v-if="toast.show"
           class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded shadow-lg">
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carrito: [
        { nombre: 'Producto A', cantidad: 2, precio: 15 },
        { nombre: 'Producto B', cantidad: 1, precio: 25 },
        { nombre: 'Producto C', cantidad: 3, precio: 10 },
      ],
      toast: {
        show: false,
        message: '',
      },
    };
  },
  computed: {
    totalCarrito() {
      return this.carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    },
  },
  methods: {
    eliminarProducto(index) {
      this.carrito.splice(index, 1);
      this.showToast('Producto eliminado del carrito');
    },
    finalizarCompra() {
      if (this.carrito.length === 0) {
        this.showToast('No hay productos en el carrito');
        return;
      }
      this.showToast(`Compra finalizada. Total: $${this.totalCarrito}`);
      this.carrito = [];
    },
    showToast(message) {
      this.toast.message = message;
      this.toast.show = true;
      setTimeout(() => this.toast.show = false, 3000);
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
