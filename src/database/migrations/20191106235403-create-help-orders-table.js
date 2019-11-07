module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('help_orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                required: true,
            },
            student_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true,
                references: { model: 'students', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            question: {
                type: Sequelize.STRING,
                allowNull: false,
                required: true,
            },
            answer: {
                type: Sequelize.STRING,
                allowNull: true,
                required: false,
            },
            answer_at: {
                type: Sequelize.DATE,
                allowNull: true,
                required: false,
            },
            created_at: {
                type: Sequelize.DATE,
                required: true,
            },
            updated_at: {
                type: Sequelize.DATE,
                required: true,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('help_orders');
    },
};
