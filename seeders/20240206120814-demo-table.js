'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',[{
      id:1,
      name:'priya',
      password:'12345678',
      confirm_password:'12345678',
      number:'123456789',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      id:2,
      name:'kavya',
      password:'123456789',
      confirm_password:'123456789',
      number:'123456782',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:3,
      name:'uthay',
      password:'abcdefgh',
      confirm_password:'abcdefgh',
      number:12345432,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:4,
      name:'hrp',
      password:'12345678',
      confirm_password:'12345678',
      number:1234567,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      id:6,
      name:'sivaharish',
      password:'12345678',
      confirm_password:'12345678',
      number:9125364,
      createdAt:new Date(),
      updatedAt:new Date()
    }
    ],{});
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
