import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BackButton from "./BackButton"


import { db } from "../firebase/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function Progreso(){

const { id } = useParams()
const navigate = useNavigate()

const [rutina,setRutina] = useState(null)

useEffect(()=>{

const cargar = async()=>{

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

if(snap.exists()){
setRutina(snap.data())
}

}

cargar()

},[])

if(!rutina) return <p className="p-4">Cargando...</p>

return(

<div className="p-4 space-y-3">
<BackButton />
<h1 className="text-xl font-bold">
Progreso
</h1>

{rutina.ejercicios.map((e,i)=>(

<div
key={i}
onClick={()=>navigate(`/miprogreso/${id}/${i}`)}
className="bg-orange-500 p-4 rounded shadow">

<div className="font-semibold text-white">
{e.nombre}
</div>

<div className="text-sm text-white">
Peso actual: {e.peso}
</div>

</div>

))}

</div>

)

}