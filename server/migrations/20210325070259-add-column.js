'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.changeColumn('Users', 'tokenExp', {
            type: Sequelize.BIGINT,
            defaultValue: 0
        })

        await queryInterface.addColumn('Users', 'role', {
            type: Sequelize.STRING,
            defaultValue: 0
        })

        await queryInterface.addColumn('Users', 'image', {
            type: Sequelize.STRING,
            defaultValue: ""
        })
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.changeColumn('Users', 'tokenExp', {
            type: Sequelize.INTEGER
        })

        await queryInterface.removeColumn('Users', 'role')

        await queryInterface.removeColumn('Users', 'image')
    }
};
