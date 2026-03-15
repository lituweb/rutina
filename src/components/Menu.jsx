import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

export default function Menu(){

const navigate = useNavigate()

return(

<div className="p-4">

<h1 className="text-2xl font-bold mb-4">
Rutinas
</h1>

<button
onClick={()=>navigate("/rutinas")}
className="w-full bg-orange-500 text-white p-4 rounded mb-3">

Ver Rutinas

</button>

<button
onClick={()=>navigate("/agregar")}
className="flex items-center gap-2 bg-orange-400 text-white p-4 rounded">

<Plus size={20}/>
Agregar Rutina

</button>

</div>

)
}