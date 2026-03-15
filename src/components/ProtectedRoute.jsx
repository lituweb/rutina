import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, user, loading }) {

if(loading){
return <p className="p-4">Cargando...</p>
}

if(!user){
return <Navigate to="/" replace />
}

return children

}