import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH_HOME } from '../routes/constants'
import Swal from 'sweetalert2'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUserData = localStorage.getItem('user')
      return storedUserData ? JSON.parse(storedUserData) : null
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error)
      return null
    }
  })
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  //FUNCION REGISTER (REGISTRO + AUTO LOGIN)
  const register = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro')
      }

      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: `Bienvenido, ${data.user.name}.`,
        timer: 2000,
        showConfirmButton: false,
      })
      navigate(PATH_HOME)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.message || 'Ocurrió un error inesperado.',
      })
      console.error('Error en register:', error.message)
    }
  }

  // FUNCION LOGIN
  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Credenciales incorrectas o error en la autenticación.')
      }

      const data = await response.json()
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))

      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: `Bienvenido, ${data.user.name}.`,
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: error.message || 'Ocurrió un error inesperado.',
      })
      console.error('Error en login:', error.message)
    }
  }

  // 📌 FUNCION LOGOUT
  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      localStorage.removeItem('user')
      setUser(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Funcion Fetch customizada para cerrar sesion si el token expira
  const customFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
    })

    if (response.status === 401) {
      logout()
    }

    return response
  }

  // funcion para llamar el logout
  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Estás a punto de cerrar sesión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ccc',
      cancelButtonColor: '#111',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
      }
    })
  }
  return (
    <AuthContext.Provider
      value={{ user, register, login, handleLogout, customFetch }}
    >
      {children}
    </AuthContext.Provider>
  )
}
