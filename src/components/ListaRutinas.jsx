import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"
import { deleteDoc, doc } from "firebase/firestore"
import { db, auth } from "../firebase/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

import { Pencil, Activity, Plus } from "lucide-react"

export default function ListaRutinas(){

const navigate = useNavigate()

const [rutinas,setRutinas] = useState([])

useEffect(()=>{

const cargarRutinas = async()=>{

const user = auth.currentUser

if(!user) return

const q = query(
collection(db,"rutinas"),
where("userId","==",user.uid)
)

const snapshot = await getDocs(q)

const lista = snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}))

setRutinas(lista)

}

cargarRutinas()

},[])

return(

<div className="p-4 space-y-4">

<div className="flex justify-between mb-7 items-center">

<h1 className="text-2xl font-bold">
Rutinas
</h1>

<button
onClick={()=>navigate("/agregar")}
className="bg-orange-500 text-white p-2 rounded">

<Plus/>

</button>

</div>

{rutinas.map((r)=>(

<div
key={r.id}
onClick={()=>navigate(`/ejercicios/${r.id}`)}
className="flex justify-between items-center bg-orange-500 p-4 rounded-xl shadow">

<button
className="text-white"
onClick={(e)=>{
e.stopPropagation()
navigate(`/progreso/${r.id}`)
}}>

<Activity/>

</button>

<div className="flex-1 text-center text-white font-semibold">
{r.titulo}
</div>

<button
className="text-white"
onClick={(e)=>{
e.stopPropagation()
navigate(`/editar/${r.id}`)
}}>

<Pencil/>

</button>

</div>

))}

{rutinas.length === 0 && (

<p className="text-center text-gray-500 mt-10">
No hay rutinas todavía
</p>

)}

</div>

)

}