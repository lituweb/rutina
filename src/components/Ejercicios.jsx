import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { db } from "../firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Home, ArrowRight } from "lucide-react"
export default function Ejercicios(){

const { id } = useParams()
const navigate = useNavigate()

const [rutina,setRutina] = useState(null)
const [index,setIndex] = useState(0)
const [peso,setPeso] = useState("")
const [terminado,setTerminado] = useState(false)
const [reps,setReps] = useState("")

useEffect(()=>{

const cargar = async()=>{

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

if(snap.exists()){

const data = snap.data()

setRutina(data)

if(data.ejercicios.length > 0){
setPeso(data.ejercicios[0].peso ?? "")
setReps(data.ejercicios[0].reps ?? "")
}

}

}

cargar()

},[])

if(!rutina) return <p className="p-4">Cargando...</p>

const ejercicio = rutina.ejercicios[index]

const guardarDatos = ()=>{

const ejercicios = [...rutina.ejercicios]

ejercicios[index].peso = peso === "" ? "" : Number(peso)
ejercicios[index].reps = reps

setRutina({
...rutina,
ejercicios
})

}

const guardarSemana = async () => {

const ref = doc(db,"rutinas",id)

const ejercicios = [...rutina.ejercicios]

ejercicios.forEach(e => {

const progreso = e.progreso || []

const semana = progreso.length + 1

progreso.push({
semana,
peso: e.peso,
reps: e.reps,
fecha: new Date().toISOString()
})

e.progreso = progreso

})

await updateDoc(ref,{
ejercicios
})

}

const siguiente = async ()=>{

guardarDatos()

if(index < rutina.ejercicios.length - 1){

const nuevoIndex = index + 1

setIndex(nuevoIndex)

setPeso(rutina.ejercicios[nuevoIndex].peso ?? "")
setReps(rutina.ejercicios[nuevoIndex].reps ?? "")

}else{

await guardarSemana()

setTerminado(true)

}

}

if(terminado){

return(

<div className="flex flex-col bg-orange-500 items-center justify-center h-screen gap-6">

<h1 className="text-3xl text-white text-center font-bold">
Rutina finalizada ermano 💪
</h1>

<button
onClick={()=>navigate("/rutinas")}
className="bg-green-500 text-white p-4 rounded">

<Home/>

</button>

</div>

)

}
return(

<div className="p-6 flex flex-col bg-orange-500 justify-between h-screen">

<motion.div
key={index}
initial={{opacity:0, x:50}}
animate={{opacity:1, x:0}}
transition={{duration:0.3}}

>

<div className="flex flex-row justify-between items-center">
    <div onClick={()=>navigate(-1)} className=" text-white">
    <Home/>
    
</div><div className=" text-white">
{index + 1}/{rutina.ejercicios.length}
</div>

</div>

<div className="justify-center items-center mt-40 flex flex-col">
<h2 className="text-5xl text-center text-white font-bold mt-6">
{ejercicio.nombre}
</h2>

{ejercicio.especificacion && (

<p className="text-white text-2xl mt-2">
{ejercicio.especificacion}
</p>

)}

<div className="flex items-center justify-center mt-4 gap-2">

<input
className="text-center w-30 text-white rounded text-2xl"
value={reps}
onChange={(e)=>setReps(e.target.value)}
/>

</div>

<div className="flex items-center justify-center mt-4 gap-2">

<input
type="number"
className=" text-center w-12 text-white rounded text-2xl"
value={peso}
onChange={(e)=>setPeso(e.target.value)}
/>

<span className="text-white text-2xl">kg</span>

</div>
</div>

</motion.div>

<button
onClick={siguiente}
className="bg-green-500 text-center justify-center text-white p-4 rounded text-lg">

<ArrowRight/>

</button>

</div>

)

}