import { ref, computed } from 'vue'
import { useAuth } from '../firebase/auth'

const isOpen = ref(false)

export function useSidebar() {
  const currentUser = useAuth.getCurrentUser()
  const isAdmin = computed(() => currentUser?.email === 'rjgespinoza96@gmail.com')

  return {
    isOpen,
    isAdmin
  }
}
