import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Trash } from "lucide-react"
import { db } from "../firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import BackButton from "./BackButton"
export default function MiProgreso(){

const { id, ejercicio } = useParams()

const [datos,setDatos] = useState([])

const [nombreEjercicio,setNombreEjercicio] = useState("")
useEffect(()=>{

const cargar = async()=>{

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

const rutina = snap.data()

const ejercicioActual = rutina.ejercicios[ejercicio]

setNombreEjercicio(ejercicioActual.nombre)
setDatos(ejercicioActual.progreso || [])

}

cargar()

},[])
const eliminar = async (index) => {

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

const rutina = snap.data()

const progreso = rutina.ejercicios[ejercicio].progreso || []

// eliminar fila
let nuevoProgreso = progreso.filter((_,i)=> i !== index)

// recalcular semanas
nuevoProgreso = nuevoProgreso.map((item,i)=>({
...item,
semana: i + 1
}))

rutina.ejercicios[ejercicio].progreso = nuevoProgreso

await updateDoc(ref,{
ejercicios: rutina.ejercicios
})

setDatos(nuevoProgreso)

}

return(

<div className="p-4">
<BackButton/>
<h1 className="text-xl font-bold mb-4">
Progreso <span className="text-orange-700 text-xl">{nombreEjercicio}</span>
</h1>


<table className="w-full text-center border-collapse overflow-hidden rounded-lg shadow">

<thead className="bg-orange-500 text-white">
<tr>
<th className="p-3">Semana</th>
<th className="p-3">Peso</th>
<th className="p-3">Reps</th>
<th className="p-3"></th>
</tr>
</thead>

<tbody className="bg-white">

{datos.map((d,i)=>(

<tr
key={i}
className="border-b hover:bg-orange-50 transition"
>

<td className="p-3 font-semibold">
{d.semana}
</td>

<td className="p-3">
{d.peso} kg
</td>

<td className="p-3">
{d.reps}
</td>

<td className="p-3">
<button
onClick={()=>eliminar(i)}
className="text-red-500 hover:text-red-700 transition"
>
<Trash size={18}/>
</button>
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}