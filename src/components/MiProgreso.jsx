import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { db } from "../firebase/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function MiProgreso(){

const { id, ejercicio } = useParams()

const [datos,setDatos] = useState([])

useEffect(()=>{

const cargar = async()=>{

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

const rutina = snap.data()

setDatos(rutina.ejercicios[ejercicio].progreso || [])

}

cargar()

},[])

return(

<div className="p-4">

<h1 className="text-xl font-bold mb-4">
Historial de peso
</h1>

<table className="w-full">

<thead>
<tr>
<th>Fecha</th>
<th>Peso</th>
</tr>
</thead>

<tbody>

{datos.map((d,i)=>(

<tr key={i}>
<td>{new Date(d.fecha).toLocaleDateString()}</td>
<td>{d.peso}</td>
</tr>

))}

</tbody>

</table>

</div>

)

}