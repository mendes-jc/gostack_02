module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gimpoint',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
