<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">

    <!-- Título -->
    <h2 class="text-center text-3xl md:text-4xl font-extrabold text-blue-700 mb-8">
      <a href="#" class="hover:text-blue-800 flex items-center justify-center gap-2">
        Supermercados El Económico
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      </a>
    </h2>

    <!-- Formulario -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h4 class="text-2xl font-extrabold text-center mb-6 text-gray-700">Crear Cuenta</h4>

      <form @submit.prevent="registrar">
        <div class="mb-4">
          <label for="fullname" class="block text-gray-600 font-medium mb-1">Nombre Completo</label>
          <input v-model="form.fullname" type="text" id="fullname" placeholder="Ej: Mario Garcia"
                 class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-600 font-medium mb-1">Correo Electrónico</label>
          <input v-model="form.email" type="email" id="email" placeholder="mg24@gmail.com"
                 class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-600 font-medium mb-1">Contraseña</label>
          <input v-model="form.password" type="password" id="password"
                 class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>

        <div class="mb-6">
          <label for="confirm-password" class="block text-gray-600 font-medium mb-1">Confirmar Contraseña</label>
          <input v-model="form.confirmPassword" type="password" id="confirm-password"
                 class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>

        <div class="flex flex-col gap-3">
          <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Registrarse
          </button>
          <a href="./login.html" class="w-full text-center border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-100 transition">
            Ya tengo cuenta
          </a>
        </div>
      </form>
    </div>

    <!-- TOAST -->
    <transition name="fade">
      <div v-if="toast.show"
           class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd" />
        </svg>
        <span>{{ toast.message }}</span>
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

      // Aquí iría la lógica de registro (API)
      this.showToast("Registro exitoso 🎉");

      // Reiniciamos formulario
      this.form.fullname = '';
      this.form.email = '';
      this.form.password = '';
      this.form.confirmPassword = '';
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
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
