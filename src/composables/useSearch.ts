import { ref } from 'vue'

// Búsqueda global compartida entre componentes
export const searchQuery = ref('')

export function setSearchQuery(value: string) {
  searchQuery.value = value
}

export function clearSearchQuery() {
  searchQuery.value = ''
}

export default function useSearch() {
  return { searchQuery, setSearchQuery, clearSearchQuery }
}
