import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LibrosTabla from "./pages/LibrosTabla";
import FormularioLibro from "./pages/FormularioLibro";
import Encabezado from "./components/Encabezado";
import Pie from "./components/Pie";
import "./App.css"; 
  // lógica funcional previa a la construcción del resultado renderizable del componente

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid mt-5 md-10">
      <Encabezado />
      <Routes>
        <Route path="/" element={<Navigate to="/libros/lista" />} />
        <Route path="/libros/lista" element={<LibrosTabla />} />
        <Route path="/libros/crear" element={<FormularioLibro  />} />
        <Route path="/libros/editar/:id" element={<FormularioLibro />} />
      </Routes>
      <Pie />
      </div>
    </BrowserRouter>
  );
}

export default App;
