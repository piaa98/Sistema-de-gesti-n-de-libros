import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import editorialService from "../services/editorial.service.js"
import libroService from "../services/libro.service.js"
import '@fortawesome/fontawesome-free/css/all.min.css';


const LibrosTabla = () => {
    const [libros, setLibros] = useState([])
    const [editoriales, setEditoriales] = useState([])
    const [filtros, setFiltros] = useState({ texto: "", idEditorial: "", copiasVendidas: "", puntuacion: "" })

    const [filtrado, setfiltrado] = useState({ cantidad: 0 });
    const [total, setTotal] = useState({ cantidad: 0 });
    
    const navigate = useNavigate();

    const obtenerFiltrado = async () => {
      const data = await libroService.contarFiltrado(filtros);
      console.log("Filtrado:", data);
      setfiltrado(data);
    };

    const obtenerTotal = async () => {
      const data = await libroService.obtenerTodosSinFiltro();
      console.log("Total:", data);
      setTotal(data);
    };

    const cargarLibros = async () => {
        const libros = await libroService.obtenerTodos()
        setLibros(libros)
    } 

    const cargarEditoriales = async () => {
        const editoriales = await editorialService.obtenerTodos()
        setEditoriales(editoriales)
        }

    const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) { 
        await libroService.eliminar(id);
        await cargarLibros();
    }
    }

    useEffect(() => {
      cargarLibros();
      cargarEditoriales();
      obtenerFiltrado();
      obtenerTotal(); 
    }, []);

    // busco libros filtrados por texto
    const buscar = async () => {
    const librosFiltrados = await libroService.buscarFiltrado(filtros);
        setLibros(librosFiltrados);
    await obtenerFiltrado();
    };

    //cambio
    const limpiarFiltros = async () => {
          // limpio los filtros y vuelvo a cargar todos los libros
        setFiltros({ texto: "", idEditorial: "", copiasVendidas: "", puntuacion: ""});
        await cargarLibros();
      await obtenerFiltrado();
    };

  function estrellas(puntuacion) {
    let estrellas = 1;
    if (puntuacion >= 80 && puntuacion <= 100) estrellas = 5;
    else if (puntuacion >= 60) estrellas = 4;
    else if (puntuacion >= 40) estrellas = 3;
    else if (puntuacion >= 20) estrellas = 2;
    return "⭐".repeat(estrellas);
  }

function banderaPais(pais) {
    switch (pais || "") {
        case "Argentina": return <img src="https://flagcdn.com/ar.svg" alt="Argentina" width={50} />;
        case "España": return <img src="https://flagcdn.com/es.svg" alt="España" width={50} />;
        case "Estados Unidos": return <img src="https://flagcdn.com/us.svg" alt="Estados Unidos" width={50} />;
        case "Francia": return <img src="https://flagcdn.com/fr.svg" alt="Francia" width={50} />;
        case "Reino Unido": return <img src="https://flagcdn.com/gb.svg" alt="Reino Unido" width={50} />;
        case "Alemania": return <img src="https://flagcdn.com/de.svg" alt="Alemania" width={50} />;
        case "Japón": return <img src="https://flagcdn.com/jp.svg" alt="Japón" width={50} />;
        case "Italia": return <img src="https://flagcdn.com/it.svg" alt="Italia" width={50} />;
        case "México": return <img src="https://flagcdn.com/mx.svg" alt="México" width={50} />;
        case "Brasil": return <img src="https://flagcdn.com/br.svg" alt="Brasil" width={50} />;
        default: return <span>❓</span>;
    }
}

  return (
    <div className="container-fluid my-4">
      <h2 className="mb-4">Listado de libros</h2>
      <form className="row g-3 mb-4">

        <div className="col-md-4">
          <label className="form-label">Buscar</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título, autor o género"
            value={filtros.texto}
            onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Cantidad minima de copias vendidas</label>
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad minima de copias vendidas"
            value={filtros.copiasVendidas}
            onChange={(e) => setFiltros({ ...filtros, copiasVendidas: e.target.value })}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Buscar</label>
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad minima de puntuacion"
            value={filtros.puntuacion}
            onChange={(e) => setFiltros({ ...filtros, puntuacion: e.target.value })}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Editorial</label>
          <select
            className="form-select"
            value={filtros.idEditorial}
            onChange={(e) => setFiltros({ ...filtros, idEditorial: e.target.value })}>
            <option value="">Todas</option>
            {editoriales.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        {/* Botones filtrar  buscar que llaman a sus respepctivas funciones */}
        <div className="col-12 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-primary btn-pink " onClick={buscar}>Filtrar</button>
          <button type="button" className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar</button>
        </div>

      </form>

      <table className="table table-striped table-bordered align-middle">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Año de Publicación</th>
            <th>Género</th>
            <th>Editorial</th>
            <th>ISBN</th>
            <th>Puntuacion</th>
            <th>Copias vendidas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => {
            const bandera = banderaPais(libro.editorial?.pais);
            const puntuacion = estrellas(libro.puntuacion)          
            return (
              <tr key={libro.id}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.anioPublicacion}</td>
                <td>{libro.genero}</td>
                <td>{bandera} {libro.editorial?.nombre}</td>
                <td>{libro.isbn}</td>
                <td>{puntuacion}</td>
                <th>{libro.copiasVendidas}</th>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/libros/editar/${libro.id}`)}
                  >
                  <i className="fa fa-pen"></i>
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(libro.id)}
                  >
                    <i className="fa fa-trash"></i>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3>Libros Filtrados:</h3>
      <p>{filtrado.cantidad ?? 0}</p>
      <h3>Libros Mostrados:</h3>
      <p>{libros.length}</p>
      <h3>Libros Totales</h3>
      <p>{total.cantidad ?? 0}</p>
    </div>
  );
};

// const handleChange = (e) => {
//   console.log(e);            // Objeto evento completo
//   console.log(e.target);      // Elemento HTML que disparó el evento
//   console.log(e.target.value); // Valor actual del input
// };

export default LibrosTabla;