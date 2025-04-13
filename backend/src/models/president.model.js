// models/president.model.js

module.exports = (sequelize, Sequelize) => {
    const President = sequelize.define('president', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      year: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      photo_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      achievements: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return President;
  };