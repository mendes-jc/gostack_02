module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('checkins', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true,
                allowNull: false,
            },
            student_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
                references: { model: 'students', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('checkins');
    },
};
