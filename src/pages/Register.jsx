import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH_HOME, PATH_LOGIN } from '../routes/constants'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
      navigate(PATH_HOME)
    } catch (error) {
      console.error('Error en el registro:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <a href={PATH_LOGIN} className="text-orange-500 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  )
}
