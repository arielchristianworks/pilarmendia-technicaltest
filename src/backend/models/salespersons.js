'use strict';

import {
  Model,
  DataTypes,
  literal,
} from 'sequelize';
import sqlz from "../config/db";

export default class Salespersons extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  SalesPersonName
  Alamat
  NomorKontak
  static associate(models) {
    // define association here
  }
}

Salespersons.init({
  SalesPersonID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  SalesPersonName: {
    type: DataTypes.STRING
  },
  Alamat: {
    type: DataTypes.TEXT
  },
  NomorKontak: {
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  },
}, {
  sequelize: sqlz,
  modelName: 'Salespersons',
  tableName: 'sales_persons',
  paranoid: true,
});