import { Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import Login from "./components/Login"
import Menu from "./components/Menu"
import ListaRutinas from "./components/ListaRutinas"
import Agregar from "./components/Agregar"
import Editar from "./components/Editar"
import Ejercicios from "./components/Ejercicios"
import Progreso from "./components/Progreso"
import MiProgreso from "./components/MiProgreso"


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/rutinas" element={<ListaRutinas />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/editar/:id" element={<Editar />} />
        <Route path="/ejercicios/:id" element={<Ejercicios />} />
        <Route path="/progreso/:id" element={<Progreso />} />
        <Route path="/miprogreso/:id" element={<MiProgreso />} />

      </Routes>

    </div>
  )
}