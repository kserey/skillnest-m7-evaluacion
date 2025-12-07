'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Rol tiene muchos Usuarios
      Rol.hasMany(models.Usuario, {
        foreignKey: 'rolId',
        as: 'usuarios'
      });
}
  }
  Rol.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
  });
  return Rol;
};