import { Route, Routes } from 'react-router-dom'
import { Home } from './Component/Views/Home/Component';
import { Login } from './Component/Views/Login/Component';
import { Register } from './Component/Views/Register/Component';
import { Admin } from './Component/Views/Admin/Component';

function App() {
  return (
    <Routes>
      <Route 
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route 
        path="/register"
        element={<Register />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />
      
    </Routes>
  )
}

export default App
