import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

// detectar sesión guardada
useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth,(user)=>{

if(user){
navigate("/rutinas")
}

})

return ()=>unsubscribe()

},[navigate])

const login = async (e) => {

e.preventDefault()

try{

await signInWithEmailAndPassword(auth,email,password)

navigate("/rutinas")

}catch(err){

try{

await createUserWithEmailAndPassword(auth,email,password)

navigate("/rutinas")

}catch(createErr){

alert(createErr.message)

}

}

}

return(

<div className="flex items-center justify-center h-screen">

<form
onSubmit={login}
className="bg-white p-6 rounded-xl shadow w-80 space-y-4">

<h1 className="text-xl font-bold text-center">
Login / Registro
</h1>

<input
className="w-full border p-2 rounded"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="w-full border p-2 rounded"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="w-full bg-orange-500 text-white py-2 rounded">
Entrar
</button>

</form>

</div>

)

}