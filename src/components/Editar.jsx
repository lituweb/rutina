import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"
import { db } from "../firebase/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import BackButton from "./BackButton"


export default function Editar(){

const { id } = useParams()
const navigate = useNavigate()

const [titulo,setTitulo] = useState("")
const [ejercicios,setEjercicios] = useState([])

useEffect(()=>{

const cargar = async()=>{

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

if(snap.exists()){

const data = snap.data()

setTitulo(data.titulo)
setEjercicios(data.ejercicios)

}

}

cargar()

},[])
const formatearPeso = (peso) => {

if(!peso) return null

return Number(peso)

}
const cambiar = (i,campo,valor)=>{

const copia = [...ejercicios]

copia[i][campo] = valor

setEjercicios(copia)

}

const eliminar = (index)=>{

const nuevos = ejercicios.filter((_,i)=> i !== index)

setEjercicios(nuevos)

}

const agregar = ()=>{

setEjercicios([
...ejercicios,
{nombre:"",reps:"",peso:"",especificacion:"",progreso:[]}
])

}

const guardar = async()=>{

const ref = doc(db,"rutinas",id)

const ejerciciosFormateados = ejercicios.map(e => ({
...e,
peso: formatearPeso(e.peso)
}))

await updateDoc(ref,{
titulo,
ejercicios: ejerciciosFormateados
})

alert("Rutina actualizada")

navigate("/rutinas")

}
const eliminarRutina = async () => {

const confirmar = confirm("¿Seguro que quieres eliminar esta rutina?")

if(!confirmar) return

const ref = doc(db,"rutinas",id)

await deleteDoc(ref)

navigate("/rutinas")

}
return(

<div className="p-4 space-y-4">
<BackButton/>
<h1 className="text-xl font-bold">
Editar rutina
</h1>

<input
className="border p-2 w-full"
value={titulo}
onChange={(e)=>setTitulo(e.target.value)}
/>

{ejercicios.map((e,i)=>(

<div key={i} className="bg-orange-100 p-3 rounded shadow space-y-2">

<input
className="border bg-white p-2 w-full"
value={e.nombre}
onChange={(ev)=>cambiar(i,"nombre",ev.target.value)}
/>

<input
className="border bg-white p-2 w-full"
value={e.reps}
onChange={(ev)=>cambiar(i,"reps",ev.target.value)}
/>

<input
type="number"
placeholder="Peso"
className="border bg-white p-2 w-full rounded"
value={e.peso ?? ""}
onChange={(ev)=>cambiar(i,"peso",ev.target.value.replace(/[^0-9.]/g,""))}
/>

<input
className="border bg-white p-2 w-full"
value={e.especificacion}
onChange={(ev)=>cambiar(i,"especificacion",ev.target.value)}
/>

<button
onClick={()=>eliminar(i)}
className="text-red-500">

<Trash/>

</button>

</div>

))}

<button
onClick={agregar}
className="bg-orange-400 text-white py-1 px-3 rounded ">

+

</button>

<button
onClick={guardar}
className="bg-green-600 text-white p-3 rounded w-full">

Guardar cambios

</button>
<button
onClick={eliminarRutina}
className="bg-red-500 text-white p-3 rounded w-full">

Eliminar rutina

</button>

</div>

)

}