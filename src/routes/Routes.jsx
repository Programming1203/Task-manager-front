import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicProtectedRoute from './PublicProtectedRoute'
import PrivateProtectedRoute from './PrivateProtectedRoute'
import { PATH_HOME, PATH_LOGIN, PATH_REGISTER } from './constants'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'

export default function Routers() {
  return (
    <div>
      <Routes>
        <Route
          path={PATH_REGISTER}
          element={
            <PublicProtectedRoute>
              <Register />
            </PublicProtectedRoute>
          }
        />
        <Route
          path={PATH_LOGIN}
          element={
            <PublicProtectedRoute>
              <Login />
            </PublicProtectedRoute>
          }
        />
        <Route
          path={PATH_HOME}
          element={
            <PrivateProtectedRoute>
              <Home />
            </PrivateProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={PATH_LOGIN} />} />
        <Route path="*" element={<h1>Pagina no encontrada</h1>} />
      </Routes>
    </div>
  )
}
