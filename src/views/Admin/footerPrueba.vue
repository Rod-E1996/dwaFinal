<template>
  <footer class="bg-indigo-600 text-white mt-10">
    <div class="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Logo y descripción -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <h2 class="text-2xl font-extrabold mb-2">Supermercados El Económico</h2>
        <p class="text-gray-200 mb-4">
          Tu supermercado de confianza. Encuentra los mejores productos a los mejores precios.
        </p>
        <div class="flex gap-4 justify-center md:justify-start">
          <!-- Facebook -->
          <a href="#" class="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.582 0 0 3.582 0 8c0 3.993 2.924 7.312 6.75 7.938V10.3H4.898v-2.3h1.852V6.312c0-1.828 1.092-2.828 2.768-2.828.802 0 1.64.144 1.64.144v1.802H10.12c-.943 0-1.237.583-1.237 1.183v1.41h2.1l-.336 2.3H8.883v5.638C12.715 15.312 16 11.993 16 8c0-4.418-3.582-8-8-8z"/>
            </svg>
          </a>
          <!-- Twitter -->
          <a href="#" class="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.009-.422A6.676 6.676 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.797 3.286 3.286 0 0 0-5.595 2.993A9.325 9.325 0 0 1 1.114 2.1a3.286 3.286 0 0 0 1.018 4.381A3.323 3.323 0 0 1 .64 6.575v.041a3.284 3.284 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115c-.212 0-.418-.021-.616-.061a3.285 3.285 0 0 0 3.065 2.279A6.588 6.588 0 0 1 .78 13.58 6.32 6.32 0 0 1 0 13.556a9.344 9.344 0 0 0 5.026 1.47"/>
            </svg>
          </a>
          <!-- Instagram -->
          <a href="#" class="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.742 0 5.49.007 4.672.036 3.854.064 3.345.175 2.865.35a4.56 4.56 0 0 0-1.656 1.079A4.56 4.56 0 0 0 .13 3.085c-.175.48-.286.989-.314 1.807C-.007 5.51 0 5.742 0 8s.007 2.49.036 3.308c.028.818.139 1.327.314 1.807.176.48.406.924.71 1.229.305.304.749.534 1.229.71.48.175.989.286 1.807.314.818.028 1.05.036 3.308.036s2.49-.007 3.308-.036c.818-.028 1.327-.139 1.807-.314a4.56 4.56 0 0 0 1.229-.71 4.56 4.56 0 0 0 .71-1.229c.175-.48.286-.989.314-1.807.028-.818.036-1.05.036-3.308s-.007-2.49-.036-3.308c-.028-.818-.139-1.327-.314-1.807a4.56 4.56 0 0 0-.71-1.229A4.56 4.56 0 0 0 13.308.35c-.48-.175-.989-.286-1.807-.314C10.49.007 10.258 0 8 0zm0 1.44c2.22 0 2.483.008 3.358.036.773.027 1.192.124 1.472.206.369.107.63.235.907.512.277.277.405.538.512.907.082.28.179.699.206 1.472.028.875.036 1.138.036 3.358s-.008 2.483-.036 3.358c-.027.773-.124 1.192-.206 1.472a2.602 2.602 0 0 1-.512.907 2.602 2.602 0 0 1-.907.512c-.28.082-.699.179-1.472.206-.875.028-1.138.036-3.358.036s-2.483-.008-3.358-.036c-.773-.027-1.192-.124-1.472-.206a2.602 2.602 0 0 1-.907-.512 2.602 2.602 0 0 1-.512-.907c-.082-.28-.179-.699-.206-1.472C1.448 10.483 1.44 10.22 1.44 8s.008-2.483.036-3.358c.027-.773.124-1.192.206-1.472a2.602 2.602 0 0 1 .512-.907c.277-.277.538-.405.907-.512.28-.082.699-.179 1.472-.206C5.517 1.448 5.78 1.44 8 1.44zM8 3.89a4.11 4.11 0 1 0 0 8.22 4.11 4.11 0 0 0 0-8.22zm0 6.78a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334zm4.406-7.78a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Links rápidos -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <h3 class="text-xl font-extrabold mb-2">Enlaces</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-gray-300 font-medium transition">Inicio</a></li>
          <li><a href="#" class="hover:text-gray-300 font-medium transition">Productos</a></li>
          <li><a href="#" class="hover:text-gray-300 font-medium transition">Carrito</a></li>
          <li><a href="#" class="hover:text-gray-300 font-medium transition">Contacto</a></li>
        </ul>
      </div>

      <!-- Contacto -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <h3 class="text-xl font-extrabold mb-2">Contacto</h3>
        <p class="text-gray-200 mb-2">Correo: soporte@económico.com</p>
        <p class="text-gray-200 mb-2">Tel: +503 1234 5678</p>
        <p class="text-gray-200">Dirección: Edicio F, ITCA FEPADE, Santa Tecla</p>
      </div>

    </div>

    <!-- Derechos -->
    <div class="border-t border-indigo-500 mt-8 py-4 text-center text-gray-200 text-sm">
      &copy; 2025 Supermercados El Económico. Todos los derechos reservados.
    </div>
  </footer>
</template>
