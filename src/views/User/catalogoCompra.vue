<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">

    <div class="container mx-auto pt-28 px-4">
      <h1 class="text-3xl font-extrabold text-center text-emerald-700 mb-10 tracking-tight">
        Catálogo de Compras
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- Tarjetas de producto -->
        <div v-for="(producto, index) in productos" :key="index"
             class="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition">
          
          <h3 class="text-xl font-bold text-emerald-800 mb-1 capitalize">
            {{ producto.nombre }}
          </h3>
          <p class="text-sm text-gray-500 mb-3">Unidades disponibles: 
            <span class="font-extrabold text-blue-600">{{ producto.cantidad }}</span>
          </p>

          <p class="text-2xl font-extrabold text-green-500 mb-5">
            ${{ producto.precio }}
          </p>

          <button @click="agregarAlCarrito(producto)"
                  class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-green-500 hover:bg-success-light relative bg-gradient-to-b from-green-500 to-green-600 border-green-600 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-green-600 hover:to-green-600 hover:border-green-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">
            Agregar al carrito
          </button>
        </div>

        <div v-if="productos.length === 0" class="col-span-3 text-center py-6 text-gray-500">
          No hay productos disponibles
        </div>

      </div>

      <!-- Toast -->
      <transition name="fade">
        <div v-if="toastVisible"
             class="fixed top-20 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl font-semibold">
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

      setTimeout(() => {
        this.toastVisible = false;
      }, 2500);
      
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
