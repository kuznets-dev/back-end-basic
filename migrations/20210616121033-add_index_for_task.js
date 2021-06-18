'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'order', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'order');
  }
};
