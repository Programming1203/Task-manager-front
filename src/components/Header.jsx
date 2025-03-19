import { useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
  const { user, handleLogout } = useContext(AuthContext)

  return (
    <header className="bg-orange-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Task Manager</h1>
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-white text-2xl" />
          <span className="text-white font-medium">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}
