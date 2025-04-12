module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      coordinator: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Planning', 'Upcoming', 'Active', 'Completed', 'On Hold'),
        defaultValue: 'Planning'
      },
      budget: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Project;
  };