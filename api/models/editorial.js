import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Editorial extends Model {}

Editorial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_EDITORIAL"
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "NOMBRE"
    },
    pais: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "PAIS"
    }
  },
  {
    sequelize,
    modelName: "Editorial",
    tableName: "EDITORIALES",
    timestamps: false
  }
);

export default Editorial;
