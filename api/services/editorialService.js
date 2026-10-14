import editorialRepository from "../repositories/editorialRepository.js";

class editorialService {
  async obtenerTodas() {
    return await editorialRepository.obtenerTodos();
  }
}

export default new editorialService();
