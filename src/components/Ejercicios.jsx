import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { db } from "../firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Home } from "lucide-react"

export default function Ejercicios(){

const { id } = useParams()
const navigate = useNavigate()

const [rutina,setRutina] = useState(null)
const [index,setIndex] = useState(0)
const [peso,setPeso] = useState("")
const [terminado,setTerminado] = useState(false)
useEffect(()=>{

const cargar = async()=>{

const ref = doc(db,"rutinas",id)
const snap = await getDoc(ref)

if(snap.exists()){

const data = snap.data()

setRutina(data)

if(data.ejercicios.length > 0){
setPeso(data.ejercicios[0].peso ?? "")
}

}

}

cargar()

},[])

if(!rutina) return <p className="p-4">Cargando...</p>

const ejercicio = rutina.ejercicios[index]

const guardarPeso = async ()=>{

const ref = doc(db,"rutinas",id)

const ejercicios = [...rutina.ejercicios]

const progreso = ejercicios[index].progreso || []

const pesoNumero = Number(peso)

progreso.push({
peso: pesoNumero,
fecha: new Date().toISOString()
})

ejercicios[index].peso = pesoNumero
ejercicios[index].progreso = progreso

await updateDoc(ref,{
ejercicios
})

setRutina({
...rutina,
ejercicios
})

}

const siguiente = async ()=>{

await guardarPeso()

if(index < rutina.ejercicios.length - 1){

const nuevoIndex = index + 1

setIndex(nuevoIndex)

setPeso(rutina.ejercicios[nuevoIndex].peso ?? "")

}else{

setTerminado(true)

}

}
if(terminado){

return(

<div className="flex flex-col bg-orange-500 items-center justify-center h-screen gap-6">

<h1 className="text-3xl text-white font-bold">
Muy bien ermano 💪
</h1>

<button
onClick={()=>navigate("/rutinas")}
className="bg-green-500 text-white p-4 rounded">

Volver al menú

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

<p className="text-4xl text-white text-center mt-4">
{ejercicio.reps}
</p>

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
className="bg-green-500 text-white p-4 rounded text-lg">

Siguiente

</button>

</div>

)

}