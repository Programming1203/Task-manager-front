import { useContext, useState } from 'react'
import { PATH_HOME, PATH_REGISTER } from '../routes/constants'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // Reiniciar errores previos
    try {
      await login({ email: formData.email, password: formData.password })
      navigate(PATH_HOME)
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Iniciar Sesión
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          ¿Aún no tienes una cuenta?{' '}
          <Link to={PATH_REGISTER} className="text-orange-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
