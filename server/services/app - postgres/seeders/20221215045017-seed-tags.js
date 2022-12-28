'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const tags = require('../data/db.json').Tags

    tags.forEach(el => {
      delete el.id
      delete el.postId
      el.createdAt = el.updatedAt = new Date()
    })
   
    await queryInterface.bulkInsert('Tags', tags)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Tags', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
     })
  }
};
