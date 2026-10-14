import RepositorioBase from "./repositorioBase.js";
import Libro from "../models/libro.js";
import Editorial from "../models/editorial.js";
import { Op } from "sequelize";

class LibroRepository extends RepositorioBase {
  constructor() {
    super(Libro);
  }

  async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
    const offset = (pagina - 1) * limite;
    return this.modelo.findAll({
      limit: limite,
      offset,
      include: {
      model: Editorial,
      as: "editorial"
      },
      order: [["anioPublicacion", "DESC"]]
    });
  }

  async obtenerPorId(id) {
    return this.modelo.findByPk(id, {
      include: {
        model: Editorial,
        as: "editorial"
      }
    });
  }

  async buscarFiltrado({ texto, idEditorial, puntuacion, copiasVendidas } = {}) {
      console.log("Filtros recibidos:", { texto, idEditorial, puntuacion, copiasVendidas });

  const condiciones = [];

  if (texto) {
    condiciones.push({
      [Op.or]: [
        { titulo: { [Op.like]: `%${texto}%` } },
        { autor: { [Op.like]: `%${texto}%` } },
        { genero: { [Op.like]: `%${texto}%` } }
      ]
    });
  }

  if (idEditorial) {
    condiciones.push({ idEditorial });
  }

  if (puntuacion !== "") {
    const puntajeNum = Number(puntuacion);
    if (puntajeNum) {
      condiciones.push({ puntuacion: { [Op.gte]: puntajeNum } });
    }
  }

  if (copiasVendidas !== "") {
    const cantidadNum = Number(copiasVendidas);
    if (cantidadNum) {
      condiciones.push({ copiasVendidas: { [Op.gte]: cantidadNum } });
    }
  }

  return this.modelo.findAll({
    where: { [Op.and]: condiciones },
    include: { model: Editorial, as: "editorial" },
    order: [["anioPublicacion", "DESC"]],
    limit: 25
  });
}

async contarFiltrado({ texto, idEditorial, puntuacion, copiasVendidas } = {}) {
  const condiciones = [];

  if (texto) {
    condiciones.push({
      [Op.or]: [
        { titulo: { [Op.like]: `%${texto}%` } },
        { autor: { [Op.like]: `%${texto}%` } },
        { genero: { [Op.like]: `%${texto}%` } }
      ]
    });
  }

  if (idEditorial) {
    condiciones.push({ idEditorial });
  }

  if (puntuacion !== "") {
    const puntajeNum = Number(puntuacion);
    if (puntajeNum) {
      condiciones.push({ puntuacion: { [Op.gte]: puntajeNum } });
    }
  }

  if (copiasVendidas !== "") {
    const cantidadNum = Number(copiasVendidas);
    if (cantidadNum) {
      condiciones.push({ copiasVendidas: { [Op.gte]: cantidadNum } });
    }
  }

  return this.modelo.count({
    where: { [Op.and]: condiciones },
    include: { model: Editorial, as: "editorial" }
  });
}

    async obtenerISBN(isbn) {
    return this.modelo.findOne({
      where: {
        isbn: { [Op.eq]: isbn }
      }
    });
  }

async obtenerTodosSinFiltro() {
  return this.modelo.findAll({
    include: { model: Editorial, as: "editorial" }
  });
}

}


export default new LibroRepository();
