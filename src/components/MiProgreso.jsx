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


<table className="w-full text-center">

<thead>
<tr>
<th>Semana</th>
<th>Peso</th>
<th>Reps</th>
<th></th>
</tr>
</thead>

<tbody>

{datos.map((d,i)=>(

<tr key={i}>
<td>{d.semana}</td>
<td>{d.peso} kg</td>
<td>{d.reps}</td>

<td>
<button
onClick={()=>eliminar(i)}
className="text-red-500"
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