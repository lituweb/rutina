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
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase"
import { Navigate } from "react-router-dom"

export default function App() {
const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth,(u)=>{
setUser(u)
setLoading(false)
})

return ()=>unsubscribe()

},[])

if(loading){
return <p className="p-4">Cargando...</p>
}

return (

<div className="min-h-screen bg-gray-50 text-gray-800">

<Routes>

<Route path="/" element={user ? <Navigate to="/rutinas" /> : <Login />} />

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