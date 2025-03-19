import { useState, useEffect, useContext } from 'react'
import Task from '../components/Task'
import Header from '../components/Header'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
  const { customFetch } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  // Función para obtener tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await customFetch(`${BACKEND_URL}/api/tasks`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error al obtener las tareas:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Función para editar o crear tareas
  const handleSaveTask = async (taskData) => {
    try {
      const method = taskData.id ? 'PUT' : 'POST'
      const url = taskData.id
        ? `${BACKEND_URL}/api/tasks/${taskData.id}`
        : `${BACKEND_URL}/api/tasks`

      const response = await customFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        Swal.fire({
          title: taskData.id ? 'Tarea actualizada' : 'Tarea creada',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        fetchTasks()
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al guardar la tarea.',
          icon: 'error',
        })
      }
    } catch (error) {
      console.error('Error al guardar la tarea:', error)
    }
  }

  // Función para editar tarea
  const handleEditTask = (task) => {
    Swal.fire({
      title: 'Editar Tarea',
      html: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <input id="title" class="swal2-input" placeholder="Título" value="${
          task.title
        }" style="padding: 10px; font-size: 14px;">
        <textarea id="description" class="swal2-textarea" placeholder="Descripción" style="padding: 10px; font-size: 14px;">${
          task.description
        }</textarea>
        
        <select id="priority" class="swal2-input" style="padding: 10px; font-size: 14px;">
          <option value="LOW" ${
            task.priority === 'LOW' ? 'selected' : ''
          }>Baja</option>
          <option value="MEDIUM" ${
            task.priority === 'MEDIUM' ? 'selected' : ''
          }>Media</option>
          <option value="HIGH" ${
            task.priority === 'HIGH' ? 'selected' : ''
          }>Alta</option>
        </select>
        
        <select id="status" class="swal2-input" style="padding: 10px; font-size: 14px;">
          <option value="PENDING" ${
            task.status === 'PENDING' ? 'selected' : ''
          }>Pendiente</option>
          <option value="IN_PROGRESS" ${
            task.status === 'IN_PROGRESS' ? 'selected' : ''
          }>En Progreso</option>
          <option value="DONE" ${
            task.status === 'DONE' ? 'selected' : ''
          }>Hecho</option>
        </select>
      </div>
    `,
      preConfirm: () => {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const priority = document.getElementById('priority').value
        const status = document.getElementById('status').value

        // Validación de campos vacíos
        if (!title || !description || !priority || !status) {
          Swal.showValidationMessage('Por favor, completa todos los campos.')
          return false
        }

        return { title, description, priority, status, id: task.id }
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveTask(result.value) // Llamamos a la función de guardar
      }
    })
  }

  // Función para eliminar tarea
  const handleDeleteTask = async (id) => {
    // Muestra la alerta de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true, // Cambia el orden de los botones
    })

    // Si el usuario confirma, procede a eliminar la tarea
    if (result.isConfirmed) {
      try {
        const response = await customFetch(`${BACKEND_URL}/api/tasks/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          Swal.fire({
            title: 'Tarea eliminada',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          fetchTasks()
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la tarea.',
            icon: 'error',
          })
        }
      } catch (error) {
        console.error('Error al eliminar la tarea:', error)
      }
    }
  }

  // Función para marcar tarea como completada
  const handleToggleComplete = async (id) => {
    try {
      // Enviamos la solicitud PUT con el estado actualizado
      const response = await customFetch(`${BACKEND_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea JSON
        },
        body: JSON.stringify({
          status: 'DONE', // El estado se envía como 'DONE' para marcar la tarea como completada
        }),
      })

      if (response.ok) {
        Swal.fire({
          title: 'Tarea completada',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        fetchTasks() // Actualiza la lista de tareas después de la actualización
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al completar la tarea.',
          icon: 'error',
        })
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la tarea:', error)
    }
  }

  // Crear nueva tarea (vacío para crear una nueva tarea)
  const handleCreateTask = () => {
    Swal.fire({
      title: 'Crear Tarea',
      html: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <input id="title" class="swal2-input" placeholder="Título" style="padding: 10px; font-size: 14px;">
        <textarea id="description" class="swal2-textarea" placeholder="Descripción" style="padding: 10px; font-size: 14px;"></textarea>
        
        <select id="priority" class="swal2-input" style="padding: 10px; font-size: 14px;">
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
        </select>
        
        <select id="status" class="swal2-input" style="padding: 10px; font-size: 14px;">
          <option value="PENDING">Pendiente</option>
          <option value="IN_PROGRESS">En Progreso</option>
          <option value="DONE">Hecho</option>
        </select>
      </div>
    `,
      preConfirm: () => {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const priority = document.getElementById('priority').value
        const status = document.getElementById('status').value

        // Validación de campos vacíos
        if (!title || !description || !priority || !status) {
          Swal.showValidationMessage('Por favor, completa todos los campos.')
          return false
        }

        return { title, description, priority, status }
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveTask(result.value) // Llamamos a la función de guardar
      }
    })
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <button
          onClick={handleCreateTask}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Crear Tarea
        </button>

        <div className="grid gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.status === 'DONE'}
                priority={task.priority}
                onEdit={() => handleEditTask(task)}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          ) : (
            <p>No hay tareas disponibles.</p>
          )}
        </div>
      </div>
    </>
  )
}
