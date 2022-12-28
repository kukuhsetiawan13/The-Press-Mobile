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

      const postTags = tags.map((el, index) => {
        return {
          PostId: index +1,
          TagId: index +1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      await queryInterface.bulkInsert('PostTags', postTags)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('PostTags', null, {
      truncate: true,
      cascade: true,
      restartIdenttity: true
     })
  }
};
