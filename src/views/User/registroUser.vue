<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center px-4 py-10">

    <!-- Header del sitio -->
    <h2 class="text-center text-4xl font-extrabold text-blue-700 mb-6 tracking-wide flex items-center gap-2">
      Supermercados El Económico
    </h2>

    <!-- Contenedor formulario -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
      <h4 class="text-2xl font-bold text-center mb-6 text-gray-700">
        Crear tu cuenta
      </h4>

      <form @submit.prevent="registrar" class="space-y-4">

        <!-- Nombre Completo -->
        <div>
          <label for="fullname" class="block text-gray-600 font-semibold mb-1">
            Nombre completo
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-blue-500">
              <i class="fa-solid fa-user"></i>
            </span>
            <input v-model="form.fullname" type="text" id="fullname"
                   class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                   placeholder="Ejemplo: Mario García" required>
          </div>
        </div>

        <!-- Correo -->
        <div>
          <label for="email" class="block text-gray-600 font-semibold mb-1">
            Correo Electrónico
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-blue-500">
              <i class="fa-solid fa-envelope"></i>
            </span>
            <input v-model="form.email" type="email" id="email"
                   class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                   placeholder="correo@ejemplo.com" required>
          </div>
        </div>

        <!-- Contraseña -->
        <div>
          <label for="password" class="block text-gray-600 font-semibold mb-1">
            Contraseña
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-blue-500">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input v-model="form.password" type="password" id="password"
                   class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                   placeholder="********" required>
          </div>
        </div>

        <!-- Confirmar Contraseña -->
        <div class="mb-2">
          <label for="confirm-password" class="block text-gray-600 font-semibold mb-1">
            Confirmar contraseña
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-blue-500">
              <i class="fa-solid fa-key"></i>
            </span>
            <input v-model="form.confirmPassword" type="password" id="confirm-password"
                   class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                   placeholder="********" required>
          </div>
        </div>

        <!-- Botones -->
        <div class="space-y-3">
          <button type="submit"
                  class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition active:scale-95 shadow-md">
            Registrarme
          </button>
          <a href="./login.html"
             class="w-full block text-center border border-blue-600 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition">
            Ya tengo cuenta
          </a>
        </div>
      </form>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toast.show"
           class="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2">
        <i class="fa-solid fa-circle-check"></i>
        <span class="font-medium">{{ toast.message }}</span>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      toast: {
        show: false,
        message: ''
      }
    };
  },
  methods: {
    registrar() {
      if (this.form.password !== this.form.confirmPassword) {
        this.showToast("Las contraseñas no coinciden");
        return;
      }

      this.showToast("Registro exitoso");
      this.form = { fullname: '', email: '', password: '', confirmPassword: '' };
    },
    showToast(message) {
      this.toast.message = message;
      this.toast.show = true;
      setTimeout(() => this.toast.show = false, 3000);
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>