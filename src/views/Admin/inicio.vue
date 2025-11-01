<template>
  <div class="pt-28 max-h-max">

    <!-- SECCIÓN HERO -->
    <section class="text-center">
      <h1 class="text-4xl font-extrabold text-blue-700 mb-4">
        Bienvenido al sistema de inventario
      </h1>

      <p class="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
        Gestiona fácilmente los productos de tu almacén. Agrega, busca, edita y elimina
        productos de manera rápida y sencilla.
      </p>

      <router-link
        to="/catalog"
        class="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition mt-2"
      >
        Ir al Inventario
      </router-link>
    </section>
  </div>
</template>



<script setup lang="ts">

</script>
