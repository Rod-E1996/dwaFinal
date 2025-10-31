<template>
  <div
    :class="`modal ${!show && 'opacity-0 pointer-events-none'} z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      @click="handleClose"
    />

    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
    >
      <div class="px-6 py-4 text-left modal-content">
        <div class="flex items-center justify-between pb-3" v-if="title">
          <p class="text-2xl font-bold text-gray-700">
            {{ title }}
          </p>
          <div class="z-50 cursor-pointer modal-close" @click="handleClose">
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        show: boolean
        title?: string
    }>()

    const emit = defineEmits<{
        (e: 'close'): void
    }>()

    function handleClose() {
        emit('close')
    }
</script>

<style scoped>
    .modal {
        transition: opacity 0.25s ease;
    }
</style>
