'use strict';

const { DataTypes, literal } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};