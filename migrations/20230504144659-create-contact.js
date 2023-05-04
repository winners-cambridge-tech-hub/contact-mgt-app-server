'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      middle_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.NUMERIC,
      },
      contact_address: {
        type: Sequelize.TEXT,
      },
      marital_status: {
        type: Sequelize.STRING,
      },
      town_city: {
        type: Sequelize.STRING,
      },
      county: {
        type: Sequelize.STRING,
      },
      post_code: {
        type: Sequelize.STRING,
      },
      birthday_month: {
        type: Sequelize.STRING,
      },
      birthday_day: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      first_attendance: {
        type: Sequelize.DATE,
      },
      bfc_status: {
        type: Sequelize.STRING,
      },
      water_baptism: {
        type: Sequelize.STRING,
      },
      service_unit: {
        type: Sequelize.STRING,
      },
      wofbi_status: {
        type: Sequelize.STRING,
      },
      approved_time: {
        type: Sequelize.DATE,
      },
      create_date: {
        type: Sequelize.DATE,
      },
      create_by: {
        type: Sequelize.STRING,
      },
      last_modified_date: {
        type: Sequelize.DATE,
      },
      modified_by: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Contacts');
  },
};
