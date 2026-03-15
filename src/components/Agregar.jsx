import { useState } from "react"
import { db, auth } from "../firebase/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton"


export default function Agregar(){

const navigate = useNavigate()

const [titulo,setTitulo] = useState("")

const [ejercicios,setEjercicios] = useState([
  {nombre:"",reps:"",peso:"",especificacion:""}
])

const agregarEjercicio = ()=>{

setEjercicios([
...ejercicios,
{nombre:"",reps:"",peso:"",especificacion:""}
])

}

const cambiarEjercicio = (index,campo,valor)=>{

const nuevos = [...ejercicios]

nuevos[index][campo] = valor

setEjercicios(nuevos)

}
const formatearPeso = (peso) => {

if(!peso) return null

return Number(peso)

}
const guardarRutina = async ()=>{

try{

const user = auth.currentUser

const ejerciciosFormateados = ejercicios.map(e => ({
...e,
peso: formatearPeso(e.peso)
}))

await addDoc(collection(db,"rutinas"),{

userId: user.uid,
titulo: titulo,
ejercicios: ejerciciosFormateados,
created: new Date()

})

alert("Rutina guardada")

navigate("/menu")

}catch(err){

console.log(err)
alert("Error guardando rutina")

}

}

return(

<div className="p-4 space-y-4">
<BackButton />
<h1 className="text-xl font-bold">
Nueva Rutina
</h1>

<input
placeholder="Titulo"
className="border p-2 w-full rounded"
value={titulo}
onChange={(e)=>setTitulo(e.target.value)}
/>

{ejercicios.map((e,i)=>(

<div key={i} className="bg-white p-3 rounded shadow space-y-2">

<input
placeholder="Ejercicio"
className="border p-2 w-full rounded"
value={e.nombre}
onChange={(ev)=>cambiarEjercicio(i,"nombre",ev.target.value)}
/>

<input
placeholder="Repeticiones"
className="border p-2 w-full rounded"
value={e.reps}
onChange={(ev)=>cambiarEjercicio(i,"reps",ev.target.value)}
/>

<input
type="number"
placeholder="Peso"
className="border p-2 w-full rounded"
value={e.peso}
onChange={(ev)=>cambiarEjercicio(i,"peso",ev.target.value.replace(/[^0-9.]/g,""))}
/>

<input
placeholder="Especificacion (opcional)"
className="border p-2 w-full rounded"
value={e.especificacion}
onChange={(ev)=>cambiarEjercicio(i,"especificacion",ev.target.value)}
/>

</div>

))}

<button
onClick={agregarEjercicio}
className="bg-orange-400 text-white px-3 py-1 rounded">

+

</button>

<button
onClick={guardarRutina}
className="bg-orange-600 text-white p-3 rounded w-full">

Guardar rutina

</button>

</div>

)
}