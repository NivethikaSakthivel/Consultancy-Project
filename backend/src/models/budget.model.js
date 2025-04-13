// models/budget.model.js

module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define('budget_entry', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      budget_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      actual_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      proof_file_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Budget;
  };