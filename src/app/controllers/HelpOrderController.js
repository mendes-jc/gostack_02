import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
    async store(req, res) {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            res.status(404).json({ error: 'Invalid student id' });
        }

        const schema = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const helpOrder = await HelpOrder.create({
            question: req.body.question,
            student_id: id,
        });

        return res.status(200).json({
            message: 'Help Order created. Wait for your response :)',
            helpOrder,
        });
    }

    async index(req, res) {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            res.status(404).json({ error: 'Invalid student id' });
        }

        const helpOrders = await HelpOrder.findAll({
            where: {
                student_id: id,
            },
        });

        res.json({ helpOrders });
    }
}

export default new HelpOrderController();
