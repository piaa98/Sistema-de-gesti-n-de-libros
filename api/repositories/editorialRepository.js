import RepositorioBase from "./repositorioBase.js";
import Editorial from "../models/editorial.js";

class EditorialRepository extends RepositorioBase {
  constructor() {
    super(Editorial);
  }

  async obtenerTodos() {
    return this.modelo.findAll({
      order: [["nombre", "ASC"]]
    });
  }
}

export default new EditorialRepository();
