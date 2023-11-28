// models/categoryModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Contact, {
      through: 'CategoryContact', // This is the join table name
      foreignKey: 'categoryId',
    });
  };

  return Category;
};
