<template>
  <div class="min-h-screen">

    <!-- CONTENIDO -->
    <div class="container mx-auto pt-28 px-4">
      <h1 class="text-2xl md:text-3xl text-center font-extrabold text-blue-700 mb-6">
        Historial de compras (Administrador)
      </h1>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-lg font-semibold text-blue-600 mb-3">
          Todas las compras realizadas
        </h2>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-center">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="py-2 px-3">#</th>
                <th class="py-2 px-3">Usuario</th>
                <th class="py-2 px-3">Productos</th>
                <th class="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(compra, index) in (historial || [])" :key="index" class="border-b hover:bg-gray-50">
                <td class="py-2 px-3">{{ index + 1 }}</td>
                <td class="py-2 px-3">{{ compra.usuario }}</td>
                <td class="py-2 px-3">{{ compra.productos }}</td>
                <td class="py-2 px-3 font-semibold text-green-500">${{ compra.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>
</template>

<!-- ESTO ES UN EJEMPLO, SOLO PARA COMPROBAR QUE FUNCIONA CON DATOS FALSOS Y SIN FIREBASE-->
<script>
export default {
  name: "HistorialCompras",
  data() {
    return {
      historial: [
        { usuario: "Luis", productos: "Leche, Pan", total: 12.50 },
        { usuario: "Ana", productos: "Café, Azúcar", total: 8.99 }
      ]
    }
  }
}
</script>