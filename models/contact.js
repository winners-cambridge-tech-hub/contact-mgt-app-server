'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      first_name: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.NUMERIC,
      contact_address: DataTypes.TEXT,
      marital_status: DataTypes.STRING,
      town_city: DataTypes.STRING,
      county: DataTypes.STRING,
      post_code: DataTypes.STRING,
      birthday_month: DataTypes.STRING,
      birthday_day: DataTypes.STRING,
      gender: DataTypes.STRING,
      first_attendance: DataTypes.DATE,
      bfc_status: DataTypes.STRING,
      water_baptism: DataTypes.STRING,
      service_unit: DataTypes.STRING,
      wofbi_status: DataTypes.STRING,
      approved_time: DataTypes.DATE,
      create_date: DataTypes.DATE,
      create_by: DataTypes.STRING,
      last_modified_date: DataTypes.DATE,
      modified_by: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Contact',
    }
  );
  return Contact;
};
