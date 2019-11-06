module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('enrollments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                required: true,
                autoIncrement: true,
            },
            student_id: {
                type: Sequelize.INTEGER,
                references: { model: 'students', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
                required: true,
            },
            plan_id: {
                type: Sequelize.INTEGER,
                references: { model: 'plans', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                required: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
                required: true,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
                required: true,
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
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
        return queryInterface.dropTable('enrollments');
    },
};
