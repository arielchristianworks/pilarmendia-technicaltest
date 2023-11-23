'use strict';

const {faker} = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const totalGenerations = 500;
    let allProducts = [];

    // for (let i = 1; i <= 6000; i++) {
    for (let i = 1; i <= totalGenerations; i++) {
      allProducts.push({
        // ProductName: faker.commerce.product() + `(${i})`,
        ProductName: faker.commerce.product(),
        // ProductPrice: faker.number.bigInt({ min: 50000, max: 700000}),
        ProductPrice: faker.commerce.price({ min: 50000, max: 700000}),
        // Description: faker.lorem.paragraphs(),
        Description: faker.commerce.productDescription(),
        createdAt: faker.date.past(),
      })
      if (i % 6000 === 0 || i === totalGenerations) {
        await queryInterface.bulkInsert('products', allProducts, {});
        allProducts = [];
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
