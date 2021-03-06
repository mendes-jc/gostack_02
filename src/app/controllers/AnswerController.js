import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Queue from '../lib/Queue';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';

class AnswerController {
    async store(req, res) {
        const { id } = req.params;

        const helpOrder = await HelpOrder.findByPk(id);

        if (!helpOrder) {
            return res.status(404).json({ error: 'Invalid help order id.' });
        }

        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const { answer } = req.body;

        helpOrder.answer = answer;
        helpOrder.answer_at = new Date();

        await helpOrder.save();

        const student = await Student.findByPk(helpOrder.student_id);

        await Queue.add(AnswerMail.key, {
            student,
            helpOrder,
            answer,
        });

        return res.status(201).json({ message: 'ok' });
    }
}

export default new AnswerController();
