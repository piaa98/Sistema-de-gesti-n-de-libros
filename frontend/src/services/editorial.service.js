import axios from "./axios.conf.js";
const obtenerTodos = async () => {
    const resp = await axios.get("/editoriales");
    return resp.data;
};

export default {
    obtenerTodos
};