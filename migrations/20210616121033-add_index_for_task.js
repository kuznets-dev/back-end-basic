'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'index', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'index');
  }
};
