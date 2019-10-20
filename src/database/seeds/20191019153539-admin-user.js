const bcrypt = require('bcryptjs');

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Administrator',
                    email: 'admin@gympoint.com',
                    password_hash: bcrypt.hashSync('123456', 8),
                    updated_at: new Date(),
                    created_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
