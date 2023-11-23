'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales_persons', [
      {
        SalesPersonName: "Sales Person Auto Gen 1",
        Alamat: "Jl. Auto Gen 1",
        NomorKontak: "08221234567",
      },
      {
        SalesPersonName: "Sales Person Auto Gen 2",
        Alamat: "Jl. Auto Gen 2",
        NomorKontak: "08221234567",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales_persons', null, {});
  }
};
