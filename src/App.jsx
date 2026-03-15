import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase"

import Login from "./components/Login"
// import Menu from "./components/Menu"
import ListaRutinas from "./components/ListaRutinas"
import Agregar from "./components/Agregar"
import Editar from "./components/Editar"
import Ejercicios from "./components/Ejercicios"
import Progreso from "./components/Progreso"
import MiProgreso from "./components/MiProgreso"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App(){

const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const unsub = onAuthStateChanged(auth,(u)=>{
setUser(u)
setLoading(false)
})

return ()=>unsub()

},[])

return(

<Routes>

<Route path="/" element={<Login />} />

{/* <Route path="/menu" element={
<ProtectedRoute user={user} loading={loading}>
<Menu/>
</ProtectedRoute>
} /> */}

<Route path="/rutinas" element={
<ProtectedRoute user={user} loading={loading}>
<ListaRutinas/>
</ProtectedRoute>
} />

<Route path="/agregar" element={
<ProtectedRoute user={user} loading={loading}>
<Agregar/>
</ProtectedRoute>
} />

<Route path="/editar/:id" element={
<ProtectedRoute user={user} loading={loading}>
<Editar/>
</ProtectedRoute>
} />

<Route path="/ejercicios/:id" element={
<ProtectedRoute user={user} loading={loading}>
<Ejercicios/>
</ProtectedRoute>
} />

<Route path="/progreso/:id" element={
<ProtectedRoute user={user} loading={loading}>
<Progreso/>
</ProtectedRoute>
} />

<Route path="/miprogreso/:id/:ejercicio" element={
<ProtectedRoute user={user} loading={loading}>
<MiProgreso/>
</ProtectedRoute>
} />

</Routes>

)

}