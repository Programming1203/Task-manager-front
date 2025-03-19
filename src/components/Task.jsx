import {
  FaEdit,
  FaTrash,
  FaFlag,
  FaCheckCircle,
  FaPlayCircle,
  FaCircle,
} from 'react-icons/fa'

export default function Task({
  id,
  title,
  description,
  completed,
  priority, // Recibimos la prioridad como prop
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  // Función para mostrar el icono de prioridad adecuado
  const renderPriorityIcon = () => {
    switch (priority) {
      case 'LOW':
        return <FaFlag size={20} className="text-green-500" />
      case 'MEDIUM':
        return <FaFlag size={20} className="text-yellow-500" />
      case 'HIGH':
        return <FaFlag size={20} className="text-red-500" />
      default:
        return null
    }
  }

  // Función para mostrar el icono de estado adecuado
  const renderStatusIcon = () => {
    if (completed) {
      return <FaCheckCircle size={20} className="text-green-500" /> // Completada
    } else if (description) {
      return <FaPlayCircle size={20} className="text-yellow-500" /> // En curso
    } else {
      return <FaCircle size={20} className="text-gray-500" /> // Pendiente
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleComplete(id)}
          className="h-5 w-5 text-orange-500 focus:ring-2 focus:ring-orange-400"
          disabled={completed} // Deshabilitar el checkbox si la tarea está completada
        />
        <div>
          <h3
            className={`text-lg font-semibold ${
              completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm text-gray-600 ${
              completed ? 'line-through' : ''
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Icono de estado */}
        {renderStatusIcon()}

        {/* Icono de prioridad */}
        {renderPriorityIcon()}

        {/* Botón de editar */}
        <button
          onClick={onEdit}
          className={`text-blue-500 hover:text-blue-600 ${
            completed ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={completed} // Deshabilitar el botón si la tarea está completada
        >
          <FaEdit size={20} />
        </button>

        {/* Botón de eliminar */}
        <button
          onClick={() => onDelete(id)}
          className={`text-red-500 hover:text-red-600 ${
            completed ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={completed} // Deshabilitar el botón si la tarea está completada
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  )
}
