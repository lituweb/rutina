import { useState } from "react"
import { db, auth } from "../firebase/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton"
import { Trash } from "lucide-react"

export default function Agregar(){

const navigate = useNavigate()
const [guardando,setGuardando] = useState(false)
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
const eliminarEjercicio = (index)=>{

if(ejercicios.length === 1) return

const nuevos = ejercicios.filter((_,i)=> i !== index)

setEjercicios(nuevos)

}
const formatearPeso = (peso) => {

if(!peso) return null

return Number(peso)

}
const guardarRutina = async ()=>{

try{

setGuardando(true)

const user = auth.currentUser

const ejerciciosValidos = ejercicios.filter(e => 
e.nombre.trim() !== ""
)

if(ejerciciosValidos.length === 0){
alert("Agrega al menos un ejercicio")
setGuardando(false)
return
}

const ejerciciosFormateados = ejerciciosValidos.map(e => ({
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

navigate("/rutinas")

}catch(err){

console.log(err)
alert("Error guardando rutina")
setGuardando(false)

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

<div key={i} className="bg-orange-100 p-3 rounded shadow space-y-2">

<input
placeholder="Ejercicio"
className="border bg-white p-2 w-full rounded"
value={e.nombre}
onChange={(ev)=>cambiarEjercicio(i,"nombre",ev.target.value)}
/>

<input
placeholder="Repeticiones"
className="border bg-white p-2 w-full rounded"
value={e.reps}
onChange={(ev)=>cambiarEjercicio(i,"reps",ev.target.value)}
/>

<input
type="number"
placeholder="Peso"
className="border bg-white p-2 w-full rounded"
value={e.peso}
onChange={(ev)=>cambiarEjercicio(i,"peso",ev.target.value.replace(/[^0-9.]/g,""))}
/>

<input
placeholder="Especificacion (opcional)"
className="border bg-white p-2 w-full rounded"
value={e.especificacion}
onChange={(ev)=>cambiarEjercicio(i,"especificacion",ev.target.value)}
/>

<button
onClick={()=>eliminarEjercicio(i)}
className="text-red-500"
>
<Trash size={18}/>
</button>
</div>

))}

<button
onClick={agregarEjercicio}
className="bg-orange-400 text-white px-3 py-1 rounded">

+

</button>

<button
onClick={guardarRutina}
disabled={guardando}
className={`p-3 rounded w-full text-white ${
guardando ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600"
}`}>

{guardando ? "Guardando..." : "Guardar rutina"}

</button>

</div>

)
}