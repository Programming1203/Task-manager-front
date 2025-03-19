import { useContext } from 'react'
import { PATH_HOME } from './constants'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function PublicProtectedRoute({
  children,
  redirectPath = PATH_HOME,
}) {
  const { user } = useContext(AuthContext)
  return !user ? children : <Navigate to={redirectPath} />
}
