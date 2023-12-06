// models/contact.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // Add the association for many-to-many relationship with Category
      Contact.belongsToMany(models.Category, {
        through: 'CategoryContact',
        foreignKey: 'contactId',
      });
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
      birthday_month: {
        type: DataTypes.INTEGER,
        validate: {
          max: 12,
        },
      },
      birthday_day: DataTypes.INTEGER,
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
