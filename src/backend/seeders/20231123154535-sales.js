'use strict';

const {faker} = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const totalGenerations = 2000000;
    let allSales = [];

    // for (let i = 1; i <= 6000; i++) {
    for (let i = 1; i <= totalGenerations; i++) {
      allSales.push({
        SalesDate: faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2023-12-30T23:59:59.000Z' }),
        ProductID: faker.number.int({min: 1, max: 500}),
        SalesAmount: faker.number.int({min: 1, max: 100}),
        SalesPersonID: faker.number.int({min: 1, max: 2}),
        createdAt: faker.date.past(),
      })
      if (i % 6000 === 0 || i === totalGenerations) {
        await queryInterface.bulkInsert('sales', allSales, {});
        allSales = [];
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
