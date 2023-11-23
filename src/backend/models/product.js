'use strict';

import {
  Model,
  DataTypes,
  literal
} from 'sequelize';
import sqlz from "../config/db";

export default class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  ProductName
  ProductPrice
  Description
  static associate(models) {
    // define association here
  }
}

Product.init({
  ProductID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ProductName: {
    type: DataTypes.STRING
  },
  ProductPrice: {
    type: DataTypes.BIGINT
  },
  Description: {
    type: DataTypes.TEXT
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
  modelName: 'Product',
  tableName: "products",
  paranoid: true,
  // indexes: [
  //   {
  //     name: "products_name_idx_ag",
  //     unique: true,
  //     fields: ['ProductName']
  //   },
  // ],
});