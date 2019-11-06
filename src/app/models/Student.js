import Sequelize, { Model } from 'sequelize';

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                age: Sequelize.INTEGER,
                height: Sequelize.FLOAT(1, 2),
                weight: Sequelize.FLOAT(3, 3),
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Student;
