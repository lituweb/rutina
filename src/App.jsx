import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase"

import Login from "./components/Login"
import Menu from "./components/Menu"
import ListaRutinas from "./components/ListaRutinas"
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

<Route path="/rutinas" element={
<ProtectedRoute user={user} loading={loading}>
<ListaRutinas/>
</ProtectedRoute>
} />

<Route path="/menu" element={
<ProtectedRoute user={user} loading={loading}>
<Menu/>
</ProtectedRoute>
} />

</Routes>

)

}