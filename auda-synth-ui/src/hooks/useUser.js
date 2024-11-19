
import { useAuth } from '../providers/AuthProvider'


export default function useUser() {
  const { user } = useAuth()

  return user
}