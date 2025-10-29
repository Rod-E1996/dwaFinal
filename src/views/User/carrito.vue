<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

    <div class="container mx-auto pt-24 px-4">
      <h1 class="text-4xl font-extrabold text-center text-emerald-700 tracking-tight drop-shadow-sm">
        Carrito de Compras
      </h1>

      <div class="bg-white shadow-xl rounded-3xl p-7 mt-10 border border-gray-100">
        <h2 class="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
          <img src="../images/cesta-de-la-compra.png" alt="productCarrito" class="h-6 w-6 object-contain">
          Productos en tu carrito
        </h2>

        <div class="overflow-x-auto rounded-xl">
          <table class="min-w-full border-separate border-spacing-y-3 text-center">
            <thead class="bg-emerald-200 text-emerald-900 text-sm uppercase font-semibold">
              <tr>
                <th class="py-3 px-4">Nombre</th>
                <th class="py-3 px-4">Cantidad</th>
                <th class="py-3 px-4">Precio</th>
                <th class="py-3 px-4">Acción</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(producto, index) in carrito"
                  :key="index"
                  class="bg-white border border-gray-200 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg">
                <td class="py-3 px-4 font-medium text-slate-700">{{ producto.nombre }}</td>
                <td class="py-3 px-4">{{ producto.cantidad }}</td>
                <td class="py-3 px-4 font-bold text-emerald-700">
                  ${{ producto.precio }}
                </td>
                <td class="py-3 px-4">
                  <button @click="eliminarProducto(index)" class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-red-500 hover:bg-error-light relative bg-gradient-to-b from-red-500 to-red-600 border-red-600 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-red-600 hover:to-red-600 hover:border-red-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">Eliminar</button>
                </td>
              </tr>

              <tr v-if="carrito.length === 0">
                <td colspan="4" class="py-6 text-center text-slate-500">
                  Tu carrito está vacío
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 text-right space-y-3">
          <h4 class="text-lg font-bold text-slate-700">
            Total: <span class="text-emerald-700">${{ totalCarrito }}</span>
          </h4>
          <button @click="finalizarCompra" class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-green-500 hover:bg-success-light relative bg-gradient-to-b from-green-500 to-green-600 border-green-600 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-green-600 hover:to-green-600 hover:border-green-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">Finalizar Compra</button>
        </div>

      </div>
    </div>

    <!-- TOAST -->
    <transition name="fade">
      <div v-if="toast.show"
           class="fixed bottom-6 right-14 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium">
        ✅ {{ toast.message }}
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
