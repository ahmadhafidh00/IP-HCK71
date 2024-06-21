"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "name", Sequelize.STRING);
    await queryInterface.addColumn("Users", "subscription", {
      type: Sequelize.STRING,
      defaultValue: "free",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "name");
    await queryInterface.removeColumn("Users", "subscription");
  },
};
