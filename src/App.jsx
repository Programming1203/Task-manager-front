import { AuthProvider } from './context/AuthContext'
import Routers from './routes/Routes'

function App() {
  return (
    <>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </>
  )
}

export default App
