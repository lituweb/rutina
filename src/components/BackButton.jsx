import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function BackButton(){

const navigate = useNavigate()

return(

<button
onClick={()=>navigate(-1)}
className="flex items-center gap-2 text-gray-600 mb-4">

<ArrowLeft size={20}/>

</button>

)

}