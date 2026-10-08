'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: await require('bcrypt').hash('admin123', 10),
        role: 'admin',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEx5wuoZI5dnBlcndsPuEReM336xG9Ha7Gpif-90qz-Q7fp4xxI_zZ8USV&s=10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        email: 'user@example.com',
        password: await require('bcrypt').hash('user123', 10),
        role: 'user',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEx5wuoZI5dnBlcndsPuEReM336xG9Ha7Gpif-90qz-Q7fp4xxI_zZ8USV&s=10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Angga',
        email: 'angga@example.com',
        password: await require('bcrypt').hash('angga123', 10),
        role: 'user',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEx5wuoZI5dnBlcndsPuEReM336xG9Ha7Gpif-90qz-Q7fp4xxI_zZ8USV&s=10',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
