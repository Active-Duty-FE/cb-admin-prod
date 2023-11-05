import { useAppDispatch } from '@/hooks/store'
import { updateUsername } from '@/store/modules/user'
import { tokenCrypto } from '@/utils/cryto'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

function AuthRoute({ children }: { children: ReactNode }) {
  const token = window.localStorage.getItem('token')
  const dispatch = useAppDispatch()
  if (token && token !== '') {
    const data = tokenCrypto.decrypt(token, 'my-token')
    console.log(data, 'decrypt data')

    const now = new Date().getTime()
    const duration = now - data.time
    if (duration > 24 * 60 * 60 * 1000) {
      return <Navigate to="/login" />
    } else {
      dispatch(updateUsername(data.username))
      return <>{children}</>
    }
  } else {
    return <Navigate to="/login" />
  }
}

export default AuthRoute
