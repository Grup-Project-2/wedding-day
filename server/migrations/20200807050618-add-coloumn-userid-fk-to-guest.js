'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Guests', 'UserId', {
      type: Sequelize.INTEGER,
      references: { //Required field
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Guests', 'UserId',{});
  }
};
