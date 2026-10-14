import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Editorial from "./editorial.js";

class Libro extends Model {}

Libro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_LIBRO"
    },
    titulo: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "TITULO"
    },
    autor: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "AUTOR"
    },
    anioPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "ANIO_PUBLICACION"
    },
    genero: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "GENERO"
    },
    idEditorial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "ID_EDITORIAL"
    },
    isbn: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "ISBN"
    },
    puntuacion: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0.0,
      field: "PUNTUACION"
    },
    copiasVendidas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "COPIAS_VENDIDAS"
    }
  },
  {
    sequelize,
    modelName: "Libro",
    tableName: "LIBROS",
    timestamps: false
  }
);

Libro.belongsTo(Editorial, {
  foreignKey: "idEditorial",
  as: "editorial"
});

Editorial.hasMany(Libro, {
  foreignKey: "idEditorial",
  as: "libros"
});

export default Libro;
