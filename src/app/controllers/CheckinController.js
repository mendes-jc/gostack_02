import Checkin from '../models/Checkin';

import Student from '../models/Student';

class CheckinController {
    async store(req, res) {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            res.status(404).json({ error: 'Invalid student id' });
        }

        const checkins = await Checkin.findAndCountAll({
            // Aqui deve ser verificada a data, se é de 7 dias ou próximo
            where: {
                student_id: id,
            },
        });

        if (checkins) {
            if (checkins.count >= 5) {
                return res.status(401).json({
                    error:
                        'You already have 5 checkins in the last 7 days. You need to rest!',
                });
            }
        }

        const checkin = await Checkin.create({
            student_id: id,
        });
        return res.status(201).json({ message: checkin });
    }

    async index(req, res) {
        const { id } = req.params;

        const checkins = await Checkin.findAll({
            where: {
                student_id: id,
            },
        });

        return res.json(checkins);
    }
}

export default new CheckinController();
