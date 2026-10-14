import axios from "./axios.conf.js";

const obtenerTodos = async () => {
    const resp = await axios.get("/libros");
    return resp.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`/libros/${id}`);
    return response.data;
};

const crear = async (libro) => {
    const response = await axios.post("/libros", libro);
    return response.data;
};

const actualizar = async (id, libro) => {
    const response = await axios.put(`/libros/${id}`, libro);
    return response.data;
};

const eliminar = async (id) => {
    await axios.delete(`/libros/${id}`);
};

const buscarFiltrado = async (filtros) => {
  const params = new URLSearchParams(filtros).toString();
  const response = await axios.get(`/libros/filtrar?${params}`);
  return response.data;
};

const contarFiltrado = async (filtros) => {
  const params = new URLSearchParams(filtros).toString();
  const response = await axios.get(`/libros/filtrar/contar?${params}`);
  return response.data; ;
};

const obtenerTodosSinFiltro = async () => {
  const response = await axios.get("/libros/todos");
  return { cantidad: response.data.length };
};

export default {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    buscarFiltrado,
    contarFiltrado,
    obtenerTodosSinFiltro
};


