import { Routes, Route } from "react-router-dom"

import Login from "./components/Login"
import Menu from "./components/Menu"
import ListaRutinas from "./components/ListaRutinas"
import Agregar from "./components/Agregar"
import Editar from "./components/Editar"
import Ejercicios from "./components/Ejercicios"
import Progreso from "./components/Progreso"
import MiProgreso from "./components/MiProgreso"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {

return (

<div className="min-h-screen bg-gray-50 text-gray-800">

<Routes>

<Route path="/" element={<Login />} />

<Route path="/menu" element={
<ProtectedRoute>
<Menu/>
</ProtectedRoute>
} />

<Route path="/rutinas" element={
<ProtectedRoute>
<ListaRutinas/>
</ProtectedRoute>
} />

<Route path="/agregar" element={
<ProtectedRoute>
<Agregar/>
</ProtectedRoute>
} />

<Route path="/editar/:id" element={
<ProtectedRoute>
<Editar/>
</ProtectedRoute>
} />

<Route path="/ejercicios/:id" element={
<ProtectedRoute>
<Ejercicios/>
</ProtectedRoute>
} />

<Route path="/progreso/:id" element={
<ProtectedRoute>
<Progreso/>
</ProtectedRoute>
} />

<Route path="/miprogreso/:id" element={
<ProtectedRoute>
<MiProgreso/>
</ProtectedRoute>
} />

</Routes>

</div>

)

}