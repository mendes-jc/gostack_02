module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('plans', 'deleted', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            required: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('plans', 'deleted');
    },
};
