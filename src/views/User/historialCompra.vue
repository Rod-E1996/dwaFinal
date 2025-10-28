<template>
  <div class="min-h-screen bg-gray-50">

    <div class="container mx-auto pt-28 px-4">
      <h1 class="text-2xl md:text-3xl text-center font-extrabold text-blue-700 mb-6">
        Mis Compras
      </h1>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-extrabold text-blue-600 mb-4">Historial de compras</h2>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="py-2 px-3 text-center">#</th>
                <th class="py-2 px-3 text-left">Productos</th> <!-- alineamos a la izquierda -->
                <th class="py-2 px-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(compra, index) in historial" :key="index" class="border-b hover:bg-gray-50">
                <td class="py-2 px-3 text-center">{{ index + 1 }}</td>
                <td class="py-2 px-3 text-left">
                  <ul class="list-disc list-inside">
                    <li v-for="(producto, i) in compra.productos" :key="i">{{ producto.nombre }} x{{ producto.cantidad }}</li>
                  </ul>
                </td>
                <td class="py-2 px-3 text-center font-semibold text-green-500">${{ compra.total }}</td>
              </tr>
              <tr v-if="historial.length === 0">
                <td colspan="3" class="py-4 text-center text-gray-500">No tienes compras registradas</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      historial: [
        {
          productos: [
            { nombre: 'Producto A', cantidad: 2 },
            { nombre: 'Producto B', cantidad: 1 },
          ],
          total: 55
        },
        {
          productos: [
            { nombre: 'Producto C', cantidad: 3 },
          ],
          total: 30
        },
      ],
    };
  },
};
</script>