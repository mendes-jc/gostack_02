import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                duration: Sequelize.INTEGER,
                price: Sequelize.DOUBLE,
                deleted: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Plan;
