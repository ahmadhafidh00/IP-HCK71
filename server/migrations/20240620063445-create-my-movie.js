"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MyMovies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      MovieId: {
        type: Sequelize.STRING, // karena ambil data dari tmdb
        allowNull: false,
        references: {
          model: {
            tableName: "Movies",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MyMovies");
  },
};
