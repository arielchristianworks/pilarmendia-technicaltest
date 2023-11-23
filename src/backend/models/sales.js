'use strict';
import {
  Model,
  DataTypes,
} from 'sequelize';
import sqlz from "../config/db";

export default class Sales extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  SalesDate
  ProductID
  SalesAmount
  SalesPersonID
  static associate(models) {
    // define association here
  }
}

Sales.init({
  SalesID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  SalesDate: {
    type: DataTypes.DATE
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'ProductID' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  SalesAmount: {
    type: DataTypes.BIGINT
  },
  SalesPersonID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'sales_persons', key: 'SalesPersonID' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
  modelName: 'Sales',
  tableName: 'sales',
  paranoid: true,
});