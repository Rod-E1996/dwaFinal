import { ref, computed } from 'vue'
import { useAuth } from '../firebase/auth'

const isOpen = ref(false)
const ADMIN_EMAIL = 'rjgespinoza96@gmail.com'

export function useSidebar() {
  // current user from auth (may be null before auth finishes initializing)
  const currentUser = useAuth.getCurrentUser()

  // reactive mirror of sessionStorage so UI updates when we call setAdmin
  const adminStored = ref(sessionStorage.getItem('isAdmin') === 'true')

  const isAdmin = computed(() => {
    // consider user email OR previously stored admin flag in sessionStorage
    return (currentUser?.email === ADMIN_EMAIL) || adminStored.value
  })

  function setAdmin(flag: boolean) {
    adminStored.value = !!flag
    if (flag) sessionStorage.setItem('isAdmin', 'true')
    else sessionStorage.removeItem('isAdmin')
  }

  return {
    isOpen,
    isAdmin,
    setAdmin
  }
}
