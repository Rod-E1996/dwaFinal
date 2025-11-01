<template>
    <div class="min-h-screen px-4">
        <h1 class="text-2xl md:text-3xl text-center font-extrabold text-blue-700 mb-6">
            Usuarios del sistema
            </h1>

        <div class="container mx-auto px-4">
            <div class="bg-white shadow-md rounded-lg p-6">
                <h2 class="text-lg font-semibold text-blue-600 mb-3">
                Lista de usuarios autenticados
                </h2>

                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse text-center">
                        <thead class="text-gray-100 bg-indigo-800">
                            <tr>
                                <th class="py-2 px-3">#</th>
                                <th class="py-2 px-3">Email</th>
                                <th class="py-2 px-3">Nombre</th>
                                <th class="py-2 px-3">UID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-if="filteredUsers.length > 0"
                                v-for="(user, index) in paginatedUsers" :key="user.id" class="border-b hover:bg-gray-50">
                                <td class="py-2 px-3">{{ ((currentPage - 1) * itemsPerPage) + index + 1 }}</td>
                                <td class="py-2 px-3">{{ user.email || '-' }}</td>
                                <td class="py-2 px-3">{{ user.displayName || user.name || '-' }}</td>
                                <td class="py-2 px-3 font-mono text-sm text-gray-700">{{ user.id }}</td>
                            </tr>
                            <tr v-if="filteredUsers.length === 0 && !loadingData">
                                <td colspan="6" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                                    <LoadingAndEmptyState
                                        :loading="false"
                                        empty-message="No hay usuarios para mostrar"
                                        class="py-4"
                                    />
                                </td>
                                </tr>
                                <tr v-if="loadingData">
                                <td colspan="6" class="px-6 py-4 text-lg text-gray-500 text-center border-b">
                                    <LoadingAndEmptyState
                                        :loading="true"
                                        empty-message=""
                                        class="py-4"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Paginación -->
                <div v-if="filteredUsers.length > 0" id="paginationContainer" class="mt-6">
                    <div class="flex justify-between items-center px-4">
                        <div class="text-sm text-gray-700">
                        Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} de {{ filteredUsers.length }} usuarios
                        </div>
                        <div class="flex px-4 bg-white rounded-md">
                            <div class="flex rounded">
                                <button
                                    @click="goToFirstPage"
                                    :disabled="currentPage === 1"
                                    :class="`px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`"
                                    ><span><<</span>
                                </button>

                                <template v-for="page in calculateTotalPages" :key="page">
                                    <button
                                        v-if="page === currentPage || page === 1 || page === calculateTotalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
                                        @click="goToPage(page)"
                                        :class="`px-3 py-2 leading-tight border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white ${currentPage === page ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-700'}`"
                                    >
                                        {{ page }}
                                    </button>
                                    <span v-else-if="page === currentPage - 2 || page === currentPage + 2" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-r-0 border-gray-200">...</span>
                                </template>

                                <button
                                    @click="goToLastPage"
                                    :disabled="currentPage === calculateTotalPages"
                                    :class="`px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white ${currentPage === calculateTotalPages ? 'opacity-50 cursor-not-allowed' : ''}`"
                                    ><span>>></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

// Paginación
<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { useFirestore } from '../../firebase/firestore'
import { searchQuery } from '../../composables/useSearch'
import LoadingAndEmptyState from '../../components/LoadingAndEmptyState.vue'

const usersData = ref<any[]>([])
let loadingData = ref<boolean>(false)

let unsubscribeUsers: (() => void) | null = null

const loadUsers = () => {
    try {
        loadingData.value = true
        unsubscribeUsers = useFirestore.listenCollection('users', (data) => {
            usersData.value = data
            loadingData.value = false
        }) as () => void
    } catch (error) {
        console.error('Error al cargar usuarios desde Firestore:', error)
        usersData.value = []
        loadingData.value = false
    }
}

onMounted(() => {
    loadUsers()
})

onUnmounted(() => {
    if (unsubscribeUsers) unsubscribeUsers()
})

const currentPage = ref(1)
const itemsPerPage = ref(5)

// Filtrado por búsqueda
const filteredUsers = computed(() => {
    loadingData.value = false
    const q = (searchQuery.value || '').toString().trim().toLowerCase()
    if (!q) return usersData.value
    return usersData.value.filter(u => {
        const email = (u.email || '').toString().toLowerCase()
        const name = (u.displayName || u.name || '').toString().toLowerCase()
        const uid = (u.id || u.uid || '').toString().toLowerCase()
        return email.includes(q) || name.includes(q) || uid.includes(q)
    })
})

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredUsers.value.slice(start, end)
})

const calculateTotalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))

function goToPage(page: number) {
    if (page >= 1 && page <= calculateTotalPages.value) currentPage.value = page
}
function goToFirstPage() { currentPage.value = 1 }
function goToLastPage() { currentPage.value = calculateTotalPages.value }

watch(calculateTotalPages, (newVal) => {
    if (currentPage.value > newVal) currentPage.value = newVal || 1
})
</script>