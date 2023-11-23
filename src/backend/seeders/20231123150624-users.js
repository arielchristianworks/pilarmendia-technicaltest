'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: "test1@example.com",
        displayName: "Test User 1",
        password: await bcrypt.hash("asdasd123", 10)
      },
      {
        email: "test2@example.com",
        displayName: "Test User 2",
        password: await bcrypt.hash("asdasd123", 10)
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
