import { useContext } from 'react'
import { PATH_LOGIN } from './constants'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function PrivateProtectedRoute({
  children,
  redirectPath = PATH_LOGIN,
}) {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate to={redirectPath} />
}
